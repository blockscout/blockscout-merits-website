/* eslint-disable no-unused-vars */
/* prettier-ignore */
export enum EventTypes {
  PAGE_VIEW = 'Page view',
  WALLET = 'Wallet',
  ACTION = 'Action',
}

/* prettier-ignore */
export type EventPayload<Type extends EventTypes> =
Type extends EventTypes.PAGE_VIEW ? {
  Source: string;
  Extra?: string | undefined;
} :
Type extends EventTypes.WALLET ? {
  Action: 'Login' | 'Connect' | 'Sign' | 'Logout';
} :
Type extends EventTypes.ACTION ? {
  Source: 'Share button' | 'Copy ref link' | 'Copy ref code' | 'Banner';
} :
undefined;
