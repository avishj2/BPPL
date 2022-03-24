import { Component, OnInit } from '@angular/core';
import { AdhocPaymentDataModel} from 'src/app/Pages/Survey_Details/Survey_Details.model';
import { SearchCriteria, FilterControls} from 'src/app/Model/Filters.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { HttpService } from '../../../services/http.service';
import { CommonDropdownModel, CommonDocDataModel} from 'src/app/Model/Base.model';

@Component({
  selector: 'app-adhoc-payment-details',
  templateUrl: './adhoc-payment-details.component.html',
  styleUrls: ['./adhoc-payment-details.component.css']
})

export class AdhocPaymentDetailsComponent implements OnInit {
  _AdhocPaymentDataModel : AdhocPaymentDataModel;
  DisableInputField : boolean = true;
  _ShowPaymentDetailsDiv: boolean = false;
  _FilterControls : FilterControls;
  _SearchCriteria : SearchCriteria;
  _AddNewPaymentDetails : boolean = false;
/**popup message variables */
popoverTitle ="Delete Details";
popoverMessage = "Are you sure you want to delete it ?";

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
      this._FilterControls.ShowSearchBtn = true;
    }

  ngOnInit(): void {

  }

  /**1. Get Values From Filters component and assign into SearchCriteria
  *  2. 
  */
  GetValuesFromFilters(event)
    {
      this.Utility.LogText(event);
      this._SearchCriteria = event;
      if(this._SearchCriteria.SurveyID != null)
        {
          // this.GetCrossingDatabyId();
          this._ShowPaymentDetailsDiv = true;
          this._AddNewPaymentDetails= false;
          this.DisableInputField = true;
        }
      else{
        alert("Please select Survey Number");
      }
    }

    /**
     * 
     */
  AddNewPaymentDetails()
    {
      this.DisableInputField = false;
      this._AdhocPaymentDataModel = new AdhocPaymentDataModel();
      this._AddNewPaymentDetails = true;
      this._ShowPaymentDetailsDiv = false;
    }
    /**
     * 
     */
  EditPaymentDetails()
    {
      this.DisableInputField = false;
      this._AddNewPaymentDetails = false;
    }


  SavePaymentDetails()
    {
      
    }

  DeletePaymentDetails()
    {

    }
  onChangeDocument(event)
    {
      //this.Crossingfile = event.target.files[0];
    }

  FileUpload(isDoc : boolean)
    {

    }

  DownlaodDocument()
    {

    }

  DeleteDocument()
    {

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
