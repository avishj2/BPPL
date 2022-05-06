import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import * as olProj from 'ol/proj';
import * as  olProj4 from 'ol/proj/proj4';
import * as  Proj4 from 'proj4/dist/proj4';
import {Fill, Stroke, Style,Circle, Text} from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import 'ol/ol.css';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import {fromLonLat} from 'ol/proj';
import { Pointer as PointerInteraction,defaults as defaultInteractions,} from 'ol/interaction';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';
import {ModelServiceService} from 'src/app/services/model-service.service';
import { NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonService} from 'src/app/services/common.service';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ChildViewCrossingComponent } from 'src/app/Pages/View_Details/view-crossing-details/child-view-crossing/child-view-crossing.component'
import { ViewSurveyTabsComponent } from 'src/app/Pages/View_Details/view-survey-tabs/view-survey-tabs.component';
@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {
  map: any;
  
  constructor(public urlService: UrlService,
    public modelServiceService : ModelServiceService,
    public Utility: UtilityService,
    public CommonService : CommonService
    ){
      // super({
      //   handleDownEvent: handleDownEvent,
      //   handleDragEvent: handleDragEvent,
      //   handleMoveEvent: handleMoveEvent,
      //   handleUpEvent: handleUpEvent,
      // });
      // this.cursor_ = 'pointer';
      // this.feature_ = null;
      // this.previousCursor_ = undefined;
     }

  ngOnInit(): void 
    {
      this.RegisterProj4s();
      this.showJsonLayer();        
    }

  showJsonLayer()
    {
      var self = this;
      /**point layer */
      const image = new Circle({
        radius: 5,
        fill: new Fill({
          color: '#f34141ed',
        }),
        stroke: new Stroke({color: 'red', width: 1}),
      });

      const pointstyleFunction = function (feature) 
        {  
          return new Style({
            image: image,
            text : new Text({
              font: '15px "Open Sans", "Arial Unicode MS", "sans-serif"',
              fill: new Fill({color: '#000'}),
              stroke: new Stroke({color: '#000', width: 1}),
              text: feature.get('TEXTSTRING'),
              textAlign : 'left',  
              padding : [0,2,4,5]
            }),
          })
        }; 
        /***CS_PointLayer */     
        const CS_PointLayer = new VectorLayer({
          source: new VectorSource({        
            url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=388",//387,
            //features: new GeoJSON().readFeatures(geojsonObject),
            format: new GeoJSON()
          })  ,
          style: pointstyleFunction,
        });
  

      /**line feature styling */
      const LinestyleFunction = function (feature) 
        {  
          return new Style({
            stroke: new Stroke({
              color: 'green',
              width: 1,
            }),
            text : new Text({
              font: '15px "Open Sans", "Arial Unicode MS", "sans-serif"',
              fill: new Fill({color: '#000'}),
              stroke: new Stroke({color: '#000', width: 1}),
              //text: feature.get('Shape'),
              textAlign : 'left',  
              padding : [0,2,4,5]
            }),
          })
        }; 

        const Center_LineLayer = new VectorLayer({
          source: new VectorSource({        
            url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=398",
            format: new GeoJSON()
          }),
          style: LinestyleFunction,
        });


      /**polygon feature styling */
      const VillagePolygonstyle = function (feature) 
        {  
          return new Style({
            stroke: new Stroke({
              color: '#5990cb',
              width: 1,
            }),
            fill: new Fill({
              color: '#dfdf326e',
            }),
            text : new Text({
              font: '17px "Open Sans", "Arial Unicode MS", "sans-serif"',
              fill: new Fill({color: '#f04141'}),
              stroke: new Stroke({color: '#f04141', width: 1}),
              text: feature.get('Village_N'),
              textAlign : 'left',  
              padding : [0,2,4,5]
            }),
          })
        }; 

        const Village_Layer = new VectorLayer({
          source:  new VectorSource({        
          url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=401",
          format: new GeoJSON()
        }),
          style: VillagePolygonstyle,
        });


        const KhasraPolygonstyle = function (feature) 
        {  
          return new Style({
            stroke: new Stroke({
              color: '#d30d39e8',
              width: 1,
            }),
            fill: new Fill({
              color: '#0052eb4a',
            }),
            text : new Text({
              font: '17px "Open Sans", "Arial Unicode MS", "sans-serif"',
              fill: new Fill({color: '#0052eb'}),
              stroke: new Stroke({color: '#0052eb', width: 1}),
              text: feature.get('Survey_No'),
              textAlign : 'left',  
              padding : [0,2,4,5]
            }),
          })
        }; 
        
        const Khasra_Layer = new VectorLayer({
          source: new VectorSource({        
            url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=419",
            format: new GeoJSON()
          }),
          style: KhasraPolygonstyle,
        });
        
        const ROU_Layer = new VectorLayer({
          source:  new VectorSource({        
            url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=400",
            format: new GeoJSON()
          }),
          style: KhasraPolygonstyle,
        });

      /**base map style and add layers */
      var washingtonLonLat = [72.018320,24.850438];//lat long panchpadra
      var washingtonWebMercator = olProj.transform(washingtonLonLat,'EPSG:32643', 'EPSG:4326');
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          Village_Layer,
          Khasra_Layer,
          ROU_Layer,
          Center_LineLayer,
          CS_PointLayer
        ],
        target: 'map',
        view: new View({
          projection: 'EPSG:4326',
          center: washingtonLonLat,//washingtonWebMercator,//[0, 0],
          zoom: 7,
        }),
        controls: defaultControls().extend([new FullScreen()]),
      });
      
      //Creating a Map Click Event Listener
      map.on('singleclick', function (e) {
        var feature = map.forEachFeatureAtPixel(e.pixel,
          function(feature, layer) {  
            if(feature.get('TEXTSTRING'))
              {
                let data = feature.get('TEXTSTRING');
                self.ShowCrossingPopup(data);
              }
            // else if(feature.get('Survey_No'))
            //   {
            //     let data = feature.getProperties();
            //     self.ShowSurveyPopup(data);                
            //   }  
            //console.log(feature.getProperties()); //get all properties using
          });          
      })
      
    }


    RegisterProj4s()
    {
      let p4 = olProj4;
      //proj4.defs("EPSG:32644", "+proj=utm +zone=44 +datum=WGS84 +units=m +no_defs"); // projection definitions needs to be added on proj4 library
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
            TehsilName :arg.Tehsil_N,
            VillageName : arg.Village_N,
            SurveyName :arg.Survey_No,
            ShowModel : true
          }
        /**used popup model common service function */
        this.modelServiceService.ShowPopUP(ViewSurveyTabsComponent,ngbModalOptions,argdata,
          null,null);
      }
  
}


