import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { RoleDataModel } from 'src/app/Model/User.model';
import { HttpService } from 'src/app/services/http.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
_CurrentUserName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public Utility: UtilityService,
    public APIUtilityService: APIUtilityService,
    private httpService: HttpService,
    public urlService: UrlService,
  ) { }

  async ngOnInit() 
    {
      //await this.Utility.MapLayerGeoJson();  
      document.getElementById("sidebar-toggle-icon").click();
      this.APIUtilityService.DisplayMenuItems = [];
      //this.Utility.LogText2("===",this.APIUtilityService._MenuJsonData);
      let userDetails = JSON.parse(localStorage.getItem('currentUser'));
      this.GetRolesByUserId(userDetails.Id)
      this._CurrentUserName = userDetails.FirstName +" " + userDetails.LastName;
    }

    GetRolesByUserId(arg)
      {
        let url = this.urlService.GetRolesByUserIdAPI + arg;
        this.httpService.get(url,null).subscribe(response => {
          let UsersRoleFromAPI : RoleDataModel[] = response;
          let Userroles = [];
          UsersRoleFromAPI.forEach(element => {
            Userroles.push(element.RoleId) 
          });
          
          let applicableMenuIds : any[] = [];

          Userroles.find(element => {
            if (element == 1245 ) //Admin
            {
               this.addMenuItemIfNotPresent(this.APIUtilityService.DisplayMenuItems,25,this.APIUtilityService._MenuJsonData);
               this.addMenuItemIfNotPresent(this.APIUtilityService.DisplayMenuItems,35,this.APIUtilityService._MenuJsonData);
               this.addMenuItemIfNotPresent(this.APIUtilityService.DisplayMenuItems,45,this.APIUtilityService._MenuJsonData);
            };
            if (element == 1246) //Viewer
              { 
               this.addMenuItemIfNotPresent(this.APIUtilityService.DisplayMenuItems,35,this.APIUtilityService._MenuJsonData);               
              };
            if (element == 1247) //Editor
              {
               this.addMenuItemIfNotPresent(this.APIUtilityService.DisplayMenuItems,25,this.APIUtilityService._MenuJsonData);
               this.addMenuItemIfNotPresent(this.APIUtilityService.DisplayMenuItems,35,this.APIUtilityService._MenuJsonData);
              };
          });

          this.Utility.LogText2("DisplayMenuItems=>",this.APIUtilityService.DisplayMenuItems)

          },
          error => {
            this.Utility.LogText(error);
          });
      }

  /**top right side clicks on logout button and logout website  */
  logoutBtn()
  {
    this.APIUtilityService.logout();
    this.router.navigate(['/login']); 
    //localStorage.removeItem('loginDetails'); //remove username and password from localstroage after click logout
  }
 
  addMenuItemIfNotPresent(applicableMenuIds : any[], menuId : number, menus : any[])
  {
     let isAvailable = applicableMenuIds.find(elm=>elm.Id == menuId);
     if(!isAvailable)
     {
       let menuObject = menus.find(elm=>elm.Id == menuId);
       applicableMenuIds.push(menuObject);
     }
  }

}
