import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FastAverageColor } from 'fast-average-color';
import { Author } from 'src/app/module/author';
import { Manga } from 'src/app/module/manga';
import { MangaData } from 'src/app/module/manga-data';
import { MangaService } from 'src/app/service/manga.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  allmangas!: Manga[];
  randomManga!: Manga;
  urlRandomManga!: any;
  randomMangaTitle!: any;
  randomMangaDesc!: any;
  randomMangaAuthor!: Author;
  randomMangaAllThemes!: string[];
  randomMangaAllGenres!: string[];
  divOfImg!: HTMLDivElement;
  img!: HTMLImageElement;

  constructor(private router: Router, private mangaSrv: MangaService) {}

  ngOnInit(): void {
    this.mangaSrv.getAllMangas().subscribe((allmangas) => {
      this.mangaSrv.setAllMangas(allmangas.data);
      this.allmangas = allmangas.data;
    });
    this.mangaSrv.getRandomManga().subscribe((manga) => {
      this.randomManga = manga.data;
      if (localStorage.getItem('RandomManga') === null)
        localStorage.setItem('RandomManga', JSON.stringify(this.randomManga));
      console.log(manga.data);
      this.setDesc(this.randomManga);
      this.setUrlImg(this.randomManga).finally(() =>
        this.mangaSrv.getAvgColor(this.urlRandomManga)
      );
      this.setTitle(this.randomManga);
      this.setAuthor(this.randomManga);
      this.setRandomMangaAllThemes(this.randomManga);
      this.setRandomMangaAllGenres(this.randomManga);
    });
  }
  deleteRandomMangaFromLS() {
    // if (!(localStorage.getItem('RandomManga') === null)) {
    //   localStorage.removeItem('RandomManga');
    // } else {
    //   localStorage.setItem('RandomManga', JSON.stringify(this.randomManga));
    // }
    localStorage.setItem('RandomManga', JSON.stringify(this.randomManga));
    console.log('questo' + this.randomManga);
  }
  async setTitle(manga: Manga) {
    this.randomMangaTitle = await this.mangaSrv.getTitle(manga);
  }
  async setAuthor(manga: Manga) {
    this.randomMangaAuthor = (await this.mangaSrv.getAuthorOfManga(
      manga
    )) as Author;
  }

  async setRandomMangaAllThemes(manga: Manga) {
    this.randomMangaAllThemes = (await this.mangaSrv.getAllThemesByManga(
      manga
    )) as string[];
  }
  async setRandomMangaAllGenres(manga: Manga) {
    this.randomMangaAllGenres = (await this.mangaSrv.getAllGenresByManga(
      manga
    )) as string[];
  }

  async setUrlImg(manga: Manga) {
    this.urlRandomManga = await this.mangaSrv.getUrlImg(manga);
  }

  async setDesc(manga: Manga) {
    this.randomMangaDesc = await this.mangaSrv.getDescription(manga);
  }

  changePage(id: string) {
    this.router.navigate([`/details/${id}`]);
  }
}
