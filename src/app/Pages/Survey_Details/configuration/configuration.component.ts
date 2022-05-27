import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output,ViewChild,QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CategoryDataModel} from '../Survey_Details.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import {BaseResponse, CommonDropdownModel,LookupGroupRespModel,LookupGroupModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  _LookupValues:CommonDropdownModel[];
  _LookupGroupModel : LookupGroupModel;
  _LookupGroupRespModel : LookupGroupRespModel;
  _lookupGroupId ;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  _PopupTitle : string;
  @ViewChild('closebutton') closebutton;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _AddNewDetails : boolean = false;
  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,) 
      { 
        this._LookupValues = [];
        this._LookupGroupModel = new LookupGroupModel();
        this._LookupGroupRespModel = new LookupGroupRespModel();
      }

  ngOnInit(): void 
    {
      this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,
        destroy : true,
        //language: {emptyTable : "No Project Reports!!"}
      };
      this.GetLookupGroups();
    }

  GetLookupGroups()
    {
      let url = this.urlService.GetLookupGroupsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._LookupValues  = response.LookupGroups;
        },error => {
          this.Utility.LogText(error);
        });
    }

  GetAllLookupsForGroup()
    {
      if(this._lookupGroupId != null)
        {
          this.IsDtInitialized = true;
          let url = this.urlService.GetAllLookupsForGroupAPI + this._lookupGroupId;
          this.httpService.get(url,null).subscribe(response => {
            this._LookupGroupRespModel.Result  = response;
            this.ReloadDatatable(); 
            },error => {
              this.Utility.LogText(error);
            });
        }else{
          this._LookupGroupRespModel.Result = null;
          this.ReloadDatatable(); 
        }    
    }

  ReloadDatatable(){
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

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }

  AddNewDetails()
    {
      if(this._lookupGroupId != null)
      {
        this._LookupGroupModel = new LookupGroupModel();
        this._AddNewDetails = true;
        this._PopupTitle = "Add New Details";
        this._LookupGroupModel.LookupGroupId = this._lookupGroupId;
      }
      else{
        alert("Please Select dropdown value!!");
      }     
    }

  EditLookup(argData)
    {
      this._LookupGroupModel = this._LookupGroupModel.CloneData(argData);
      this._AddNewDetails = false;
      this._PopupTitle = "Edit New Details";
    }

  SaveLookUpValue()
    {
      this.CommonService.ShowSpinnerLoading();
      let url = this.urlService.AddOrUpdateLookupsAPI;
      this.httpService.HttpPostRequest(url,this._LookupGroupModel,this.SaveLookUpValueCallBack.bind(this),null);
    }

  SaveLookUpValueCallBack(dtas)
    {
      if(dtas!= null)
        {
         this._LookupGroupRespModel  = dtas;
          if (this._LookupGroupRespModel.StatusCode != 200) 
            {
              alert(this._LookupGroupRespModel.Message);
            }
          if (this._AddNewDetails == false)
            {
              alert("Details updated sucessfully!!");
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();
            }
          else
            {
              alert("Details added sucessfully!!");
              this._AddNewDetails = false;
              this.closebutton.nativeElement.click();
              this.ReloadDatatable();              
            }   
        }
        this.CommonService.hideSpinnerLoading();
        this._AddNewDetails = false;
    }

    
  DeletelookupValue(argdata)
    {
      let APIurl = this.urlService.DeleteLookupAPI + argdata.LookupId + '&lookupGroupId='+ argdata.LookupGroupId;
      this.APIUtilityService.DeleteDocument(APIurl,this._LookupGroupRespModel.Result,argdata)
      .subscribe(response => {
        this.ReloadDatatable();
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
