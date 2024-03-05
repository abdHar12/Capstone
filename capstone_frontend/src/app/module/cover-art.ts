import { Relationship } from './relationship';

export interface CoverArt {
  id: string;
  type: string;
  attributes: {
    description: string;
    volume: string;
    fileName: string;
    locale: string;
    createdAt: string;
    updatedAt: string;
    version: number;
  };
  relationships: Relationship[];
}
