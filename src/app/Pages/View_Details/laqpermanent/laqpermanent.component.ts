import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { DocxTemplateService } from 'src/app/services/Docxtemplate.service';
import { LAQDataModel } from 'src/app/Model/Survey.model';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-laqpermanent',
  templateUrl: './laqpermanent.component.html',
  styleUrls: ['./laqpermanent.component.css']
})
export class LAQPermanentComponent implements OnInit {
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _LAQDataModel : LAQDataModel;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  _ShowTable : boolean = false;


  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,
    public docxTemplateService : DocxTemplateService) 
    { 
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
      this._LAQDataModel = new LAQDataModel();
    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSurneyNos = false;
      this._FilterControls.ShowChainageFrom = false;
      this._FilterControls.ShowChainageTo = false;
      this._FilterControls.ShowSearchBtn = true;
    }

    
  ngOnInit(): void {
  }

  GetValuesFromFilters(event) 
    {
      this.Utility.LogText2("view-award-reports",event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.VillageId != null)
        {
          this.GetLAQDetails();
          this._ShowTable = true;
        }
      else
        {
          alert("Please select village!!")
        }
    }

    GetLAQDetails()
    {
      let url = this.urlService.GetSurveyDetailsForLAQAPI + this._SearchCriteria.VillageId;     
      this.httpService.HttpGetRequest(url,this.GetLAQCallBack.bind(this),null);
    }

  /**callback */  
  GetLAQCallBack(dtas)
    {
      if (dtas != null)
      {
        this._LAQDataModel = dtas;
        this.Utility.LogText2("this._LAQDataModel",this._LAQDataModel);
        if (this._LAQDataModel.StatusCode != 200) 
          {
            alert(this._LAQDataModel.Message);
          }
      }
    }

    /** */
    CreatedDocFile()
      {
        if(this._SearchCriteria.VillageId !=null)
        {
          let fileURL = "https://bppl.dgdatam.com/api/Crossing/Download?documentId=131";//103
          console.log(this._LAQDataModel.Result[0])
          this.docxTemplateService.GenerateDocument(fileURL,this._LAQDataModel.Result[0], "Output_doc")
        }else{
          alert("Please Select Village!!");
        }
        
      }

      
    async makePdf() 
      { 
        let doc = new jsPDF('l', 'pt', 'a4');// A4 size page of PDF  
        const Table = this.pdfTable.nativeElement;
        const PDFoptions = {width :0.1,filename:"file",y:5, x:5,margin:1}
        await doc.html(Table,PDFoptions);
        //doc.text("Hello world!", 10, 10);
        doc.save("output.pdf");
        //doc.output('dataurlnewwindow'); // just open it
      }

  }