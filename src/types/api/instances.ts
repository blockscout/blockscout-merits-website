export interface Instance {
  chain_id: "string";
  name: "string";
  domain: "string";
  logo_url: "string";
}

export interface InstancesResponse {
  instances: Array<Instance>;
}
