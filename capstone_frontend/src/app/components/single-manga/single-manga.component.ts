import { Component, Input, OnInit } from '@angular/core';
import { CoverArt } from 'src/app/module/cover-art';
import { CoverArtData } from 'src/app/module/cover-art-data';
import { Manga } from 'src/app/module/manga';
import { MangaService } from 'src/app/service/manga.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-manga',
  templateUrl: './single-manga.component.html',
  styleUrls: ['./single-manga.component.scss'],
})
export class SingleMangaComponent implements OnInit {
  @Input() manga!: Manga;
  desc!: any;
  title!: any;
  urlImg!: any;

  constructor(private mangaSrv: MangaService) {}

  ngOnInit(): void {
    this.setUrlImg(this.manga);
    this.setDesc(this.manga);
    this.setTitle(this.manga);
  }

  async setTitle(manga: Manga) {
    this.title = await this.mangaSrv.getTitle(manga);
  }

  async setUrlImg(manga: Manga) {
    this.urlImg = await this.mangaSrv.getUrlImg(manga);
  }

  async setDesc(manga: Manga) {
    this.desc = await this.mangaSrv.getDescription(manga);
  }
}
