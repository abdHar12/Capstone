import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { Author } from 'src/app/module/author';
import { Chapter } from 'src/app/module/chapter';
import { ChapterData } from 'src/app/module/chapter-data';
import { ChapterFromChapterEndPoint } from 'src/app/module/chapter-from-chapter-end-point';
import { Manga } from 'src/app/module/manga';
import { Volume } from 'src/app/module/volume';
import { MangaService } from 'src/app/service/manga.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-manga-all-info',
  templateUrl: './manga-all-info.component.html',
  styleUrls: ['./manga-all-info.component.scss'],
})
export class MangaAllInfoComponent implements OnInit, DoCheck {
  manga!: Manga;
  urlManga!: any;
  mangaTitle!: any;
  mangaDesc!: any;
  mangaAuthor!: Author;
  mangaAllThemes!: string[];
  mangaAllGenres!: string[];
  mangaChapters: Chapter[] = [];
  allSettingsAreDone!: boolean;
  lastChapterId!: string;
  forEachSlide!: number;
  dividedChapter!: Chapter[][];
  constructor(public mangaSrv: MangaService) {}

  ngDoCheck(): void {
    this.setForEachSlide();
  }

  ngOnInit(): void {
    this.allSettingsAreDone = true;
    this.doAllSettings();
    setTimeout(() => {
      this.allSettingsAreDone = true;
    }, 5000);
  }

  doAllSettings() {
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
      this.setChapters().finally(() => {
        this.divideChapters();
      });
      console.log('ultimo cap ' + this.manga.attributes.latestUploadedChapter);
    });
  }
  setForEachSlide() {
    if (window.innerWidth < 768) {
      this.forEachSlide = 2;
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      this.forEachSlide = 3;
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      this.forEachSlide = 4;
    } else if (window.innerWidth >= 1200) {
      this.forEachSlide = 6;
    }
  }

  divideChapters() {
    console.log(this.divideChapters);
  }

  async setChapters() {
    await this.mangaSrv
      .getChaptersByMangaId(this.manga.id)
      .subscribe((data) => {
        Object.entries(data.volumes).forEach(([key, value1]) => {
          Object.entries((value1 as Volume).chapters).forEach(
            ([key, value2]) => {
              this.mangaChapters.push(value2 as Chapter);
            }
          );
        });
        console.log(this.mangaChapters);
      });
  }
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
