import { readFile, writeFile } from 'node:fs/promises';

const guildId = 702025;
const zoneId = 46;
const reportLimit = 50;
const maxReportPages = 10;
const outputPath = 'public/data/progress.json';
const overviewUrl = `https://www.warcraftlogs.com/guild/id/${guildId}`;
const progressUrl = `https://www.warcraftlogs.com/guild/progress/${guildId}?zone=${zoneId}`;
const tokenUrl = 'https://www.warcraftlogs.com/oauth/token';
const graphqlUrl = 'https://www.warcraftlogs.com/api/v2/client';

const difficultyById = new Map([
  [3, 'Normal'],
  [4, 'Heroic'],
  [5, 'Mythic'],
]);

async function readFallback() {
  return JSON.parse(await readFile(outputPath, 'utf8'));
}

async function writeProgress(progress) {
  await writeFile(outputPath, `${JSON.stringify(progress, null, 2)}\n`);
}

function basicAuth(clientId, clientSecret) {
  return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}

async function getAccessToken(clientId, clientSecret) {
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth(clientId, clientSecret)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });

  if (!response.ok) {
    throw new Error(`Warcraft Logs OAuth failed: ${response.status} ${await response.text()}`);
  }

  const payload = await response.json();
  return payload.access_token;
}

async function graphql(accessToken, query, variables) {
  const response = await fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json();

  if (!response.ok || payload.errors?.length) {
    throw new Error(
      `Warcraft Logs GraphQL failed: ${response.status} ${JSON.stringify(payload.errors ?? payload)}`,
    );
  }

  return payload.data;
}

const baseQuery = `
  query RageQuitProgress($guildId: Int!, $zoneId: Int!) {
    guildData {
      guild(id: $guildId) {
        name
        zoneRanking(zoneId: $zoneId) {
          progress(size: 20) {
            worldRank { number percentile color }
            regionRank { number percentile color }
            serverRank { number percentile color }
          }
        }
      }
    }
    worldData {
      zone(id: $zoneId) {
        name
        encounters { id name }
      }
    }
  }
`;

const reportsQuery = `
  query RageQuitReports($guildId: Int!, $zoneId: Int!, $limit: Int!, $page: Int!) {
    reportData {
      reports(guildID: $guildId, zoneID: $zoneId, limit: $limit, page: $page) {
        has_more_pages
        data {
          code
          title
          startTime
          fights(translate: true) {
            id
            name
            encounterID
            difficulty
            kill
            bossPercentage
            fightPercentage
            startTime
            endTime
          }
        }
      }
    }
  }
`;

async function fetchReports(accessToken) {
  const reports = [];

  for (let page = 1; page <= maxReportPages; page += 1) {
    const data = await graphql(accessToken, reportsQuery, {
      guildId,
      zoneId,
      limit: reportLimit,
      page,
    });
    const pageData = data.reportData?.reports;
    reports.push(...(pageData?.data ?? []));

    if (!pageData?.has_more_pages) {
      break;
    }
  }

  return reports;
}

function normalizePercent(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return undefined;
  }

  return value > 100 ? value / 100 : value;
}

function formatPercent(value) {
  if (value === undefined) {
    return undefined;
  }

  return `${Math.max(0, Math.round(value * 10) / 10)}%`;
}

function formatDate(reportStartTime, fightEndTime) {
  if (typeof reportStartTime !== 'number' || typeof fightEndTime !== 'number') {
    return undefined;
  }

  return new Date(reportStartTime + fightEndTime).toISOString().slice(0, 10);
}

function reportFightUrl(reportCode, fightId) {
  return `https://www.warcraftlogs.com/reports/${reportCode}#fight=${fightId}`;
}

