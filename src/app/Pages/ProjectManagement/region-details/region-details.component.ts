import { Component, OnInit,ViewChild } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-region-details',
  templateUrl: './region-details.component.html',
  styleUrls: ['./region-details.component.css']
})

export class RegionDetailsComponent implements OnInit {
  _DisabledInputField : boolean = true;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) 
    { 

    }

  ngOnInit(): void 
    {

    }
  /**State */
  AddStateDetails()
  {
    this._DisabledInputField = false;
  }

  EditStateDetails()
  {
    this._DisabledInputField = false;
  }

  DeleteState()
    {
    }

    AddDistrictDetails()
    {}
    
    EditDistrictDetails()
    {}

    DeleteDistrict()
      {
        
      }

    AddTahsilDetails()
      {}
      
    EditTahsilDetails()
      {}
  
    DeleteTahsil()
        {
        }  
  ActiveTab(event)
    {
      
    }
}
