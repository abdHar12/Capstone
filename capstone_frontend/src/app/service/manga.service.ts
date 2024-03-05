import { Injectable } from '@angular/core';
import { MangaData } from '../module/manga-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Manga } from '../module/manga';
import { CoverArtData } from '../module/cover-art-data';
import { CoverArt } from '../module/cover-art';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  url = environment.apiURL;
  allMangas!: Manga[];
  language: String = 'en';

  constructor(private httpClient: HttpClient) {}

  getSingleCover(idCover: string) {
    return this.httpClient.get<CoverArtData>(`${this.url}/cover/${idCover}`);
  }

  getAllMangas() {
    return this.httpClient.get<MangaData>(this.url + '/manga/');
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
}
