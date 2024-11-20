declare global {
  export interface Window {
    __envs: Record<string, string>;
  }
}

export {};
