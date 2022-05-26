import { Component, OnInit,ViewChild } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  _DisabledInputField : boolean = true;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,) { }


  ngOnInit(): void 
    {
      
    }


  EditDetails()
    {

    }

  DeleteProjectDetails()
    {

    }

  SaveProjectDetails()
    {

    }
}
