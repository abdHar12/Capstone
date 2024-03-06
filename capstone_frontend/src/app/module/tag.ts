import { Relationship } from './relationship';

export interface Tag {
  id: string;
  type: string;
  attributes: {
    name: Map<string, string>;
    description: Map<string, string>;
    group: string;
    version: number;
  };
  relationships: Relationship[];
}
