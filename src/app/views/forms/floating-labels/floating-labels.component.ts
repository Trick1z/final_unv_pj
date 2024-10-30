import { IconDirective } from '@coreui/icons-angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormFloatingDirective,
  FormControlDirective,
  FormLabelDirective,
  FormDirective,
  FormSelectDirective,
  GutterDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  FormFeedbackComponent,
} from '@coreui/angular';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFileUploaderModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Component({
  selector: 'app-floating-labels',
  templateUrl: './floating-labels.component.html',
  styleUrls: ['./floating-labels.component.scss'],
  standalone: true,
  imports: [
    DxFormModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormFloatingDirective,
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    NgStyle,
    FormSelectDirective,
    GutterDirective,
    DxTextAreaModule,
    DxPopupModule,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    DxButtonModule,
    DxDataGridModule,
    DxFileUploaderModule,
    HttpClientModule,
    DxSelectBoxModule,
    ListGroupDirective,
    ListGroupItemDirective,
    FormFeedbackComponent,
    NgFor,
    CommonModule,DxDateBoxModule,
  ],
})
export default class FloatingLabelsComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getStatus();
    this.getCategory();
  }
  placeholder = ' asdasd';

  ProductForms: any = {};
  CategoryData: any = [];
  StatusData: any = [];

  nevBack() {
    this.route.navigate(['/forms/validation']);
  }

  getStatus() {
    this.http
      .get('http://127.0.0.1:8000/get_status')
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const obj: { [key: string]: string } = {
            name: res[i].STATUS_NAME,
            value: res[i].STATUS_ID,
          };

          this.StatusData.push(obj);
        }
      });
  }
  getCategory() {
    this.http
      .get('http://127.0.0.1:8000/get_category')
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const obj: { [key: string]: string } = {
            name: res[i].CATEGORY_NAME,
            value: res[i].CATEGORY_ID,
          };

          this.CategoryData.push(obj);
        }
      });
  }

  async onSubmit() {
    this.ProductForms.STUDENT_ID = 0
    this.ProductForms.RECORD_STATUS = "A";
    this.ProductForms.DEL_FRAG = "N";
    this.ProductForms.CREATE_DATE = "2024-01-01T00:00:00.920Z";
    this.ProductForms.UPDATE_DATE = "2024-01-01T00:00:00.920Z";
    const data = this.ProductForms;


    Swal.fire({
      title: `ยืนยันการเพิ่มข้อมูล ?`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {

      if (result.isConfirmed) {
        
        this.http
          .post('http://127.0.0.1:8000/add_product', data)
          .subscribe((res) => {

            console.log("res",res);
            

            Swal.fire({
              icon: 'success',
              title: 'เพิ่มข้อมูลแล้ว',
              showConfirmButton: false,
              timer: 500,
            }) ;

            delay(1000);

            return this.nevBack()
            
          },(error) => {
            console.error('Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ข้อมูลไม่ครบ',
            });
          });
          
      }

    });
  }

  onCancel() {
    this.ProductForms = {}
    // console.log(this.ProductForms);
    return this.nevBack()

  }

  // onsunmits(){
  //   console.log(this.ProductForms);
    
  // }
}
