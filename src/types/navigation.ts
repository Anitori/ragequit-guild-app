export type PageId =
  | 'dashboard'
  | 'roster'
  | 'progress'
  | 'links'
  | 'more'
  | 'strategies'
  | 'recruitment'
  | 'admin';

export type Navigate = (page: PageId) => void;
