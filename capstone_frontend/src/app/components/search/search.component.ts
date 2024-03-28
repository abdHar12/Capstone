import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Manga } from 'src/app/module/manga';
import { MangaService } from 'src/app/service/manga.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  allMangasFound: Manga[] = [];
  showResultsVar: boolean = false;
  constructor(private mangaSrv: MangaService) {}

  ngOnInit(): void {}
  showResults() {
    if (this.showResultsVar) this.showResultsVar = false;
    else this.showResultsVar = true;
  }
  onSearch(form: NgForm) {
    const title = form.value.title;
    this.mangaSrv
      .getAllMangasByTitle(title)
      .subscribe((el) => (this.allMangasFound = el.data));
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
}
