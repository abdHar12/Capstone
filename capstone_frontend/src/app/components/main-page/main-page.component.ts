import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private mangaSrv: MangaService) {}

  ngOnInit(): void {
    this.mangaSrv.getAllMangas().subscribe((allmangas) => {
      this.mangaSrv.setAllMangas(allmangas.data);
      this.allmangas = allmangas.data;
    });
  }

  changePage(id: string) {
    this.router.navigate([`/details/${id}`]);
  }
}
