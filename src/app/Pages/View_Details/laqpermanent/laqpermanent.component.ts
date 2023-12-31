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
import printJS from 'print-js';

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
  _TahsilLabel : string;

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
      this._SearchCriteria = this.Utility.CloneFilterData(event);
      this.Utility.LogText2("_SearchCriteria",this._SearchCriteria);
      if(this._SearchCriteria.VillageId != null)
        {
          this.GetLAQDetails();
          this._ShowTable = true;
          if(this._SearchCriteria.StateId == 2)
          {
            this._TahsilLabel = "Taluka";
          }
          else
            {
              this._TahsilLabel = "Tahsil";
            }
        }
      else
        {
          alert("Please select village!!")
        }
    }

  
    GetUpperCase(arg: string)
      {
        if(arg)
        {
          return arg.toUpperCase();
        }     
      }

    ResetFilterValues(event)
      {
        this._ShowTable = false;
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
         this.Utility.LogText(this._LAQDataModel.Result.LAQData[0])
          this.docxTemplateService.GenerateDocument(fileURL,this._LAQDataModel.Result[0], "Output_doc")
        }else{
          alert("Please Select Village!!");
        }        
      }

    printpdf()
      {
        if(this._ShowTable ==true)
        {
          const Table = this.pdfTable.nativeElement;
          printJS({printable: Table, type:'html', gridStyle: 
          'border: 1px solid black; margin-bottom: -1px;',targetStyles: ['*'],documentTitle: ""})  
        }else{
          alert("Show the table first!!")
        }           
      }      
  }