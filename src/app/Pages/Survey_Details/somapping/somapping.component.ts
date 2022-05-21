import { AfterViewInit,Component, OnInit, Input, Output,EventEmitter,ViewChild } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import {BaseResponse, CommonDropdownModel,LookupGroupRespModel,LookupGroupModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-somapping',
  templateUrl: './somapping.component.html',
  styleUrls: ['./somapping.component.css']
})
export class SOMappingComponent implements OnInit {
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it?";
  @ViewChild(DataTableDirective, {static: false})
  //@ViewChildren(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _AllTaluka : CommonDropdownModel[];
  _PopupTitle : string;
  @ViewChild('closebutton') closebutton;
  _lookupGroupId ;
  _AddNewDetails : boolean = false;
  _LookupValues:CommonDropdownModel[];
  _LookupGroupModel : LookupGroupModel;
  _LookupGroupRespModel : LookupGroupRespModel;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
      { 
        this._LookupValues = [];
        this._LookupGroupModel = new LookupGroupModel();
        this._LookupGroupRespModel = new LookupGroupRespModel();
      }

  ngOnInit(): void {
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,
        language: {emptyTable : "No Data!!"}
      };
      this.GetAllTalukaAPI();
      this.GetAllLookupsForGroup();
  }

  GetAllTalukaAPI()
    {
      let url = this.urlService.GetAllTalukaAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._AllTaluka = response; 
        },error => {
          this.Utility.LogText2("GetAllTalukaAPI error",error); 
        });     
    }

    GetAllLookupsForGroup()
      {
        let url = this.urlService.GetAllLookupsForGroupAPI + 1031;
        this.httpService.get(url,null).subscribe(response => {
          this._LookupGroupRespModel.Result  = response;
          this.ReloadDatatable(); 
          },error => {
            this.Utility.LogText(error);
          });          
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

    GetLookupValue(lookups : CommonDropdownModel[], lookUpid: number) : any
      {
        let object = lookups.find(elm=>elm.Value == lookUpid );
        if(object)
        {
          return object.Text;
        }
        else { 
          return lookUpid;
        }
      }

  AddNewDetails()
    {
      this._LookupGroupModel = new LookupGroupModel();
      this._AddNewDetails = true;
      this._PopupTitle = "Add SO Mapping";      
    }

  EditLookup(argData)
    {
      this._AddNewDetails = false;
      this._PopupTitle = "Edit SO Mapping";
      this._LookupGroupModel = argData;
    }

  SaveLookUpValue()
    {
      this.CommonService.ShowSpinnerLoading();
      this._LookupGroupModel.LookupGroupId = 1031;
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


    DeleteValue(argdata)
      {
        let url = this.urlService.DeleteLookupAPI + argdata.LookupId + '&lookupGroupId='+ argdata.LookupGroupId;
        this.httpService.get(url,null).subscribe(response => {
        let Details : any = response;
          if (Details.StatusCode != 200) 
            {
              alert(Details.Message);
            }
            else {
              alert("Value deleted successfully !");
              this.ReloadDatatable();    
            }          
          },error => {
            this.Utility.LogText(error);
          });
      }
}
