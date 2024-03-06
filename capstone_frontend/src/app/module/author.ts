import { Relationship } from './relationship';

export interface Author {
  id: string;
  type: string;
  attributes: {
    name: string;
    imageUrl: string;
    biography: Map<string, string>;
    twitter: string;
    pixiv: string;
    melonBook: string;
    fanBox: string;
    booth: string;
    nicoVideo: string;
    skeb: string;
    fantia: string;
    tumblr: string;
    youtube: string;
    weibo: string;
    naver: string;
    website: string;
    version: number;
    createdAt: string;
    updatedAt: string;
  };
  relationships: Relationship[];
}
