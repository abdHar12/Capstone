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
    this.divOfImg != document.getElementById('randomMangaDiv');
    this.mangaSrv.getAllMangas().subscribe((allmangas) => {
      this.mangaSrv.setAllMangas(allmangas.data);
      this.allmangas = allmangas.data;
    });
    this.mangaSrv.getRandomManga().subscribe((manga) => {
      this.randomManga = manga.data;
      console.log(manga.data);
      this.setDesc(this.randomManga);
      this.setUrlImg(this.randomManga).finally(() => {
        const fac = new FastAverageColor();
        const container = document.querySelector(
          '#randomMangaDiv'
        ) as HTMLDivElement;
        fac
          .getColorAsync(this.urlRandomManga)
          .then((color) => {
            console.log(color);
            container.style.backgroundColor = color.rgba;
            container.style.color = color.isDark ? '#fff' : '#000';
            console.log(color);
          })
          .catch((e) => {
            console.log(e);
          });

        // this.img = document.getElementById('i') as HTMLImageElement;

        // this.img.onload = () => {
        //   const { R, G, B } = this.getAverageColor(this.img, 4);
        //   document.body.style.background = `rgb(${R}, ${G},${B})`;
        // };
      });

      this.setTitle(this.randomManga);
      this.setAuthor(this.randomManga);
      this.setRandomMangaAllThemes(this.randomManga);
      this.setRandomMangaAllGenres(this.randomManga);
    });
  }

  getAverageColor(imageElement: HTMLImageElement, ratio: number) {
    const canvas = document.createElement('canvas');

    let height = (canvas.height = imageElement.naturalHeight);
    let width = (canvas.width = imageElement.naturalWidth);

    const context = canvas.getContext('2d');
    context!.drawImage(imageElement, 0, 0);

    let data, length;
    let i = -4,
      count = 0;

    try {
      data = context!.getImageData(0, 0, width, height);
      length = data.data.length;
    } catch (err) {
      console.error(err);
      return {
        R: 0,
        G: 0,
        B: 0,
      };
    }
    let R, G, B;
    R = G = B = 0;

    while ((i += ratio * 4) < length) {
      ++count;

      R += data.data[i];
      G += data.data[i + 1];
      B += data.data[i + 2];
    }

    R = ~~(R / count);
    G = ~~(G / count);
    B = ~~(B / count);

    return {
      R,
      G,
      B,
    };
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
