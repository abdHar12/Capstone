import { Inject, Injectable } from '@angular/core';
import { MangaData } from '../module/manga-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Manga } from '../module/manga';
import { CoverArtData } from '../module/cover-art-data';
import { CoverArt } from '../module/cover-art';
import { Observable, ReplaySubject } from 'rxjs';
import { SingleMangaData } from '../module/single-manga-data';
import { AuthorData } from '../module/author-data';
import { Author } from '../module/author';
import { FastAverageColor } from 'fast-average-color';
import { ChapterData } from '../module/chapter-data';
import { DataFromChapterEndPoint } from '../module/data-from-chapter-end-point';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  url = environment.apiURL;
  allMangas!: Manga[];
  language: String = 'en';
  lastChapterId!: string;
  priceLastChapter!: number;

  constructor(private httpClient: HttpClient) {}

  getSingleAuthor(idAuthor: string) {
    return this.httpClient.get<AuthorData>(`${this.url}/author/${idAuthor}`);
  }

  getSingleCover(idCover: string) {
    return this.httpClient.get<CoverArtData>(`${this.url}/cover/${idCover}`);
  }

  getAllMangas(page: string) {
    return this.httpClient.get<MangaData>(this.url + '/manga?page=' + page);
  }

  getChaptersByMangaId(id: string) {
    return this.httpClient.get<ChapterData>(`${this.url}/manga/${id}/chapters`);
  }
  getChapterById(id: string) {
    return this.httpClient.get<DataFromChapterEndPoint>(
      `${this.url}/chapter/${id}`
    );
  }

  setAllMangas(allMangas: Manga[]) {
    this.allMangas = allMangas;
  }
  setLanguage(language: string) {
    this.language = language;
  }

  getUrlImg(manga: Manga) {
    return new Promise((resolve, reject) => {
      let idCover!: string;

      manga.relationships.forEach((relationship) => {
        if (relationship.type === 'cover_art') {
          idCover = relationship.id;
          this.getSingleCover(idCover).subscribe((cover) => {
            let url: string;
            let coverArt: CoverArt = cover.data;
            cover.data.relationships.forEach((rel) => {
              console.log(rel);
              Object.entries(rel).forEach(([key, value]) => {
                if (key === 'type' && value === 'manga') {
                  console.log(rel.id);
                  url = `https://uploads.mangadex.org/covers/${rel.id}/${coverArt.attributes.fileName}`;
                }
              });
              resolve(url);
            });
          });
        }
      });
    });
  }

  getAllThemesByManga(manga: Manga) {
    return new Promise((resolve, reject) => {
      let allThemes: string[] = [];
      manga.attributes.tags.forEach((tag) => {
        if (tag.attributes.group === 'theme') {
          Object.entries(tag.attributes.name).forEach(([key, value]) => {
            allThemes.push(value);
            console.log(allThemes);
          });
        }
      });
      resolve(allThemes);
    });
  }

  getAllGenresByManga(manga: Manga) {
    return new Promise((resolve, reject) => {
      let allGenres: string[] = [];
      manga.attributes.tags.forEach((tag) => {
        if (tag.attributes.group === 'genre') {
          Object.entries(tag.attributes.name).forEach(([key, value]) => {
            allGenres.push(value);
            console.log(allGenres);
          });
        }
      });
      resolve(allGenres);
    });
  }

  getAuthorOfManga(manga: Manga) {
    return new Promise((resolve, reject) => {
      let idAuthor!: string;
      manga.relationships.forEach((relationship) => {
        console.log(relationship);
        if (relationship.type === 'author') {
          idAuthor = relationship.id;
          this.getSingleAuthor(idAuthor).subscribe((authorData) => {
            console.log('fsdghj' + authorData);
            let author: Author = authorData.data;
            console.log(author);
            resolve(author);
          });
        }
      });
    });
  }

  getDescription(manga: Manga) {
    return new Promise((resolve, reject) => {
      let descMap: Map<string, string>;
      descMap = manga.attributes.description;
      Object.entries(descMap).forEach(([key, value]) => {
        if (key === this.language) resolve(value);
      });
    });
  }

  getTitle(manga: Manga) {
    return new Promise((resolve, reject) => {
      let titleMap: Map<string, string>;
      titleMap = manga.attributes.title;
      Object.entries(titleMap).forEach(([key, value]) => {
        if (key === this.language) resolve(value);
      });
    });
  }

  getRandomManga() {
    return this.httpClient.get<SingleMangaData>(this.url + '/manga/random');
  }

  getAvgColor(urlRandomManga: string) {
    const fac = new FastAverageColor();
    const container = document.querySelector(
      '.div-with-avg-color'
    ) as HTMLDivElement;
    fac
      .getColorAsync(urlRandomManga)
      .then((color) => {
        console.log(color);
        container.style.backgroundColor = color.rgba;
        container.style.color = color.isDark ? '#fff' : '#000';
        console.log(color);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
