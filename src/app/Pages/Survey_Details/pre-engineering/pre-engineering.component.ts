import { AfterViewInit, Component, OnDestroy, OnInit,Input,Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ShowUploadedDocModel ,CategoryDataModel,AddDocuments} from '../Survey_Details.model';
import { SearchCriteria, FilterControls } from 'src/app/Model/Filters.model';
import { UrlService } from 'src/app/services/url.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { CommonService} from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pre-engineering',
  templateUrl: './pre-engineering.component.html',
  styleUrls: ['./pre-engineering.component.css']
})

export class PreEngineeringComponent implements AfterViewInit, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  datatable: any;
  _FilterControls: FilterControls;
  _SearchCriteria: SearchCriteria;

  _ShowUploadedDocModel : ShowUploadedDocModel;
  _CategoryDataModel :CategoryDataModel;
  _CategoryID : any;
  _AddDocuments : AddDocuments;
  _IsGazette : boolean; //
  _StateValue : any;
  _TalukaName : string;
  tabs = [
    { tab: 'One', title: 'one' },
    { tab: 'Two', title: 'two' },
    { tab: 'Three', title: 'three' }
  ];
  constructor(
    public urlService: UrlService,
    private router: Router,
    public CommonService : CommonService,
    public httpService : HttpService,
    public Utility :UtilityService,)
    {
      this._ShowUploadedDocModel = new ShowUploadedDocModel();
      this._CategoryDataModel = new CategoryDataModel()
      this._AddDocuments = new AddDocuments();

      this._SearchCriteria = new SearchCriteria();
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
      this._FilterControls.ShowSurneyNos = false;
      this._FilterControls.ShowChainageFrom = false;
      this._FilterControls.ShowChainageTo = false;
    }

  ngOnInit(): void {
    this._CategoryDataModel.ReadFromString()
    this._AddDocuments.ReadJson();
    this.dtOptions = 
      {
        pagingType: 'full_numbers',
        pageLength: 10,//onpage load loaded 5 rows, datatable bydefault shows 10 rows
      };
  }

  ngAfterViewInit(): void 
  {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void 
  {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  GetValuesFromFilters(event) 
    {
      this.Utility.LogText2("Pre-eng",event);
    }

  /**After add chainage details refresh datatable  */
  rerenderDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  /**In Input Box add only numbric values */
  NumberOnly(event): boolean 
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  StateChange(event){
    if(this._StateValue =="1"){
      this._TalukaName = "Tahsil"
    }else{
      this._TalukaName = "Taluka"
    }
  }
  
  openDocument(){
    let url = "http://www.africau.edu/images/default/sample.pdf";
    window.open(url);
  }

  /**
  * if category is Award and mutation and attachment upload to the server   
  */
  UploadData(){
    this.rerenderDataTable()
  }
}