function summarizeProgress(baseData, reports, fallback) {
  const zone = baseData.worldData?.zone;
  const guild = baseData.guildData?.guild;
  const encounters = zone?.encounters?.length ? zone.encounters : fallback.bosses;
  const encounterState = new Map();

  for (const encounter of encounters) {
    const encounterId = Number(encounter.id);
    encounterState.set(encounterId, {
      id: String(encounter.id),
      name: encounter.name,
      pulls: new Map(),
    });
  }

  for (const report of reports) {
    for (const fight of report.fights ?? []) {
      const difficulty = difficultyById.get(Number(fight.difficulty));
      const encounterId = Number(fight.encounterID);

      if (!difficulty || !encounterId || !encounterState.has(encounterId)) {
        continue;
      }

      const state = encounterState.get(encounterId);
      const byDifficulty = state.pulls.get(difficulty) ?? {
        pulls: 0,
        bestRemaining: undefined,
        kill: undefined,
      };
      byDifficulty.pulls += 1;

      if (fight.kill) {
        const killTime = report.startTime + fight.endTime;
        if (!byDifficulty.kill || killTime < byDifficulty.kill.time) {
          byDifficulty.kill = {
            time: killTime,
            date: formatDate(report.startTime, fight.endTime),
            url: reportFightUrl(report.code, fight.id),
          };
        }
      } else {
        const remaining = normalizePercent(fight.bossPercentage ?? fight.fightPercentage);
        if (remaining !== undefined && (byDifficulty.bestRemaining === undefined || remaining < byDifficulty.bestRemaining)) {
          byDifficulty.bestRemaining = remaining;
          byDifficulty.bestUrl = reportFightUrl(report.code, fight.id);
        }
      }

      state.pulls.set(difficulty, byDifficulty);
    }
  }

  const progress = ['Normal', 'Heroic', 'Mythic'].map((difficulty) => ({
    difficulty,
    killed: Array.from(encounterState.values()).filter((boss) => boss.pulls.get(difficulty)?.kill)
      .length,
    total: encounterState.size || fallback.progress.find((item) => item.difficulty === difficulty)?.total || 0,
  }));

  const bosses = Array.from(encounterState.values()).map((boss, index) => {
    const mythic = boss.pulls.get('Mythic');

    if (mythic?.kill) {
      return {
        id: boss.id,
        name: boss.name,
        status: 'Muerto',
        difficulty: 'Mythic',
        killDate: mythic.kill.date,
        logUrl: mythic.kill.url,
        pullCount: mythic.pulls,
      };
    }

    if (mythic?.pulls) {
      return {
        id: boss.id,
        name: boss.name,
        status: 'En progreso',
        difficulty: 'Mythic',
        bestTry: formatPercent(mythic.bestRemaining),
        logUrl: mythic.bestUrl ?? progressUrl,
        pullCount: mythic.pulls,
      };
    }

    return {
      id: boss.id || `boss-${index + 1}`,
      name: boss.name,
      status: 'No intentado',
    };
  });

  const latestMythicKill = bosses
    .filter((boss) => boss.status === 'Muerto' && boss.killDate)
    .sort((a, b) => String(b.killDate).localeCompare(String(a.killDate)))[0];
  const currentBoss =
    bosses.find((boss) => boss.status === 'En progreso') ??
    bosses.find((boss) => boss.status === 'No intentado') ??
    bosses.at(-1);

  return {
    ...fallback,
    raidName: zone?.name ?? fallback.raidName,
    currentBoss: currentBoss?.name ?? fallback.currentBoss,
    lastKill: latestMythicKill?.name ?? fallback.lastKill,
    warcraftLogsProgressUrl: progressUrl,
    warcraftLogsOverviewUrl: overviewUrl,
    progress,
    bosses,
    generatedAt: new Date().toISOString(),
    source: 'warcraftlogs-api',
    sourceNote: `Actualizado desde Warcraft Logs API para ${guild?.name ?? 'RageQuit'}.`,
    rankings: guild?.zoneRanking?.progress ?? undefined,
  };
}

async function main() {
  const fallback = await readFallback();
  const clientId = process.env.WCL_CLIENT_ID;
  const clientSecret = process.env.WCL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    await writeProgress({
      ...fallback,
      generatedAt: new Date().toISOString(),
      source: 'fallback',
      sourceNote: 'Faltan secrets WCL_CLIENT_ID/WCL_CLIENT_SECRET en GitHub Actions.',
    });
    console.log('Warcraft Logs secrets not configured. Wrote fallback progress JSON.');
    return;
  }

  const accessToken = await getAccessToken(clientId, clientSecret);
  const [baseData, reports] = await Promise.all([
    graphql(accessToken, baseQuery, { guildId, zoneId }),
    fetchReports(accessToken),
  ]);

  await writeProgress(summarizeProgress(baseData, reports, fallback));
  console.log(`Wrote dynamic progress JSON from ${reports.length} reports.`);
}

main().catch(async (error) => {
  const fallback = await readFallback();
  await writeProgress({
    ...fallback,
    generatedAt: new Date().toISOString(),
    source: 'fallback',
    sourceNote: error instanceof Error ? error.message : 'No se pudo actualizar Warcraft Logs.',
  });
  console.error(error);
  process.exitCode = 0;
});
