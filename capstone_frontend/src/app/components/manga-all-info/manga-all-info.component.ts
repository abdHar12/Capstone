import { Component, OnDestroy, OnInit } from '@angular/core';
import { Author } from 'src/app/module/author';
import { Manga } from 'src/app/module/manga';
import { MangaService } from 'src/app/service/manga.service';

@Component({
  selector: 'app-manga-all-info',
  templateUrl: './manga-all-info.component.html',
  styleUrls: ['./manga-all-info.component.scss'],
})
export class MangaAllInfoComponent implements OnInit {
  manga!: Manga;
  urlManga!: any;
  mangaTitle!: any;
  mangaDesc!: any;
  mangaAuthor!: Author;
  mangaAllThemes!: string[];
  mangaAllGenres!: string[];

  constructor(public mangaSrv: MangaService) {}

  ngOnInit(): void {
    this.setManga().finally(() => {
      console.log(this.manga);
      this.setDesc(this.manga);
      this.setUrlImg(this.manga).finally(() => {
        console.log(this.urlManga);
        this.mangaSrv.getAvgColor(this.urlManga);
      });
      this.setTitle(this.manga);
      this.setAuthor(this.manga);
      this.setMangaAllThemes(this.manga);
      this.setMangaAllGenres(this.manga);
    });
  }

  // ngOnDestroy(): void {
  //   localStorage.removeItem('RandomManga'); // to clear it again.
  // }

  async setManga() {
    this.manga = await JSON.parse(localStorage.getItem('RandomManga')!);
  }
  async setTitle(manga: Manga) {
    this.mangaTitle = await this.mangaSrv.getTitle(manga);
  }
  async setAuthor(manga: Manga) {
    this.mangaAuthor = (await this.mangaSrv.getAuthorOfManga(manga)) as Author;
  }

  async setMangaAllThemes(manga: Manga) {
    this.mangaAllThemes = (await this.mangaSrv.getAllThemesByManga(
      manga
    )) as string[];
  }
  async setMangaAllGenres(manga: Manga) {
    this.mangaAllGenres = (await this.mangaSrv.getAllGenresByManga(
      manga
    )) as string[];
  }

  async setUrlImg(manga: Manga) {
    this.urlManga = await this.mangaSrv.getUrlImg(manga);
  }

  async setDesc(manga: Manga) {
    this.mangaDesc = await this.mangaSrv.getDescription(manga);
  }
}
