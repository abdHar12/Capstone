import { Target } from '@angular/compiler';
import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/module/user';
import { UserService } from 'src/app/service/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user!: User;
  private modalService = inject(NgbModal);

  file!: File;
  fileName: string = '';
  chooseFile: boolean = false;
  constructor(
    private authSrv: AuthService,
    private userSrv: UserService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {}

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
        this.toast.success({ detail: 'Success' });
      });
    }
  }
  logOut() {
    this.userSrv.logOut();
  }
}
