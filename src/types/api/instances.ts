export interface Instance {
  chain_id: "string";
  name: "string";
  domain: "string";
  details?: {
    icon_url: "string";
    is_mainnet: "boolean";
  };
}

export interface InstancesResponse {
  items: Array<Instance>;
}
