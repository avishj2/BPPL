import { AfterViewInit, Component,ElementRef, OnInit,Input,Output, ViewChild ,QueryList, ViewChildren} from '@angular/core';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { APIUtilityService } from 'src/app/services/APIUtility.service';
import { VillageSummaryReqModel,ViewVillageModel,VillageTableSum } from 'src/app/Model/Village.model';
import { Subject, from } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import printJS from 'print-js';

@Component({
  selector: 'app-view-village-details',
  templateUrl: './view-village-details.component.html',
  styleUrls: ['./view-village-details.component.css']
})
export class ViewVillageDetailsComponent implements OnInit {
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;
  _ViewVillageModel : ViewVillageModel;
  _VillageSummaryReqModel : VillageSummaryReqModel;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _ShowDetailsDiv : boolean = false;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  _VillageTableSum : VillageTableSum;

  constructor(public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,
    public APIUtilityService: APIUtilityService,)
    {
      this._SearchCriteria = new SearchCriteria();
      this._FilterControls = new FilterControls();
      this.SetFilterControls();
      this._VillageSummaryReqModel = new VillageSummaryReqModel();
      this._ViewVillageModel = new ViewVillageModel();
      this._VillageTableSum = new VillageTableSum();
    }

  /**hide/show filter menu based on the component requirement */
  SetFilterControls() 
    {
      this._FilterControls.ShowState = true;
      this._FilterControls.ShowDistrict = true;
      this._FilterControls.ShowTaluka = true;  
      this._FilterControls.ShowSearchBtn = true;
      this._FilterControls.ShowChainageFrom = true;
      this._FilterControls.ShowChainageTo = true;
    }

  ngOnInit(): void {
    this.dtOptions = 
    {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();
    }
  /**refresh/reload data table 
   * when data update/delete/add in the datatable  
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

  GetValuesFromFilters(event)
  {
    this._SearchCriteria = event;
    this._ShowDetailsDiv = true;
    this.GetVillageSummary();
  }

  ResetFilterValues(event)
  {
    
  }

  GetVillageSummary()
    {
      let url = this.urlService.GetVillageSummaryAPI;
      this._VillageSummaryReqModel.StartChainage = this._SearchCriteria.ChainageFrom;
      this._VillageSummaryReqModel.EndChainage = this._SearchCriteria.ChainageTo;
      this._VillageSummaryReqModel.TalukaId = this._SearchCriteria.TalukaId;
      this.httpService.HttpPostRequest(url,this._VillageSummaryReqModel,this.VillageSummaryCallBack.bind(this),null);
    }

    VillageSummaryCallBack(dtas)
      {
        if(dtas!= null)
        {
          this._ViewVillageModel = dtas;
          this._VillageTableSum = new VillageTableSum();
          this.TableColumnSum(this._ViewVillageModel.Villages)
        }
        this.ReloadDatatable();
      }

    printpdf()
      {
        if(this._ShowDetailsDiv == true)
          {
            const Table = this.pdfTable.nativeElement;
            printJS({printable: Table, type:'html', gridStyle: 
            'border: 1px solid black; margin-bottom: -1px;',targetStyles: ['*'],documentTitle: ""})
          }
        else{
          alert("Show the table first!!")
        }            
      }    

  TableColumnSum(data)
    {    
      for(let i=0;i<data.length;i++)
        {           
          this._VillageTableSum.LengthInKmsTotal += data[i].LengthInKms;
          this._VillageTableSum.TotalSurveyNosTotal += data[i].TotalSurveyNos;
          this._VillageTableSum.TotalPanchnamaOwnersTotal += data[i].TotalPanchnamaOwners;
          this._VillageTableSum.TotalCompensationPaidTotal += data[i].TotalCompensationPaid;
        }  
        this._VillageTableSum.LengthInKmsTotal = Number(this._VillageTableSum.LengthInKmsTotal.toFixed(2));
        this._VillageTableSum.TotalSurveyNosTotal = Number(this._VillageTableSum.TotalSurveyNosTotal.toFixed(2));
        this._VillageTableSum.TotalPanchnamaOwnersTotal = Number(this._VillageTableSum.TotalPanchnamaOwnersTotal.toFixed(2));
        this._VillageTableSum.TotalCompensationPaidTotal = Number(this._VillageTableSum.TotalCompensationPaidTotal.toFixed(2));        
    }  

}
