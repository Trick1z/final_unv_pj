import { IconDirective } from '@coreui/icons-angular';
import { Component, OnInit } from '@angular/core';
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
  CardModule,
  GridModule,
} from '@coreui/angular';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
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
    TextColorDirective, NgFor,GridModule
  ],
})
export class ValidationComponent implements OnInit {

  G_ID = 0;
  ShowmorePopup = false;

  // colors = [
  //   { color: 'primary', textColor: 'primary' },
  //   { color: 'secondary', textColor: 'secondary' },
  //   { color: 'success', textColor: 'success' },
  //   { color: 'danger', textColor: 'danger' },
  //   { color: 'warning', textColor: 'warning' },
  //   { color: 'info', textColor: 'info' },
  //   { color: 'light' },
  //   { color: 'dark' }
  // ];




  constructor(private route: Router, private http: HttpClient) { }
  ngOnInit(): void {
    this.getProductData();
    this.getStatus();
    this.getCategory();

  }

  nevAdd() {
    this.route.navigate(['/forms/floating-labels']);
  }


  testAPI = 'https://fastapi-example-xafm.onrender.com/testdb';
  ProductData: any = {};
  StatusData: any = [];
  CategoryData: any = [];
  // StatusData: any = {};

  //  getdata
  categoryCard: any = [];


  getProductData() {
    this.http
      .get('https://fastapi-example-xafm.onrender.com/get_product')
      .subscribe((res: any) => {
        this.ProductData = res;
        // console.log(this.ProductData);
      });
  }

  getStatus() {
    this.http
      .get('https://fastapi-example-xafm.onrender.com/get_status')
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const obj: { [key: string]: string } = {
            name: res[i].STATUS_NAME,
            value: res[i].STATUS_ID,
          };

          this.StatusData.push(obj);
        }
        // console.log(this.StatusData);
        // console.log("get status :" ,res);
      });
  }

  getCategory() {
    this.http
      .get('https://fastapi-example-xafm.onrender.com/get_category')
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const obj: { [key: string]: string } = {
            name: res[i].CATEGORY_NAME,
            value: res[i].CATEGORY_ID,
          };
          this.categoryCard.push(obj);
          this.CategoryData.push(obj);
        }
        // console.log(this.CategoryData);
        // console.log("get cate :", res);
      });
  }

  displayFormatDate_status(id: number) {
    for (let i = 0; i < this.StatusData.length; i++) {
      if (id === this.StatusData[i].value) {
        return this.StatusData[i].name;
      }
    }
  }

  displayFormatDate_category(id: number) {
    for (let i = 0; i < this.CategoryData.length; i++) {
      if (id === this.CategoryData[i].value) {
        return this.CategoryData[i].name;
      }
    }

    return "ไม่มีในระบบ ผิดผลาด"
  }
  tempForm: any;

  ProductEditPopup = false;
  ProductEditForm: any = {};



  onProductEditPopup(getID: number) {
    this.G_ID = this.ProductData[getID].P_ID;
    this.ProductEditPopup = true;
    this.ProductEditForm = this.ProductData[getID];

  }

  openProductDelete(getID: number) {
    var id = this.ProductData[getID].P_ID;
    var name = this.ProductData[getID].P_NAME;

    Swal.fire({
      title: `ต้องการลบ ${name} ID ที่ ${id}`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`https://fastapi-example-xafm.onrender.com/put_del_product/${id}`, id)
          .subscribe((res) => {
            this.getProductData();

            return Swal.fire({
              icon: 'success',
              title: 'ลบข้อมูลแล้ว',
              showConfirmButton: false,
              timer: 1000,
            });
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ยกเลิกการลบแล้ว',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }


  onCancelEditPopup() {
    this.ProductEditForm = {};
    this.ProductEditPopup = false;
    this.getProductData();
  }

  onSubmitEdtiPopup() {
    const data = this.ProductEditForm;
    this.http
      .put(`https://fastapi-example-xafm.onrender.com/put_product/${this.G_ID}`, data)
      .subscribe((res) => {
        this.getProductData();
        this.ProductEditPopup = false;

        return Swal.fire({
          icon: 'success',
          title: 'อัพเดทข้อมูลแล้ว',
          showConfirmButton: false,
          timer: 1000,
        });
      });
    console.log(data);
    
  }

  showmoreData: any;


  getShowmoreData(id: number) {
    this.http
      .get(`https://fastapi-example-xafm.onrender.com/get_product/${id}`)
      .subscribe((res: any) => {
        this.showmoreData = res[0];
        // console.log(this.showmoreData);
        // console.log(res);

      });
  }


  onShowMorePopup(getID: number) {
    var id = this.ProductData[getID].P_ID;
    this.ShowmorePopup = true;
    this.getShowmoreData(id)

  }

  CardButton(id: number) {
    // console.log(`id : ${id}`);

    this.http
      .get(`https://fastapi-example-xafm.onrender.com/get_product_by_Category/${id}`)
      .subscribe((res: any) => {
        this.ProductData = res;
        // console.log(this.ProductData);
      });



  }
}
