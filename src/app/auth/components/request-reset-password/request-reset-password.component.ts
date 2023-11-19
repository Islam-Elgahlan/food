import { Component } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent {
resetRequest(arg0: string) {
throw new Error('Method not implemented.');
}
  email: string = '';
  // constructor(
  //   public _MatDialog : MatDialog){}
  constructor(
    public dialogRef: MatDialogRef<RequestResetPasswordComponent> ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
}
