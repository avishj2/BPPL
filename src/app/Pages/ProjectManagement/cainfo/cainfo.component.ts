import { Component, OnInit,ViewChild } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cainfo',
  templateUrl: './cainfo.component.html',
  styleUrls: ['./cainfo.component.css']
})
export class CAInfoComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  _PopupTitle : string;
  _DisabledInputField : boolean = true;
  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) { }

  ngOnInit(): void {


  }

  AddCADetails()
    {
      this._PopupTitle = "Add CA Deatils";
    }


  EditCADetails()
    {
      this._PopupTitle = "Edit CA Deatils"
    }

  DeleteCADetails()
    {

    }
  SaveCADetails()
    {
      
    }

}
