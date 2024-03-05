import { Injectable } from '@angular/core';
import { MangaData } from '../module/manga-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Manga } from '../module/manga';
import { CoverArtData } from '../module/cover-art-data';

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
  set(language: string) {
    this.language = language;
  }
}
