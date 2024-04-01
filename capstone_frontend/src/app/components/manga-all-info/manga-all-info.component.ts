import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  Host,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { timeout } from 'rxjs';
import { Author } from 'src/app/module/author';
import { Chapter } from 'src/app/module/chapter';
import { ChapterData } from 'src/app/module/chapter-data';
import { ChapterFromChapterEndPoint } from 'src/app/module/chapter-from-chapter-end-point';
import { Manga } from 'src/app/module/manga';
import { Volume } from 'src/app/module/volume';
import { MangaService } from 'src/app/service/manga.service';

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
  currentSwipe!: number;
  prevSwipe!: number;

  constructor(public mangaSrv: MangaService) {}

  ngDoCheck(): void {}

  ngOnInit(): void {
    this.allSettingsAreDone = false;
    this.doAllSettings();
    setTimeout(() => {
      this.allSettingsAreDone = true;
    }, 8000);
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
      this.setChapters();
      console.log('ultimo cap ' + this.manga.attributes.latestUploadedChapter);
    });
  }

  @HostListener('window:resize')
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

  sideScroll(
    element: Element,
    direction: string,
    speed: number,
    distance: number,
    step: number
  ) {
    let scrollAmount = 0;
    let prevBtn: HTMLButtonElement;
    let nextBtn: HTMLButtonElement;
    let slideTimer = setInterval(() => {
      if (direction === 'left') {
        element.scrollLeft -= step;
        prevBtn = document.querySelector('#prev-scroll')!;
        nextBtn = document.querySelector('#next-scroll')!;
        nextBtn.style.visibility = 'visible';
        if (0 === element.scrollLeft) prevBtn.style.visibility = 'hidden';
      } else {
        element.scrollLeft += step;
        console.log(element.scrollLeft);
        console.log(this.prevSwipe);
        prevBtn = document.querySelector('#prev-scroll')!;
        nextBtn = document.querySelector('#next-scroll')!;
        prevBtn.style.visibility = 'visible';
        if (this.prevSwipe === element.scrollLeft)
          nextBtn.style.visibility = 'hidden';
      }
      this.prevSwipe = element.scrollLeft;
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }
  scrollLeft() {
    let swiper = document.querySelector('.swiper-container')!;
    this.sideScroll(swiper, 'left', 25, 200, 10);
  }
  scrollRight() {
    let swiper = document.querySelector('.swiper-container')!;
    this.sideScroll(swiper, 'right', 25, 200, 10);
  }
}
