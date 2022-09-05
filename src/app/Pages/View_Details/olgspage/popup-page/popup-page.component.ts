import { Component, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'src/app/services/utility.service';
import {AllTabsData, LayerData, LayerTabData} from './popup-page.model';
@Component({
  selector: 'app-popup-page',
  templateUrl: './popup-page.component.html',
  styleUrls: ['./popup-page.component.css']
})
export class PopupPageComponent implements OnInit {
  public tabs;
  @Input() public fromParent;
  @ViewChild('tabset')
  tabset: any;
  _popUpData : AllTabsData;
  _Htmldata = '<html xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:msxsl="urn:schemas-microsoft-com:xslt">\r\r\n<head>\r\r\n<META http-equiv="Content-Type" content="text/html">\r\r\n<meta http-equiv="content-type" content="text/html; charset=UTF-8">\r\r\n</head>\r\r\n<body style="margin:0px 0px 0px 0px;overflow:auto;background:#FFFFFF;">\r\r\n<table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-collapse:collapse;padding:3px 3px 3px 3px">\r\r\n<tr style="text-align:center;font-weight:bold;background:#9CBCE2">\r\r\n<td>Public Semi Public</td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>\r\r\n<table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-spacing:0px; padding:3px 3px 3px 3px">\r\r\n<tr>\r\r\n<td>FID</td>\r\r\n<td>425</td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>Use</td>\r\r\n<td>Public Semi Public</td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>Area</td>\r\r\n<td>18.4958</td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>Remark</td>\r\r\n<td></td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>Label</td>\r\r\n<td></td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>Type</td>\r\r\n<td>Public Semi Public</td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>Level</td>\r\r\n<td>Public Semi Public</td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>Shape_Leng</td>\r\r\n<td>1908.193661</td>\r\r\n</tr>\r\r\n</table>\r\r\n</td>\r\r\n</tr>\r\r\n</table>\r\r\n</body>\r\r\n</html><br/><html xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:msxsl="urn:schemas-microsoft-com:xslt">\r\r\n<head>\r\r\n<META http-equiv="Content-Type" content="text/html">\r\r\n<meta http-equiv="content-type" content="text/html; charset=UTF-8">\r\r\n</head>\r\r\n<body style="margin:0px 0px 0px 0px;overflow:auto;background:#FFFFFF;">\r\r\n<table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-collapse:collapse;padding:3px 3px 3px 3px">\r\r\n<tr style="text-align:center;font-weight:bold;background:#9CBCE2">\r\r\n<td> </td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>\r\r\n<table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-spacing:0px; padding:3px 3px 3px 3px">\r\r\n<tr>\r\r\n<td>FID</td>\r\r\n<td>0</td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>OBJECTID_1</td>\r\r\n<td>0</td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>Id</td>\r\r\n<td>0</td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>Zone_</td>\r\r\n<td></td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>Ward_no</td>\r\r\n<td>0</td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>Remarks</td>\r\r\n<td></td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>Bou_North</td>\r\r\n<td></td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>Bou_South</td>\r\r\n<td></td>\r\r\n</tr>\r\r\n<tr>\r\r\n<td>Bou_East</td>\r\r\n<td></td>\r\r\n</tr>\r\r\n<tr bgcolor="#D4E4F3">\r\r\n<td>Bou_West</td>\r\r\n<td></td>\r\r\n</tr>\r\r\n</table>\r\r\n</td>\r\r\n</tr>\r\r\n</table>\r\r\n</body>\r\r\n</html>'
  _ShowShapefileData : boolean = true;

  constructor(
    public Utility :UtilityService,
    public activeModal: NgbActiveModal
    ) { this._popUpData = new AllTabsData();  }

  ngOnInit(): void 
    {
      if(this.fromParent)
        {
          this.Utility.LogText2("Survey model", this.fromParent);
          this.tabs = this.fromParent;
          this.popUpDataSet();
          let data = document.getElementById("KMLContent");
          data.innerHTML = this._Htmldata
        }
    }
  
 
    popUpDataSet()
    {
      
      this.tabs.forEach(element => {
        element.properties = [];
        let keyValues = Object.keys(element.values_);
        let layerData = new LayerTabData();
          for (var j = 0;j< keyValues.length; j++)
          {  
            if(keyValues[j] != "geometry")
              {
                let propertyData = new LayerData();
                propertyData.key = keyValues[j];
                propertyData.value = element.values_[propertyData.key]
                layerData.Data.push(propertyData) ;
                element.properties.push(propertyData) ;
                // popup = document.getElementById("popupData").innerHTML +=
                // '<strong>'+ keyValues[j]+ ':</strong>' + element[Object.keys(element)[j]] + '<br> '+"";
              }                        
          }
          this._popUpData.AllData.push(layerData);
      });
       
    }

  /**after click on top right side of model it excute */
  closeModal(sendData) 
    {
      this.activeModal.close(sendData);
    }
}
