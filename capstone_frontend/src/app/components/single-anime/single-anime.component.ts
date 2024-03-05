import { Component, Input, OnInit } from '@angular/core';
import { Manga } from 'src/app/module/manga';
import { MangaService } from 'src/app/service/manga.service';

@Component({
  selector: 'app-single-anime',
  templateUrl: './single-anime.component.html',
  styleUrls: ['./single-anime.component.scss'],
})
export class SingleAnimeComponent implements OnInit {
  @Input() manga!: Manga;
  desc!: string;
  title!: string;

  constructor(private mangaSrv: MangaService) {}

  ngOnInit(): void {
    let descMap: Map<string, string>;
    let titleMap: Map<string, string>;
    descMap = this.manga.attributes.description;
    titleMap = this.manga.attributes.title;
    Object.entries(descMap).forEach(([key, value]) => {
      if (key === this.mangaSrv.language) this.desc = value;
    });
    Object.entries(titleMap).forEach(([key, value]) => {
      if (key === this.mangaSrv.language) this.title = value;
    });
    console.log(this.desc);
    console.log(this.title);
  }
}
