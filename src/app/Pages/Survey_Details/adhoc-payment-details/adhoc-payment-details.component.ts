import { Component, OnInit } from '@angular/core';
import { AdhocPaymentDataModel} from 'src/app/Pages/Survey_Details/Survey_Details.model';
import { SearchCriteria, FilterControls} from 'src/app/Model/Filters.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-adhoc-payment-details',
  templateUrl: './adhoc-payment-details.component.html',
  styleUrls: ['./adhoc-payment-details.component.css']
})

export class AdhocPaymentDetailsComponent implements OnInit {
_AdhocPaymentDataModel : AdhocPaymentDataModel;
DisableInputField : boolean = true;

_FilterControls : FilterControls;
_SearchCriteria : SearchCriteria;

  constructor(
    public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility :UtilityService
  ) {
      this._AdhocPaymentDataModel = new AdhocPaymentDataModel();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls()
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;
      this._FilterControls.ShowVillage = true;
      this._FilterControls.ShowSurneyNos = true;
    }

  ngOnInit(): void {

  }

  /**1. Get Values From Filters component and assign into SearchCriteria
  *  2. C
  */
  GetValuesFromFilters(event)
    {
      this.Utility.LogText(event);
      this._SearchCriteria = event;
      this.DisableInputField = true;

    }

    /**
     * 
     */
  AddNewPaymentDetails()
    {
      this.DisableInputField = false;
    }
    /**
     * 
     */
  EditPaymentDetails()
    {
      this.DisableInputField = false;
    }

    SavePaymentDetails(){
      
    }
}
