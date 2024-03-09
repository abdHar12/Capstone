import { Relationship } from './relationship';

export interface ChapterFromChapterEndPoint {
  id: string;
  type: string;
  attributes: {
    title: string;
    volume: string;
    chapter: string;
    pages: number;
    translatedLanguage: string;
    uploader: string;
    externalUrl: string;
    version: number;
    createdAt: string;
    updatedAt: string;
    publishAt: string;
    readableAt: string;
  };
  relationships: Relationship[];
}
