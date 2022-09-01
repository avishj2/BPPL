import { Component, OnInit,ViewChild,Output,EventEmitter } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import {toLonLat,transform} from 'ol/proj';
import * as  olProj4 from 'ol/proj/proj4';
import * as  Proj4 from 'proj4/dist/proj4';
import {Fill, Stroke, Style,Circle, Text} from 'ol/style';
import Point from 'ol/geom/Point';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import {ModelServiceService} from 'src/app/services/model-service.service';
import { NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonService} from 'src/app/services/common.service';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ChildViewCrossingComponent } from 'src/app/Pages/View_Details/view-crossing-details/child-view-crossing/child-view-crossing.component'
import { ViewSurveyTabsComponent } from 'src/app/Pages/View_Details/view-survey-tabs/view-survey-tabs.component';
import {DisasterManagementDetails, GeometryType, MapFeature, MapLayer, PointStyleModel as StyleModel} from '../view-map/mapModel';
import { ConfigService } from 'src/app/services/config.service';
import { StyleFunction } from 'ol/style/Style';
import {toStringHDMS} from 'ol/coordinate';
import Overlay from 'ol/Overlay';
import {getDistance,getLength,getArea} from 'ol/sphere';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OpenLayerDatamodel } from 'src/app/Model/Base.model';
import TileWMS from 'ol/source/TileWMS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import { getTopLeft } from 'ol/extent';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { HttpService } from 'src/app/services/http.service';
import {LayerInfo} from './olgspage.model';

@Component({
  selector: 'app-olgspage',
  templateUrl: './olgspage.component.html',
  styleUrls: ['./olgspage.component.css']
})
export class OLGSPageComponent implements OnInit {
  map: any;
  _ShowDisasterPoints : boolean = false;
  _OpenShowLayersPopup : boolean = false;
  @ViewChild('closebutton') closebutton;
  _OpenLayerData : OpenLayerDatamodel;
  _LayerCol : OpenLayerDatamodel[] = [];
  _CheckAllLayer : boolean = true;
  _CheckAllLayerValue :boolean = true;
  _LayersInfo : LayerInfo[];

  constructor(public urlService: UrlService,
    public modelServiceService : ModelServiceService,
    public Utility: UtilityService,
    public CommonService : CommonService,
    public configService : ConfigService,
    private httpService: HttpService,
    )
    {
     
      this._OpenLayerData = new OpenLayerDatamodel();
      this._LayersInfo = []
    }

 async ngOnInit() 
    {
      this.RegisterProj4s(); 
      this.GetAllLayersAPI();
    }  


  GetAllLayersAPI()
    {
      let url = this.urlService.GetAllLayersAPI;
      this.httpService.HttpGetRequest(url,this.GetAllLayersCallBack.bind(this),null); 
    }

  GetAllLayersCallBack(dtas){
    if (dtas != null)
      {
        this._LayersInfo = dtas;
        console.log("dtas",dtas);
        this.showJsonLayer(); 
      }
  }

  showJsonLayer()
    {
      var self = this;
      /** Overlay */
      // OverLay:
      const container = document.getElementById('popup');
      const content = document.getElementById('popup-content');
      const closer = document.getElementById('popup-closer');

      /**
       * Create an overlay to anchor the popup to the map.
       */
      const overlay = new Overlay({
        element: container,
        autoPan: {
          animation: {
            duration: 250,
          },
        },
      });

      /**
       * Add a click handler to hide the popup.
       * @return {boolean} Don't follow the href.
       */
      closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };

      let tileLayer = new TileLayer({
        source: new OSM(),
      })

