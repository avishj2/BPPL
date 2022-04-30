import { Component, OnInit } from '@angular/core';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import {ModelServiceService} from 'src/app/services/model-service.service';
import { NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ChildViewCrossingComponent } from 'src/app/Pages/View_Details/view-crossing-details/child-view-crossing/child-view-crossing.component'


@Component({
  selector: 'app-test-popup',
  templateUrl: './test-popup.component.html',
  styleUrls: ['./test-popup.component.css']
})

export class TestPopupComponent implements OnInit {
  _FilterControls :FilterControls;
  _SearchCriteria : SearchCriteria;

  constructor(public modelServiceService : ModelServiceService,) 
    { 
      this._FilterControls = new FilterControls();
      this._SearchCriteria = new SearchCriteria();
      this.SetFilterControls();
    }

      /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = false;
      this._FilterControls.ShowDistrict = false;
      this._FilterControls.ShowTaluka = false;
      this._FilterControls.ShowChainageFrom = true;
      this._FilterControls.ShowChainageTo = true;
      this._FilterControls.ShowVillage = false;
      this._FilterControls.ShowCrossingTypes = true;
      this._FilterControls.ShowCrossingNumber = true;
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void 
  {

  }

  GetValuesFromFilters(event)
    {
      this._SearchCriteria = event;
    }

    ShowPopup()
      {        
        /**NgbModalOptions  add some option in ngbmodel  */
        let ngbModalOptions: NgbModalOptions = {
        //backdrop : 'static',//outside click to not close model
        keyboard : false,
        size: 'xl'
      };
      let argDto = this._SearchCriteria;
      /**used popup model common service function */
      this.modelServiceService.ShowPopUP(ChildViewCrossingComponent,ngbModalOptions,argDto,
          null,null);
    }
}
