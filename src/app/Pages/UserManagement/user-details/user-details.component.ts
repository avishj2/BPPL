import { Component,AfterViewInit, OnInit, Input,OnChanges, Output,EventEmitter,ViewChild,ViewChildren } from '@angular/core';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { HttpService } from '../../../services/http.service';
import { HttpClient, HttpResponse, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { CommonDropdownModel, CommonDocDataModel} from 'src/app/Model/Base.model';
import { CrossingDetailsDataModel,CrossingModel } from 'src/app/Model/Crossing.model';
import { CrossingDropdownDataModel } from 'src/app/Model/Filters.model';
import { UserDropdownsModel,RoleRespDataModel,PasswordUpdateRespModel,RoleDataModel,UserDataModel,UserRespDataModel } from 'src/app/Model/User.model';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  _UserDetails : UserDataModel[];
  _UserDataModel : UserDataModel;
  _UserDropdownsModel : UserDropdownsModel;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _PopupTitle : string;
  @ViewChild('closebutton') closebutton;//add/edit user
  @ViewChild('closebutton2') closebutton2;//rolemodel
  @ViewChild('closebutton3') closebutton3;//password
  _AddNewUser : boolean = false;
  _UserName : string;
  _UserIDForUdpate : number; // Will be used to populate roles colelction
  /**popup message variables */
  popoverTitle ="Password";
  popoverMessage = "Are you sure you want to change your password ?";

  constructor(public urlService: UrlService,
    public APIUtilityService: APIUtilityService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    ) 
    { 
      this._UserDropdownsModel = new UserDropdownsModel();
      this._UserDataModel = new UserDataModel();
    }

  ngOnInit(): void 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 5,
          language: {emptyTable : "No User!!"}
        };
      this.GetUsersDropDowns();
      this.GetAllUsers();
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
  /** get User Dropdown values*/
  GetUsersDropDowns()
    {
      let url = this.urlService.GetUsersDropDownsAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._UserDropdownsModel = response;
        },
        error => {
          this.Utility.LogText(error);
        });
    }
    
  GetAllUsers()
    {
      let url = this.urlService.GetAllUsersAPI;
      this.httpService.get(url,null).subscribe(response => {
        this._UserDetails = response;
        this.IsDtInitialized = true;
        this.ReloadDatatable();
        },
        error => {
          this.Utility.LogText(error);
        });
    }

  AddNewUserDetails()
    {
      this._UserDataModel = new UserDataModel();
      this._PopupTitle = "Add User Details";
      this._AddNewUser = true;
    }

  EditUserDetails(arg)
    {
      this._UserDataModel = this._UserDataModel.CloneData(arg)
      this._PopupTitle = "Edit User Details";
      this._AddNewUser = false;
    }


  AddOrUpdateDetails()
    {
      let url = this.urlService.AddOrUpdateUsersAPI;
      this.httpService.HttpPostRequest(url,this._UserDataModel,this.AddOrUpdateDetailsCallBack.bind(this),null);
    } 
  
  AddOrUpdateDetailsCallBack(dtas)
    {
      if(dtas!= null)
      {
       let UserDataRespModel : UserRespDataModel  = dtas;
       if (UserDataRespModel.StatusCode != 200) 
          {
            alert(UserDataRespModel.Message);
          }
        if (this._AddNewUser == false)
          {
            alert("User Details updated sucessfully!!");
            this._UserDetails = UserDataRespModel.Result;
            this.closebutton.nativeElement.click();
            this.ReloadDatatable();
          }
        else
          {
            alert("User Details added sucessfully!!");
            this._AddNewUser = false;
            this._UserDetails = UserDataRespModel.Result;
            this.closebutton.nativeElement.click();
            this.ReloadDatatable();              
          }   
      }
    }

// ================ Role Management ===========
  GetRolesByUserId(arg)
    {
      /**false previous user all roles */
      this._UserDropdownsModel.UserRoles.forEach(element => {
          element.Selected = false;
      });
      this._UserName = arg.UserName;
      this._UserIDForUdpate = arg.UserId;
      let url = this.urlService.GetRolesByUserIdAPI + arg.UserId;
      this.httpService.get(url,null).subscribe(response => {
        let usersRoleFromAPi : RoleDataModel[] = response;
         this._UserDropdownsModel.UserRoles.forEach(element => {
         let userRoleFound = usersRoleFromAPi.find(elm=>elm.RoleId == element.Value);
         if(userRoleFound)
         {
          element.Selected = true;
         }
         else
         {
          element.Selected = false;
         }
        });
       
        
        },
        error => {
          this.Utility.LogText(error);
        });
    }

  AddOrUpdateRoles()
    {
      let RoleDataModels :RoleDataModel[] = [];

      this._UserDropdownsModel.UserRoles.forEach(element => {
          if(element.Selected)
          {
            element.Selected = true;
            let newRole = new RoleDataModel();
            newRole.RoleId = element.Value;
            newRole.UserId = this._UserIDForUdpate;
            RoleDataModels.push(newRole);     
          }
       });

      let url = this.urlService.AddOrUpdateUsersRolesAPI;
      this.httpService.HttpPostRequest(url,RoleDataModels,this.RoleAddOrUpdateCallBack.bind(this),null);
    }


  RoleAddOrUpdateCallBack(dtas)
    {
      if(dtas!= null)
        {
          let ResponseData : RoleRespDataModel = dtas;
          if (ResponseData.StatusCode != 200) 
          {
            alert(ResponseData.Message);
          }
        else
          {
            alert("User Roles updated sucessfully!!");
            this.closebutton2.nativeElement.click();
            this.ReloadDatatable();
          }
        }
    }
    
  //=========================== change password ============
  /**change password */  
  ChangePassword(argData)
    {
      this._UserDataModel = argData;
      this._UserName = argData.UserName;     
    }

  UpdatePassword()
    {
      if(this._UserDataModel.Password != null)
        {
          let url = this.urlService.UpdatePasswordAPI;
          this.httpService.HttpPostRequest(url,this._UserDataModel,this.UpdatePasswordCallBack.bind(this),null);
        }
      else{
        alert("Please add new Password!!")
      }      
    }

  UpdatePasswordCallBack(dtas)
    {
      if(dtas!= null)
      { 
        let UserDataRespModel : PasswordUpdateRespModel  = dtas;
        if (UserDataRespModel.StatusCode != 200) 
          {
            alert(UserDataRespModel.Message);
          }
        else 
          {
            alert("Password updated sucessfully!!");
            this._UserDataModel = UserDataRespModel.Result;            
            this.ReloadDatatable();  
            this.closebutton3.nativeElement.click();
          }     
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

}
