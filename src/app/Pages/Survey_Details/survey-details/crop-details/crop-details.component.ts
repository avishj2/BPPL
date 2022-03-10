import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-crop-details',
  templateUrl: './crop-details.component.html',
  styleUrls: ['./crop-details.component.css']
})
export class CropDetailsComponent implements OnInit {
  _AddNewCropDetails : boolean;
  /**popup message variables */
  popoverTitle ="Delete Details";
  popoverMessage = "Are you sure you want to delete it ?";
  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) { }

  ngOnInit(): void {


  }
  AddNewCropDetails(){

  }
  EditCropDetails(){

  }
  DeleteCropDetails(){
    
  }

  SaveDetails(){

  }
}
