import { Target } from '@angular/compiler';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OrderPerUser } from 'src/app/module/order-per-user';
import { User } from 'src/app/module/user';
import { NavService } from 'src/app/service/nav.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnChanges {
  private _success = new Subject<string>();

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  successMessage = '';
  @Input() user!: User;
  @Input() orders!: OrderPerUser[];
  private modalService = inject(NgbModal);
  file!: File;
  fileName: string = '';
  chooseFile: boolean = false;
  modifyForm!: FormGroup;
  modifyProfileState: boolean = false;
  constructor(
    private authSrv: AuthService,
    private fb: FormBuilder,
    private userSrv: UserService,
    private navSrv: NavService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.modifyForm = this.fb.group({
      username: [this.user.username, Validators.required],
      firstName: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    this._success.subscribe((message) => (this.successMessage = message));
    this._success.pipe(debounceTime(3000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
        this.modalService.dismissAll();
      }
    });
  }
  deleteProfile() {
    this.userSrv.deleteProfile().subscribe(() => {
      this.logOut();
      alert('User deleted');
    });
  }
  onModify() {
    const data = {
      username: this.modifyForm.controls['username'].value,
      firstName: this.modifyForm.controls['firstName'].value,
      surname: this.modifyForm.controls['surname'].value,
      email: this.modifyForm.controls['email'].value,
    };
    this.userSrv.modifyUser(data).subscribe((el) => {
      console.log(el);
      alert('Profile updated');
      window.location.reload();
    });
  }
  wantToModify() {
    if (this.modifyProfileState) this.modifyProfileState = false;
    else this.modifyProfileState = true;
  }
  dnoneDiv(div: string, button: string) {
    this.navSrv.dnoneDiv(div, button);
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
