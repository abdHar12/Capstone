import { Injectable } from '@angular/core';
import { MangaData } from '../module/manga-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Manga } from '../module/manga';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  url = environment.apiURL;
  allMangas!: Manga[];
  language: String = 'en';

  constructor(private httpClient: HttpClient) {}

  getAllMangas() {
    return this.httpClient.get<MangaData>(this.url + '/mangas/manga');
  }
  setAllMangas(allMangas: Manga[]) {
    this.allMangas = allMangas;
  }
  getCover() {}
  set(language: string) {
    this.language = language;
  }
}
