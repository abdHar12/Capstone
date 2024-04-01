import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  allSettingsAreDone!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.allSettingsAreDone = false;

    setTimeout(() => {
      console.log(this.allSettingsAreDone);
      this.allSettingsAreDone = true;
      console.log(this.allSettingsAreDone);
    }, 5000);
  }
}
