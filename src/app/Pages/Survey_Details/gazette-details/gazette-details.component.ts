import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { GazetteFormDataModel,AddDocuments ,DocumentDataModel } from '../Survey_Details.model';
import { saveAs } from 'file-saver';
import { DownloadService } from '../../../services/download.service';

@Component({
  selector: 'app-gazette-details',
  templateUrl: './gazette-details.component.html',
  styleUrls: ['./gazette-details.component.css']
})
export class GazetteDetailsComponent implements OnInit {
  _GazetteFormDataModel : GazetteFormDataModel;
  /**enable/disable input fields variables*/
  _DisabledInputField: boolean = true;
  _AddDocuments :AddDocuments;
  GazetteName 
  _InputFileLabel;
  _DocumentDataModel : DocumentDataModel[];

  constructor(public urlService: UrlService,
    private router: Router,
    private httpService: HttpService,
    public Utility: UtilityService,
    private downloadService: DownloadService,
    ) 
    { 
      this._GazetteFormDataModel = new GazetteFormDataModel();
      this._AddDocuments = new AddDocuments();
      this._DocumentDataModel = [];
    }

  ngOnInit(): void {
    this._AddDocuments.ReadJson();
    this._DisabledInputField = false;//test
  }

  /**
   * 
   */
  SearchGazetteDetails()
    {
      this._DisabledInputField = true;
    }

  /**
   * 
   */
  AddNewGazetteDetails()
    {
      this._DisabledInputField = false;
    }

  /**
   * 
   */
  EditGazetteDetails()
    {
      this._DisabledInputField = false;
    }
  /**
  * Document upload 
  */
  FileUpload(argEvent: any) 
    {
      const target: DataTransfer = <DataTransfer>(argEvent.target);
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[0]);
      const file = argEvent.target.files[0];
      this._InputFileLabel = file.name; //saved file name with extn.
      let FileName = file.name.split('.').slice(0, -1).join('.');
      let Extension = file.name.split(".").pop();//file extension save 
      this._DocumentDataModel.push({'DocumentType':Extension ,'FileName': FileName})
      console.log(this._DocumentDataModel);
    }

  DownlaodDocument()
    {
      this.downloadService.SavePdfFile("http://www.africau.edu/images/default/sample.pdf","downloadfile");
      //this.downloadService.SavePdfFile("C:/Users/admin/Downloads/CL-10-Model", "downloadfile");
      
    }

  EditDetails(arg)
    {

    }

  DeleteDocument(arg)
    {
      this._DocumentDataModel.splice(arg, 1);
    }

  submit()
    {
      this._DisabledInputField = true;
      console.log("GazetteFields",this._GazetteFormDataModel.GazetteFields)
    }

}
