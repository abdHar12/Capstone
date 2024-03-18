import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  Event,
} from '@angular/router';
import { ngbPositioning } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  currentRoute!: string;
  constructor(private router: Router, private authSrv: AuthService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url;
        console.log(this.currentRoute);
        console.log(event);
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit(): void {}

  logOut() {
    this.authSrv.logout();
  }

  styleOfButton(target: EventTarget | null): void {
    if ((target as HTMLButtonElement)!.style.backgroundColor === 'white') {
      (target as HTMLButtonElement)!.style.backgroundColor = 'black';
      (target as HTMLButtonElement)!.style.color = 'white';
      (target as HTMLButtonElement)!.style.border = '2px solid black';
    } else {
      (target as HTMLButtonElement)!.style.backgroundColor = 'white';
      (target as HTMLButtonElement)!.style.color = 'black';
    }
    let cartDiv = document.querySelector('#cart-div') as HTMLDivElement;
    cartDiv.style.display === 'none'
      ? (cartDiv.style.display = 'block')
      : (cartDiv.style.display = 'none');
  }
}
