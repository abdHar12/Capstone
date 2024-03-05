import { Relationship } from './relationship';
import { Tag } from './tag';

export interface Manga {
  id: string;
  type: string;
  attributes: {
    title: Map<string, string>;
    altTitles: Map<string, string>[];
    description: Map<string, string>;
    isLocked: boolean;
    links: Map<string, string>;
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: string;
    status: string;
    year: number;
    contentRating: string;
    chapterNumbersResetOnNewVolume: boolean;
    latestUploadedChapter: string;
    tags: Tag[];
    state: string;
    version: number;
    createdAt: string;
    updatedAt: string;
  };
  relationships: Relationship[];
}
