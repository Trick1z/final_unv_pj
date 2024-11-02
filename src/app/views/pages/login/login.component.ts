import { Component, NgModule, OnInit } from '@angular/core';
import { JsonPipe, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { FormControlsComponent } from '../../forms/form-controls/form-controls.component'
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormModule,
} from '@coreui/angular';
import { DxFormModule, DxPopupModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ButtonDirective,
    DxFormModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    HttpClientModule,
    DxPopupModule,
  ],
})
export class LoginComponent implements OnInit {

  height = { height: 300 };

  constructor(private http: HttpClient, private route: Router) {

  }

  ngOnInit(): void {
  }




  url = 'https://fastapi-example-xafm.onrender.com'

  loginForm: any = {}

  onTest() {
    const data = {
      username: this.loginForm.username,
      password: this.loginForm.password
    }

    this.http.post(`${this.url}/account`, data).subscribe((res: any) => {

      // console.log(res.message);

      if (res.message == 200) {



        sessionStorage.setItem("status", JSON.stringify(res))
        this.route.navigateByUrl('forms/form-control');
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "ล็อคอินสำเร็จ",
          showConfirmButton: false,
          timer: 1000
        });

      } else {
        return  Swal.fire({
          position: "center",
          icon: "error",
          title: "ชื่อ หรือ รหัสผ่าน ไม่ถูกต้อง",
          showConfirmButton: true,
          timer: 1500
        });
      }

      // return res
    });




  }
}
