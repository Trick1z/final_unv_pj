import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BadgeModule, ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, CardModule, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormLabelDirective, FormSelectDirective, GridModule, InputGroupComponent, InputGroupTextDirective, ListGroupDirective, ListGroupItemDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { DxButtonModule, DxDataGridModule, DxFormModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    DxDataGridModule,
    DxFormModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormFeedbackComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ListGroupDirective,
    ListGroupItemDirective,
    HttpClientModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
    CardModule,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    TextColorDirective, NgFor, GridModule,
    ListGroupDirective, BadgeModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  constructor(
    private route: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getStudentData()
    this.getProductData()
    this.getBorrow()
  }


  accountData: any = [];
  getName: string = 'adam';

  methods: string = 'account';

  getAccount(getText: string) {


    let url = "http://127.0.0.1:8000"
    this.http.get(`${url}/get_${getText}`).subscribe((res: any) => {
      this.accountData = res;
      console.log(this.accountData);

    });

  }

  // onHitButtons(){
  //   this.accountData = this.data;
  // }

  url: string = 'http://127.0.0.1:8000';

  borrowForm: any = []
  getBorrow() {
    this.http.get(`${this.url}/get_borrow`).subscribe((res: any) => {
      this.borrowForm = res;
      console.log("bor", this.borrowForm);

    })
  }

  studentData: any = []
  getStudentData() {
    this.http.get(`${this.url}/get_student`).subscribe((res: any) => {
      this.studentData = res;
      console.log("student", this.studentData);
    })
  }

  productData: any = []
  getProductData() {
    this.http.get(`${this.url}/get_product`).subscribe((res: any) => {
      this.productData = res;
      console.log('product :', this.productData);


    })
  }

  displayStudentData(id: number, text: string) {
    for (let i = 0; i < this.studentData.length; i++) {
      if (id === this.studentData[i].STUDENT_ID) {

        switch (text) {
          case 'name':
            return this.studentData[i].STUDENT_NAME;
          case 'code':
            return this.studentData[i].STUDENT_CODE;

          default:
            return "ไม่มีในระบบ ผิดผลาด"
        }
      }
    }
  }

  displayproduct(id: number, text: string) {
    for (let j = 0; j < this.productData.length; j++) {
      if (id === this.productData[j].P_ID) {

        switch (text) {
          case 'name':
            return this.productData[j].P_NAME;
          case 'serial':
            return this.productData[j].P_SERIALNUMBER;
          case 'qe':
            return this.productData[j].P_EQUIPMENTNUMBER;

          default:
            return "ไม่มีในระบบ ผิดผลาด"
        }
      }
    }
    return "ผิดผลาด"
  }

  convertTime(timestamp:string) {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate 
  }
}