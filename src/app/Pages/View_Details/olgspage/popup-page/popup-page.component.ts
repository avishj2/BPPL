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
