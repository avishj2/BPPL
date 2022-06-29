import { Component,AfterViewInit, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { TreeRespDataModel,TreeModel, SurveyDropDownsDataModel,AllSurveyDetailsDataModel} from 'src/app/Model/Survey.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonDropdownModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-tree-details',
  templateUrl: './tree-details.component.html',
  styleUrls: ['./tree-details.component.css']
})
export class TreeDetailsComponent implements OnInit {
  @Input() SurveyDropDownsData : SurveyDropDownsDataModel;
  @Input() AllSurveyDetails : AllSurveyDetailsDataModel;
  @Input() SurveyNumber : any;
  @Output() Output:EventEmitter<any>= new EventEmitter();
  @ViewChild('closebutton') closebutton;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it?";
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;

  _AddNewTree : boolean;
  _PopupTitle : string;

  _TreeDataModel : TreeModel;
  _AllSurveyDetails : AllSurveyDetailsDataModel;

    constructor(
      public urlService: UrlService,
      private router: Router,
      public CommonService : CommonService,
      public httpService : HttpService,
      public Utility :UtilityService,) 
      {
        this._TreeDataModel = new TreeModel();
        this._AllSurveyDetails = new AllSurveyDetailsDataModel();
      }

  ngOnInit(): void 
    {
      this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 5,
        language : {emptyTable : "No Trees!!"}
      };
      this._TreeDataModel.SurveyId = this.SurveyNumber;
      this._AllSurveyDetails.Result.Trees = this.AllSurveyDetails.Result.Trees;
      this._AllSurveyDetails.Result.SurveyOwnersDrp = this.AllSurveyDetails.Result.SurveyOwnersDrp;
      this.ReloadDatatable();
    }

    ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }
  
  /**refresh/reload data table 
  *when data update/delete/add in the datatable  
  **/
  ReloadDatatable()
  {
    /**initialized datatable */
    if (this.IsDtInitialized) 
      {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => 
        {
          dtInstance.destroy();//Destroy the table first
          this.dtTrigger.next();//Call the dtTrigger to rerender again
        });
      }
      else
        {
          this.IsDtInitialized = true;
          this.dtTrigger.next();
        }
  }


  AddNewTreeDetails()
    {
      if(this.SurveyNumber != null)
        {
          this._AddNewTree = true;
          this._PopupTitle = "Add Tree Details";
          this._TreeDataModel = new TreeModel();
        }
        else
          {
            alert("Please Select Survey Number!!");
          }
    }

  EditTreeDetails(arg)
    {
      this._TreeDataModel = this._TreeDataModel.CloneTreeData(arg);
      this._AddNewTree = false;
      this._PopupTitle = "Edit Tree Details";
    }

  SaveTreeDetails()
    {
      this.CommonService.ShowSpinner();
      this._TreeDataModel.SurveyId = Number(this.SurveyNumber);
      let url = this.urlService.AddOrUpdateSurveyTreeAPI;     
      this.httpService.HttpPostRequest(url,this._TreeDataModel,this.AddOrUpdateTreeCallBack.bind(this),null);
    }

  AddOrUpdateTreeCallBack(dtas)
    {
      if (dtas != null)
        {
          let RespDataModel : TreeRespDataModel  = dtas;
          if (RespDataModel.StatusCode != 200) 
            {
              alert(RespDataModel.Message);
            }
          if (this._AddNewTree == false)
            {
              alert("Tree updated sucessfully!!");
              this._AllSurveyDetails.Result.Trees = RespDataModel.Result;
              this.SetParentData();
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }
          else
            {
              alert("Tree added sucessfully!!");
              this._AllSurveyDetails.Result.Trees = RespDataModel.Result;
              this.SetParentData();
              this._AddNewTree = false;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }   
        }
        this._AddNewTree = false;
    }

  SetParentData()
    {
      this.AllSurveyDetails.Result.Trees = this._AllSurveyDetails.Result.Trees
    }

  DeleteTreeDetails(arg)
    {
      this.CommonService.ShowSpinner();
      let url = this.urlService.DeleteSurveyTreeAPI + arg.SurveyTreeId + '&surveyId='+ arg.SurveyId;
        this.httpService.get(url,null).subscribe(response => {
          let OwnerDetails : any = response;
          if (OwnerDetails.StatusCode != 200) 
            {
              alert(OwnerDetails.Message);
            }
            else {
              alert("Tree Details deleted successfully!");
              this._AllSurveyDetails.Result.Trees = response.Result;
              this.SetParentData();
              this.ReloadDatatable();
            }
          },error => {
            this.Utility.LogText(error);
          });
    }

  GetLookupValue(lookups : CommonDropdownModel[], lookUpid: Number) : any
    {
      let object = lookups.find(elm=>elm.Value == lookUpid );
      if(object)
      {
        return object.Text;
      }
      else { return lookUpid;}
    }

}
