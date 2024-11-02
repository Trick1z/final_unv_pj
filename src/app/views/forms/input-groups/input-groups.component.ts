import { Component, NgModule, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  FormLabelDirective,
  FormCheckInputDirective,
  ButtonDirective,
  ThemeDirective,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  DropdownDividerDirective,
  FormSelectDirective,
  TableModule,
  FormFloatingDirective,
  FormDirective,
  GutterDirective,
  FormCheckComponent,
  FormCheckLabelDirective,
  ColDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  FormFeedbackComponent,
  FormModule,
  CardModule,
  GridModule,

} from '@coreui/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxFormComponent, DxFormModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import { DxiColumnModule, DxiItemModule, DxoFormComponent } from 'devextreme-angular/ui/nested';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-input-groups',
  templateUrl: './input-groups.component.html',
  styleUrls: ['./input-groups.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    FormLabelDirective,
    FormCheckInputDirective,
    ButtonDirective,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    DropdownDividerDirective,
    FormSelectDirective,
    ReactiveFormsModule,
    TableModule,
    DxDataGridModule,
    DxiItemModule,
    DxiColumnModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    FormSelectDirective,
    FormCheckInputDirective,
    ButtonDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    DxDataGridModule,
    HttpClientModule,
    DxFormModule,
    DxSelectBoxModule,
    DxPopupModule,
    NgIf,NgFor, FormsModule,CardModule

    ,ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    RowComponent,
    TextColorDirective,GridModule
  
  ],
})
export class InputGroupsComponent implements OnInit {
  url:string='https://fastapi-example-xafm.onrender.com';


  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.getCategory();
  }


   colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];




  nevBack() {
    this.route.navigate(['/forms/form-control']);
  }

  StudentForms: any;
  showProduct = false

  onSubmit() {
    this.StudentForms = this.findStudentData
    this.ShowFindPopup = false;
    this.isVisible = false
    this.showProduct = true;
    return this.findStudentData = {}
  }



  // ShowFindPopup = false;
  ShowFindPopup = false;
  findStudentData: any = {}
  isVisible = false
  // wrong = false
  // wanning = ""

  find() {
    this.isVisible = false;
    this.findStudentData = {};
    this.sCode = '';
    this.ShowFindPopup = true;
  }

  sCode = ''
  onFindSubmit(code: string) {

    this.http
      .get(`${this.url}/get_student/${code}`)
      .subscribe((res: any) => {

        if (res.status === 404) {
          this.isVisible = false
          
          // this.wrong = true
          // this.wanning = "ไม่พบข้อมูลในระบบ"
          this.ShowFindPopup = false

          Swal.fire({
            position: "center",
            icon: "error",
            title: "ไม่มีข้อมูลในระบบ",
            showConfirmButton: false,
            timer: 1300
          }).then(() => {
            this.ShowFindPopup = true;  // Hide the popup after the alert is closed
          });

        } else if (res.status === 200) {

          this.findStudentData = res.data[0]
          this.isVisible = true
          // this.wrong = false

          // console.log("sData :", this.findStudentData);


        } else {

          this.isVisible = false
          // this.wrong = true

          this.ShowFindPopup = false
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ข้อมูลไม่ถูกต้อง",
            showConfirmButton: false,
            timer: 1300
          }).then(() => {
            this.ShowFindPopup = true;  // Hide the popup after the alert is closed
          });


          // this.wanning = "ข้อมูลไม่ถูกต้อง"

        }

      });


  }


  ShowProductPopup = false;
  //ข้อมูล
  ProductData: any = []

  addproductBTN() {
    this.ShowProductPopup = true;
    this.findProductData();
  }


  ProductDataID: any = {}

  findProductData() {

    this.http.get(`${this.url}/get_product/status`).subscribe((res: any) => {
      this.ProductDataID = res;

    });

  }

  CardButton(id:number){
    
    this.http.get(`${this.url}/get_product_by_Category_Status/${id}`).subscribe((res: any) => {
      this.ProductDataID = res;

    });
  }

  categoryCard:any =[]

  getCategory() {
    this.http
      .get(`${this.url}/get_category`)
      .subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          const obj: { [key: string]: string } = {
            name: res[i].CATEGORY_NAME,
            value: res[i].CATEGORY_ID,
          };
          this.categoryCard.push(obj);
          // console.log(this.categoryCard);
          
        }


      });
  }

  addProductToArr(getid: number, status: string) {
    var id;
    var data  = {}
    var send = {
      text: status
    }


    if (status == 'N') {
      id = this.ProductDataID[getid].P_ID;
      data = this.ProductDataID[getid];
      
      this.ProductData.push(data);
      this.ShowProductPopup = false;

    }else if(status == 'A'){
      id = this.ProductData[getid].P_ID;
      data = this.ProductData[getid];
      this.ProductData.splice(getid,1);
      
    }

  
    this.http.put(`${this.url}/put_waitProduct/${id}`, send)
      .subscribe((res: any) => {
        this.findProductData();
        this.ShowProductPopup = false;
      });

  }

  onSave(){
    
    const data = {
      STUDENT_INFO : this.StudentForms,
      PRODUCT_INFO : this.ProductData,
    }

   

    this.http.post(`${this.url}/borrow`, data)
      .subscribe((res: any) => {
        
      return this.nevBack()
    });
  }



  getProductData() {
    this.http
      .get(`${this.url}/get_product`)
      .subscribe((res: any) => {
        this.ProductData = res;
        // console.log(this.ProductData);
      });
  }
}
