import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  ButtonDirective,
  BadgeModule,
} from '@coreui/angular';
import {
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import dxSelectBox from 'devextreme/ui/select_box';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { retry } from 'rxjs';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
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
    ButtonDirective,
    NgStyle,
    DxSelectBoxModule,
    CommonModule,
    NgFor,
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
    ButtonDirective,
    HttpClientModule,
    DxSelectBoxModule,
    DxPopupModule, BadgeModule
  ],
})
export class FormControlsComponent implements OnInit {
  url:string ='http://127.0.0.1:8000'
  constructor(private http: HttpClient, private route: Router) { }

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
    this.http.get('http://127.0.0.1:8000/get_borrow').subscribe((res: any) => {
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
            return "ไม่มีในระบบ ผิดผลาด"
        }
      }
    }
  }


  // displayProductData(id: number) {
  //   for (let j = 0; j < this.productData.length; j++) {
  //     if (id === this.productData[j].P_ID) {
  //       return this.productData[j].P_NAME;
  //     }
  //   }
  //   return "ไม่มีในระบบ ผิดผลาด"
  // }

  // displaySerialProductData(id: number) {
  //   for (let j = 0; j < this.productData.length; j++) {
  //     if (id === this.productData[j].P_ID) {
  //       return this.productData[j].P_SERIALNUMBER;
  //     }
  //   }
  //   return "ไม่มีในระบบ ผิดผลาด"
  // }
  // displayeqProductData(id: number) {
  //   for (let j = 0; j < this.productData.length; j++) {
  //     if (id === this.productData[j].P_ID) {
  //       return this.productData[j].P_EQUIPMENTNUMBER;
  //     }
  //   }
  //   return "ไม่มีในระบบ ผิดผลาด"
  // }

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


  //// ส่งคืน


  toChange(item: any) {

    var data = item

    Swal.fire({
      title: `ต้องการคืน ${data.LIST_ID} ใช่หรือไม่ ?`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`http://127.0.0.1:8000/put_borrow_back`, data)
          .subscribe((res) => {
            this.getBorrow();

            return Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'คืนสำเร็จ',
              showConfirmButton: false,
              timer: 500,
            });
          });
      }
    });
  }

  ShowInfoPopup = false;
  showInfoData: any ={}


  triggerPopup(item:any) {

    this.http.get(`${this.url}/get_product/${item.P_ID}`).subscribe((res:object) =>{
      this.showInfoData = res
    })
    return this.ShowInfoPopup = true;
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

