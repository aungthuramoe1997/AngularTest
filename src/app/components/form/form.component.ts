import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invoice } from 'src/app/interface/invoice';
import { LocalJsonReaderService } from 'src/app/services/local-json-reader.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  invoiceForm:any;
  data:Invoice[] = [] as Invoice[];
  notFound:boolean = false;
  constructor(private fb:FormBuilder,private jsonReader:LocalJsonReaderService) {
    this.invoiceForm = this.fb.group({
      invoiceNo:[''],
      invoiceName:[''],
      customerName:[''],
      totalAmount:['']
    })
   }

  ngOnInit(): void {
      this.readJson()
  }

  readJson() {
    this.jsonReader.readJsonData().subscribe(data=>{
      this.data = data.RES_SALES_INVOICE;
    })
  }

  search():void{
   const invoiceNumber = this.invoiceForm.get('invoiceNo').value;
   if(!invoiceNumber){
      return;
   }
   const index = this.data.findIndex((invoice:Invoice)=>invoice.InvoiceNo === invoiceNumber)
   
   this.notFound = index === -1 ? true:false;
   if(index !== -1){
    const searchResult = this.data[index]
     this.invoiceForm.controls.invoiceName.setValue(searchResult.InvoiceName);
     this.invoiceForm.controls.customerName.setValue(searchResult.CustomerName);
     this.invoiceForm.controls.totalAmount.setValue(searchResult.TotalAmount);
   }
  }

  clearForm(){
    this.invoiceForm.reset();
  }

}
