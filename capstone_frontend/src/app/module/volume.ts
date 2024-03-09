import { Chapter } from './chapter';

export interface Volume {
  volume: string;
  count: number;
  chapters: Map<String, Chapter>;
}
