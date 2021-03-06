export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type StatusAd = 'active' | 'completed';
enum BreakpointsEnum {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}
type AdBreakpoint = Record<Breakpoints, string>;
export interface IAdModel {
  adBreakpoint: AdBreakpoint;
  defaultAd: Breakpoints;
  link?: string;
  status: StatusAd;
  title: string;
}
