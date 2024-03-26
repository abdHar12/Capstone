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
  @Input() searchManga!: boolean;

  constructor(private mangaSrv: MangaService) {}

  ngOnInit(): void {
    this.setUrlImg(this.manga);
    this.setDesc(this.manga);
    this.setTitle(this.manga);
  }
  dnoneDiv(divId: string, buttonId: string) {
    let target = document.getElementById(buttonId) as HTMLButtonElement;
    if ((target as HTMLButtonElement)!.style.backgroundColor === 'white') {
      (target as HTMLButtonElement)!.style.backgroundColor = 'black';
      (target as HTMLButtonElement)!.style.color = 'white';
      (target as HTMLButtonElement)!.style.border = '2px solid black';
    } else {
      (target as HTMLButtonElement)!.style.backgroundColor = 'white';
      (target as HTMLButtonElement)!.style.color = 'black';
    }
    let div = document.getElementById(divId) as HTMLDivElement;
    div.style.display = 'none';
  }
  deleteRandomMangaFromLS() {
    localStorage.setItem('RandomManga', JSON.stringify(this.manga));
    window.location.reload();
    console.log('questo' + this.manga);
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
