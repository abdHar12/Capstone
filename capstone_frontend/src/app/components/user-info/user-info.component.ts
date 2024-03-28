import { Target } from '@angular/compiler';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/module/user';
import { NavService } from 'src/app/service/nav.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  successMessage = '';
  @Input() user!: User;
  private modalService = inject(NgbModal);

  file!: File;
  fileName: string = '';
  chooseFile: boolean = false;
  constructor(
    private authSrv: AuthService,
    private userSrv: UserService,
    private navSrv: NavService
  ) {}
  ngOnInit(): void {
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
        this.modalService.dismissAll();
      }
    });
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  onFileSelected(event: Event | null) {
    let file: File = (event!.target! as HTMLInputElement).files![0];
    if (file.name.includes('.jpg') || file.name.includes('.png')) {
      console.log(this.file);
      this.file = file;
    } else {
      alert('Invalid file format');
    }
  }

  confirmTheImg() {
    if (this.file) {
      this.fileName = this.file.name;

      const formData = new FormData();

      formData.append('avatar', this.file);

      this.userSrv.uploadAvatar(formData).subscribe(() => {
        this._success.next(`Image updated successfully`);
        this.modalService.dismissAll();
        this.navSrv.dnoneDiv('user-div', 'user-button');
      });
    }
  }

  logOut() {
    this.userSrv.logOut();
  }
}