      const l_projection = getProjection('EPSG:4326');
      const l_projectionExtent = l_projection.getExtent();
      let WMTSlayer =  new TileLayer({
        opacity: 0.7,
        source: new WMTS({
          url: 'http://localhost:8080/geoserver/gwc/service/wmts',
          layer: 'NKBPL:CHAINAGE',
          matrixSet: 'GoogleMapsCompatible',
          format: 'image/png',
          style: 'default',
          projection: l_projection,
          wrapX: true,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(l_projectionExtent), 
            resolutions: new Array(19),
            matrixIds: new Array(19),
          }),
        })
        })

      /**base map style and add layers */
      var washingtonLonLat = [75.7873,26.9124];//lat long jaipur
      var washingtonWebMercator = transform(washingtonLonLat,'EPSG:32643', 'EPSG:4326');
      const map = new Map({
        layers:
        [
           tileLayer,
           //wmsLayer,
          // WMTSlayer          
        ],
        target: 'map',
        overlays: [overlay],
        view: new View({
          projection: 'EPSG:4326',
          center: washingtonLonLat,//washingtonWebMercator,//[0, 0],
          zoom: 10,
        }),
        controls: defaultControls({ attribution: false }).extend([new FullScreen()]),
      });
      //map.addLayer(wmsLayer);

      let queryLayers = ''

      for (let index = 0; index < self._LayersInfo.length; index++) {
        const element = self._LayersInfo[index];
        let l_wmsLayer = new TileLayer({
          source: new TileWMS({
            url:  element.IPaddress + element.Baseurl,
            params: {'LAYERS': element.LayerName, 'TILED': true},//element.LayerName
              serverType: 'geoserver',
              transition: 0
            }),
        })
        map.addLayer(l_wmsLayer);
        let l_Layer = new OpenLayerDatamodel();
        l_Layer = l_Layer.LayerInfo(element.LayerDisplayName,l_wmsLayer,true,true); 
        self._LayerCol.push(l_Layer) 
        queryLayers += `${element.LayerName}${(index<self._LayersInfo.length-1)?',' :''}`       
      }

      let all_Source : any = new TileWMS({
        url:  self._LayersInfo[0].IPaddress + self._LayersInfo[0].Baseurl,
        params: {'LAYERS': queryLayers, 'TILED': true},//element.LayerName
          serverType: 'geoserver',
          transition: 0
        });
      //map.addLayer(localpbj);
     
      map.on('singleclick', function (evt) {
        
        var viewResolution = (map.getView().getResolution());
        let viewProj =map.getView().getProjection();

        var url = all_Source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, viewProj,
          { 'INFO_FORMAT': 'application/json'}); //text/html

        if (url) {
            var parser = new GeoJSON();
            var lookup = {};
            $.ajax({
                url: url,
                dataType: 'json',
                method: 'GET',
                success: function (response) {
                    var result = parser.readFeatures(response);
                    if (result.length > 0)
                    {
                      // for (var i = 0;i<=result.length; i++)
                      //   {
                          let l_featureValues = response.features[0].properties
                          var coord = evt.coordinate;
                          document.getElementById("popup-content").innerHTML = "";
                          let keyValues = Object.keys(l_featureValues);
                          for (var j = 0;j< keyValues.length; j++)
                          {                          
                            document.getElementById("popup-content").innerHTML +=
                            '<strong>'+ keyValues[j]+ ':</strong>' + l_featureValues[Object.keys(l_featureValues)[j]] + '<br> '+"";
                          }   
                          overlay.setPosition(coord);
                        //}
                    }
                },
                error: function (jqXHR, exception) {
                  var msg = '';
                  if (jqXHR.status === 0) {
                      msg = 'Not connect.\n Verify Network.';
                  } else if (jqXHR.status == 404) {
                      msg = 'Requested page not found. [404]';
                  } else if (jqXHR.status == 500) {
                      msg = 'Internal Server Error [500].';
                  } else if (exception === 'parsererror') {
                      msg = 'Requested JSON parse failed.';
                  } else if (exception === 'timeout') {
                      msg = 'Time out error.';
                  } else if (exception === 'abort') {
                      msg = 'Ajax request aborted.';
                  } else {
                      msg = 'Uncaught Error.\n' + jqXHR.responseText;
                  }
                  $('#post').html(msg);
              }
            });
        }  

      }) 
    }

    OpenPopupModel()
      {
        this. _OpenShowLayersPopup = true;        
      }

    SubmitShowLayers()
      {
        this._OpenShowLayersPopup = false;        
        this._LayerCol.forEach(element => {
          element.PreviousVisiblity = element.Visible;
          element.LayerObj.setVisible(element.Visible);         
        });        
        this._CheckAllLayerValue = this._CheckAllLayer  
        this.closebutton.nativeElement.click();          
      }

    ClosePopupModel()
      {        
        this. _OpenShowLayersPopup = false;
        this._LayerCol.forEach(element => {
          element.Visible = element.PreviousVisiblity;
        });       
        this._CheckAllLayer = this._CheckAllLayerValue               
      }

    SelectallCheckBox()
      {
        this._LayerCol.forEach(element => {
          if(this._CheckAllLayer)
            {
              element.Visible = false;          
            }
          else
            {
              element.Visible = true;
            }
        });        
      }
  RegisterProj4s()
    {
      let p4 = olProj4;   
      Proj4.defs("EPSG:32643", "+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs");
      Proj4.defs("EPSG:32644","+proj=utm +zone=44 +datum=WGS84 +units=m +no_defs");
      p4.register(Proj4);
    }    

    /**open crossing deatils popup model */
    ShowCrossingPopup(arg)
      { 
        /**NgbModalOptions  add some option in ngbmodel  */
        let ngbModalOptions: NgbModalOptions = {
          //backdrop : 'static',//outside click to not close model
          keyboard : false,
          size: 'xl'
          };
          let argdata = {
            CrossingName : arg,
            ShowModel : true
          }
        /**used popup model common service function */
        this.modelServiceService.ShowPopUP(ChildViewCrossingComponent,ngbModalOptions,argdata,
          null,null);
      }

  ShowSurveyPopup(arg)
    {
      /**NgbModalOptions  add some option in ngbmodel  */
      let ngbModalOptions: NgbModalOptions = {
        keyboard : false,
        size: 'xl'
        };
        let argdata = {
          ShowModel: true,
          // VillageName: arg.Village_N,
          VillageName : arg.Village,
          TehsilName :arg.Tehsil_N,           
          SurveyName :arg.DBSurvey_N,//Survey_No
        }
      /**used popup model common service function */
      this.modelServiceService.ShowPopUP(ViewSurveyTabsComponent,ngbModalOptions,argdata,
        null,null);
    }
}


