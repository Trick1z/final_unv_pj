import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, CardModule, ColComponent, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormLabelDirective, FormSelectDirective, GridModule, InputGroupComponent, InputGroupTextDirective, ListGroupDirective, ListGroupItemDirective, RowComponent, TextColorDirective } from '@coreui/angular';
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
  ListGroupDirective],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  constructor(
    private route: Router,
    private http :HttpClient
  ) { }

  ngOnInit(): void {
    // this.getAccount()
  }

  data: any = [
    {
      "USER_NAME": "adam",
      "USER_PW": 32,
      "USER_USER": "Dog"
    },
    {
      "USER_NAME": "adams",
      "USER_PW": 42,
      "USER_USER": "Cat"
    }, {
      "USER_NAME": "adam",
      "USER_PW": 32,
      "USER_USER": "Dog"
    },
    {
      "USER_NAME": "adams",
      "USER_PW": 42,
      "USER_USER": "Cat"
    }, {
      "USER_NAME": "adam",
      "USER_PW": 32,
      "USER_USER": "Dog"
    },
  
  ]

  accountData:any = [];
  getName:string= 'adam';

  methods:string ='account';

  getAccount(getText:string){


    let url = "http://127.0.0.1:8000"
    this.http.get(`${url}/get_${getText}`).subscribe((res:any) =>{
      this.accountData = res;
      console.log(this.accountData);
      
    });

  }

  // onHitButtons(){
  //   this.accountData = this.data;
  // }

}
