import { Component, OnInit } from '@angular/core';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormLabelDirective, FormControlDirective, CardModule, ButtonModule, FormModule } from '@coreui/angular';

import { Router } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ranges',
  templateUrl: './ranges.component.html',
  styleUrls: ['./ranges.component.scss'],
  standalone: true,
  imports: [HttpClientModule,DxDataGridModule, FormModule, ButtonModule, CardModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormLabelDirective, FormControlDirective]
})
export class RangesComponent implements OnInit {

  constructor( private route: Router,private http:HttpClient) { }


  ngOnInit(): void {
    this.getStudentData()
    this.getProductData()
    this.getBorrow()
  }

  borrowForm: any = {}
  studentData: any = {}

  nevAdd() {
    this.route.navigate(['/forms/input-group']);
  }

  getBorrow() {
    this.http.get('http://127.0.0.1:8000/get_borrow_y').subscribe((res: any) => {
      this.borrowForm = res;
      // console.log("bor", this.borrowForm);

    })
  }



  getStudentData() {
    this.http.get(`http://127.0.0.1:8000/get_student`).subscribe((res: any) => {
      this.studentData = res;
      // console.log("xxxxxxxxxx",this.studentData);


    })
  }

  productData: any = {}
  getProductData() {
    this.http.get(`http://127.0.0.1:8000/get_product`).subscribe((res: any) => {
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


}
