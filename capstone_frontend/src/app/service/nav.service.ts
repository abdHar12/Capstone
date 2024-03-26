import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor() {}
  dnoneDiv(divId: string, buttonId: string) {
    let target = document.getElementById(buttonId) as HTMLButtonElement;
    if ((target as HTMLButtonElement)!.style.backgroundColor === 'white') {
      (target as HTMLButtonElement)!.style.backgroundColor = 'black';
      (target as HTMLButtonElement)!.style.color = 'white';
    } else {
      (target as HTMLButtonElement)!.style.backgroundColor = 'white';
      (target as HTMLButtonElement)!.style.color = 'black';
    }
    let div = document.getElementById(divId) as HTMLDivElement;
    div.style.display = 'none';
  }
}
