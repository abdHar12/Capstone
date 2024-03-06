import { Manga } from './manga';

export interface SingleMangaData {
  result: string;
  response: string;
  data: Manga;
  limit: number;
  offset: number;
  total: number;
}
