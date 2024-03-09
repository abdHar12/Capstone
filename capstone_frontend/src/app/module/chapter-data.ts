import { Volume } from './volume';

export interface ChapterData {
  result: string;
  volumes: Map<String, Volume>;
}
