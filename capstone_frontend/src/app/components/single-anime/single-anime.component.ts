import { Component, Input, OnInit } from '@angular/core';
import { CoverArt } from 'src/app/module/cover-art';
import { CoverArtData } from 'src/app/module/cover-art-data';
import { Manga } from 'src/app/module/manga';
import { MangaService } from 'src/app/service/manga.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-anime',
  templateUrl: './single-anime.component.html',
  styleUrls: ['./single-anime.component.scss'],
})
export class SingleAnimeComponent implements OnInit {
  @Input() manga!: Manga;
  desc!: string;
  title!: string;
  urlImg!: string;

  constructor(private mangaSrv: MangaService) {}

  ngOnInit(): void {
    let descMap: Map<string, string>;
    let titleMap: Map<string, string>;
    let idCover: string;

    descMap = this.manga.attributes.description;
    titleMap = this.manga.attributes.title;

    this.manga.relationships.forEach((el) => {
      if (el.type === 'cover_art') {
        idCover = el.id;
        this.mangaSrv.getSingleCover(idCover).subscribe((cover) => {
          let coverArt: CoverArt = cover.data;
          let mangaId!: String;
          cover.data.relationships.forEach((rel) => {
            console.log(rel);
            Object.entries(rel).forEach(([key, value]) => {
              if (key === 'type' && value === 'manga') {
                console.log(rel.id);
                mangaId = rel.id;
                this.urlImg = `https://uploads.mangadex.org/covers/${mangaId}/${coverArt.attributes.fileName}`;
              }
            });
            console.log('-------------------------------------');
          });
        });
      }
    });

    Object.entries(descMap).forEach(([key, value]) => {
      if (key === this.mangaSrv.language) this.desc = value;
    });
    Object.entries(titleMap).forEach(([key, value]) => {
      if (key === this.mangaSrv.language) this.title = value;
    });
  }
}
