export interface Relationship {
  id: string;
  type: string;
  related: string;
  attributes: Map<string, any>[];
}
