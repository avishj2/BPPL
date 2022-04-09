import { Component, OnInit } from '@angular/core';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { DocxTemplateService } from 'src/app/services/Docxtemplate.service';


@Component({
  selector: 'app-laqpermanent',
  templateUrl: './laqpermanent.component.html',
  styleUrls: ['./laqpermanent.component.css']
})
export class LAQPermanentComponent implements OnInit {
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _tablearray : datamodel[]

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
      this._tablearray = [];
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
   let array = {
    "table": 
    [   {
          "SNo": "1",
          "SurveyNo ": "S-432",
          "Ha ": "2543",
          "Are": "425",
          "Sqmt": "4321",
          "Landowner": "gerhtes trhr",
          "Kabjedar": "erhytw er",
          "Remarks": "BDSUJVBSNB",
        },
        {
          "SNo": "2",
          "SurveyNo ": "S-44",
          "Ha ": "454",
          "Are": "7657",
          "Sqmt": "4342",
          "Landowner": "bdzfbhd trhr",
          "Kabjedar": "dshs grsg",
          "Remarks": "SECOND",          
          },
          {
            "SNo": "",
            "SurveyNo ": "",
            "Ha ": "",
            "Are": "",
            "Sqmt": "",
            "Landowner": "gfdzshbdz dh",
            "Kabjedar": " ",
            "Remarks": "",            
          }]
    }
    this._tablearray =  JSON.parse(JSON.stringify(array));
    console.log("this._tablearray",this._tablearray)
  }



  GetValuesFromFilters(event) 
    {
      this.Utility.LogText2("view-award-reports",event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.VillageId != null)
        {
          console.log(this._SearchCriteria.VillageName)
        }
      else
        {
          alert("Please select village!!")
        }
    }

    /** */
    CreatedDocFile()
      {
        let fileURL = "https://bppl.dgdatam.com/api/Crossing/Download?documentId=106";//103
        this.docxTemplateService.GenerateDocument(fileURL,this._tablearray, "Output_doc")
      }

  }

export class datamodel {  
  SNo: any;
  SurveyNo : any;
  Ha : any;
  Are: any;
  Sqmt: any;
  Landowner: string;
  Kabjedar: string;
  Remarks: string;
}  
