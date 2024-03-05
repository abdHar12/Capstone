import { Manga } from './manga';

export interface MangaData {
  result: string;
  response: string;
  data: Manga[];
  limit: number;
  offset: number;
  total: number;
}
