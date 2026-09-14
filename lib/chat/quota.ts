export type Quota = {
  limit: number; remaining: number; resetsAt: string;
  state: 'available' | 'visitor_daily' | 'site_daily' | 'burst' | 'unavailable';
  retryAt?: string;
}
