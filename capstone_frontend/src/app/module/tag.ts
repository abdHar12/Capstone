import { Relationship } from './relationship';

export interface Tag {
  id: string;
  type: string;
  attributes: {
    name: { [key: string]: string };
    description: { [key: string]: string };
    group: string;
    version: number;
  };
  relationships: Relationship[];
}
