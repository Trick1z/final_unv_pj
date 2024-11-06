import { Component, OnInit } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormLabelDirective, FormControlDirective, CardModule, ButtonModule, FormModule, RowDirective, CardImgDirective, CardTextDirective, CardTitleDirective, GutterDirective, BorderDirective, ButtonDirective, GridModule } from '@coreui/angular';

import { Router } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { forEach } from 'lodash-es';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.scss'],
  standalone: true,
  imports: [HttpClientModule, DxDataGridModule, FormModule, ButtonModule, CardModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormLabelDirective, FormControlDirective,
    BorderDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    CardTextDirective,
    CardTitleDirective,
    ColComponent,
    RowComponent,
    TextColorDirective, NgFor, GutterDirective, GridModule, CardImgDirective
  ]
})
export class RangesComponent implements OnInit {

  constructor(private route: Router, private http: HttpClient) { }


  ngOnInit(): void {
    this.getStudentData()
    this.getProductData()
    this.getBorrow()
    this.get_count();
  }




  borrowForm: any = {}
  studentData: any = {}

  nevAdd() {
    this.route.navigate(['/forms/input-group']);
  }

  getBorrow() {
    this.http.get('https://fastapi-example-xafm.onrender.com/get_borrow_y').subscribe((res: any) => {
      this.borrowForm = res;
      // console.log("bor", this.borrowForm);

    })
  }



  getStudentData() {
    this.http.get(`https://fastapi-example-xafm.onrender.com/get_student`).subscribe((res: any) => {
      this.studentData = res;
      // console.log("xxxxxxxxxx",this.studentData);


    })
  }

  productData: any = {}
  getProductData() {
    this.http.get(`https://fastapi-example-xafm.onrender.com/get_product`).subscribe((res: any) => {
      this.productData = res;

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
            return "ไม่มีในระบบ "
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
            return "ไม่มีในระบบ "
        }
      }
    }
    return "ผิดผลาด"
  }


  counts: any = [];

  get_count() {
    const msg = ['all', 'returned', 'not_returned']

    for (let index = 0; index < msg.length; index++) {
      this.http.get(`https://fastapi-example-xafm.onrender.com/count/${msg[index]}`).subscribe((res: any) => {

        const obj: { [key: string]: string } = {
          name: msg[index],
          value: res.list.count
        };
        this.counts.push(obj)
        // console.log("count :", obj);
        // console.log("count :", this.counts);
      })
    }
  }

  displayCardsName(text:string) {
    const msg = ['all', 'returned', 'not_returned']
    const dp = ['รายการทั้งหมด','คืนแล้ว','ยังไม่คืน'] 

    for (let index = 0; index < msg.length; index++) {

      if (text === msg[index]) {
        return dp[index]
      }
    }
    return 'ผิดพลาด'
  }

  convertTime(timestamp: string) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('th-TH', { month: 'long' });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate
  }




}
