import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  FormDirective,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonGroupComponent,
  ButtonDirective,
} from '@coreui/angular';
import {
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import dxPopup from 'devextreme/ui/popup';

@Component({
  selector: 'app-checks-radios',
  templateUrl: './checks-radios.component.html',
  styleUrls: ['./checks-radios.component.scss'],
  standalone: true,
  imports: [
    DxFormModule,
    RowComponent,
    ReactiveFormsModule,
    FormDirective,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonGroupComponent,
    ButtonDirective,
    HttpClientModule,
    DxDataGridModule,
    DxPopupModule,

    DxFormModule,
  ],
})
export class ChecksRadiosComponent implements OnInit {
  categoryData: any = {};
  statusData: any = {};

  constructor(private http: HttpClient) { }

  // POPUPSTATUS

  addCategoryPopup = false;
  addStatusPopup = false;

  // Form
  addCateForm: any = {};
  addStatusForm: any = {};

  ngOnInit(): void {
    this.getCategoryData();
    this.getStatusData();
  }
  // ----------------------------------catefory here v----------------------------------

  OnAddCate() {
    this.addCategoryPopup = true;
  }

  getCategoryData() {
    this.http
      .get('http://127.0.0.1:8000/get_category')
      .subscribe((res: any) => {
        this.categoryData = res;
      });
  }

  // CatePopupForm
  categoryOnSubmit() {
    this.addCateForm.RECORD_STATUS = "A";
    this.addCateForm.DEL_FRAG = "N";
    this.addCateForm.CREATE_DATE = "2024-09-29T06:25:50.920Z";
    this.addCateForm.UPDATE_DATE = "2024-09-29T06:25:50.920Z";
    var data = this.addCateForm;

    // console.log(this.addCateForm);


    this.http
      .post('http://127.0.0.1:8000/add_category', data)
      .subscribe((res) => {
        this.getCategoryData();
        this.categoryOnClose();

        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'เพิ่มหมวดหมู่เสร็จสิ้น',
          showConfirmButton: false,
          timer: 1000,
        });
      });
  }

  categoryOnClose() {
    this.addCategoryPopup = false;
    this.addCateForm = {};
  }


  openCategoryDelete(index: number) {
    var id = this.categoryData[index].CATEGORY_ID;
    var name = this.categoryData[index].CATEGORY_NAME;

    // console.log(id);
    // console.log(name);

    Swal.fire({
      title: `ต้องการลบไอดีที่ ${id} "${name}" ใช่หรือไม่ ?`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`http://127.0.0.1:8000/put_del_category/${id}`, id)
          .subscribe((res) => {
            this.getCategoryData();

            return Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'ลบสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }

  editCategoryPopup = false;
  editCateForm: any = {};
  editID = 0;

  onCategoryEditPopup(index: number) {
    this.editCateForm = this.categoryData[index];

    this.editCategoryPopup = true;
  }

  categoryOnEditSubmit() {
    var data = this.editCateForm;
    this.http
      .put(`http://127.0.0.1:8000/put_catedory/${data.CATEGORY_ID}`, data)
      .subscribe((res) => {
        this.getCategoryData();
      });

    this.categoryOnEditClose();
  }

  categoryOnEditClose() {
    this.editCategoryPopup = false;
    this.editCateForm = {};
  }

  // ----------------------------------category here ^----------------------------------

  //----------------------------------status code here v----------------------------------
  OnAddStatus() {
    this.addStatusPopup = true;
  }

  getStatusData() {
    this.http
      .get('http://127.0.0.1:8000/get_status')
      .subscribe((res: any) => {
        this.statusData = res;
      });
  }

  // CatePopupForm
  statusOnSubmit() {
    this.addStatusForm.RECORD_STATUS = "A";
    this.addStatusForm.DEL_FRAG = "N";
    this.addStatusForm.CREATE_DATE = "2024-09-29T06:25:50.920Z";
    this.addStatusForm.UPDATE_DATE = "2024-09-29T06:25:50.920Z";
    var data = this.addStatusForm;
    console.log(data);


    this.http
      .post('http://127.0.0.1:8000/add_status', data)
      .subscribe((res) => {
        this.getStatusData();
        this.statusOnClose();

        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'เพิ่มหมวดหมู่เสร็จสิ้น',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  statusOnClose() {
    this.addStatusPopup = false;
    this.addStatusForm = {};
  }


  EditStatusPopup = false;
  editStatusForm: any = {};

  onStatusEditPopup(index: number) {
    this.EditStatusPopup = true;
    this.editStatusForm = this.statusData[index]
  }
  openStatusDelete(index: number) {
    var id = this.statusData[index].STATUS_ID;
    var name = this.statusData[index].STATUS_NAME;

    // console.log(id);
    // console.log(name);
    // console.log("all:",this.statusData[index]) ;


    Swal.fire({
      title: `ต้องการลบไอดีที่ ${id} "${name}" ใช่หรือไม่ ?`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put(`http://127.0.0.1:8000/put_del_status/${id}`, id)
          .subscribe((res) => {
            this.getStatusData();

            return Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'ลบสำเร็จ',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }

  EditStatusOnSubmit() {
    var data = this.editStatusForm;
    this.http
      .put(`http://127.0.0.1:8000/put_status/${data.STATUS_ID}`, data)
      .subscribe((res) => {
        this.getStatusData();
      });

    this.StatusOnEditClose();
  }

  StatusOnEditClose() {
    this.editStatusForm = {}
    this.EditStatusPopup = false;
  }
  //----------------------------------status code here ^----------------------------------

}
