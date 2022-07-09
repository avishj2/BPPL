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
import {MapFeature} from './mapModel';
import { ConfigService } from 'src/app/services/config.service';
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
    public CommonService : CommonService,
    public configService : ConfigService
    )
    {
    }

 async ngOnInit() 
    {
      this.RegisterProj4s();
      this.showJsonLayer();
      let data = await this.Utility._ROULayer;
      console.log(data);
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

      const TPimage = new Circle({
        radius: 5,
        fill: new Fill({
          color: '#ffbf00',
        }),
        stroke: new Stroke({color: '#6b747c', width: 1}),
      });

      const chainageImage = new Circle({
        radius: 6,
        fill: new Fill({
          color: '#3e8d42',
        }),
        stroke: new Stroke({color: '#325a34', width: 1}),
      });

      const pointstyleFunction = function (feature) 
        {  
          return new Style({
            image: image,
            text : new Text({
              font: '15px "Open Sans", "Arial Unicode MS", "sans-serif"',
              fill: new Fill({color: '#000'}),
              stroke: new Stroke({color: '#000', width: 1}),
              text: feature.get('TEXTSTRING') + ","+feature.get('Crossing_N'),
              textAlign : 'left',  
              padding : [0,2,4,5]
            }),
          })
        }; 
        /***CS_PointLayer */     
        const CS_PointLayer = new VectorLayer({
          source: new VectorSource({        
            //url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadProjectReport?documentId=1457",//387,
            features: new GeoJSON().readFeatures(this.configService.getCSPoint()),
            format: new GeoJSON()
          })  ,
          style: pointstyleFunction,
        });
        CS_PointLayer.set('title','Crossing');


        const TPpointstyleFunction = function (feature) 
        {  
          return new Style({
            image: TPimage,
            text : new Text({
              font: '13px "Open Sans", "Arial Unicode MS", "sans-serif"',
              fill: new Fill({color: '#022cfb'}),
              stroke: new Stroke({color: '#022cfb', width: 1}),
              text: feature.get('Name'),
              textAlign : 'bottom',  
              padding : [0,2,4,5]
            }),
          })
        }; 
        /***TP_PointLayer */     
        const TP_PointLayer = new VectorLayer({
          source: new VectorSource({        
            features: new GeoJSON().readFeatures(this.configService.getTPPoint()),
            format: new GeoJSON()
          })  ,
          style: TPpointstyleFunction,
        });
        TP_PointLayer.set('title','TP');


        const ChainageStyleFunction = function (feature) 
        {  
          
          let zoom = map.getView().getZoom();
          var text = zoom >= 14 ? feature.get('ChainageName') : '';

          return new Style({
            image: chainageImage,            
            text : new Text({
              font: '10px "Open Sans", "Arial Unicode MS", "sans-serif"',
              fill: new Fill({color: '#022F1F'}),
              stroke: new Stroke({color: '#022F1F', width: 1}),
              text: text,
              textAlign : 'bottom',  
              padding : [0,2,4,5]
            }),
          })
        }; 

        /***Chainage_Layer */     
        const Chainage_Layer = new VectorLayer({
          source: new VectorSource({        
            features: new GeoJSON().readFeatures(this.configService.getChainage()),
            format: new GeoJSON()
          })  ,
          style: ChainageStyleFunction,
        });
        Chainage_Layer.set('title','Chainage');

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
          // name : 'Center_Line',
          source: new VectorSource({        
            //url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadProjectReport?documentId=1456",
            features: new GeoJSON().readFeatures(this.configService.getCenterLine()),
            format: new GeoJSON()
          }),
          style: LinestyleFunction,
        });
        Center_LineLayer.set('title','Center');

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
              text: feature.get('Village'),
              textAlign : 'left',  
              padding : [0,2,4,5]
            }),
          })
        }; 

        const Village_Layer = new VectorLayer({
          source:  new VectorSource({        
          //url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadProjectReport?documentId=1460",
          features: new GeoJSON().readFeatures(this.configService.getVIllageBoundry()),
          format: new GeoJSON(),
          
        }),
          style: VillagePolygonstyle,
        });
        Village_Layer.set('title','Village');

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
              padding : [0,0,0,0]
            }),
          })
        }; 
        
        const Khasra_Layer = new VectorLayer({
          source: new VectorSource({        
            //url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadProjectReport?documentId=1458",
            features: new GeoJSON().readFeatures(this.configService.getKhasrBoundry()),
            format: new GeoJSON()
          }),
          style: KhasraPolygonstyle,
        });
        Khasra_Layer.set('title','Khasra');

        const ROU_Layer = new VectorLayer({
          source:  new VectorSource({        
            //url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadProjectReport?documentId=1459",
            features: new GeoJSON().readFeatures(this.configService.getROW()),
            format: new GeoJSON()
          }),
          style: KhasraPolygonstyle,
        });

        ROU_Layer.set('title','ROU');
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
          CS_PointLayer,
          TP_PointLayer,
          Chainage_Layer
        ],
        target: 'map',
        view: new View({
          projection: 'EPSG:4326',
          center: washingtonLonLat,//washingtonWebMercator,//[0, 0],
          zoom: 10,
        }),
        controls: defaultControls({ attribution: false }).extend([new FullScreen()]),
      });

      //Creating a Map Click Event Listener
      map.on('singleclick', function (e) {
        //console.log(e.coordinate)
        //alert("Lat, Long : " + e.coordinate[1] + ", " + e.coordinate[0])
        let crossingFeatures : MapFeature[] = [];
        let khasraFeatures : MapFeature[] = [];
        let features : MapFeature[] = [];
        var feature = map.forEachFeatureAtPixel(e.pixel,        
          function(feature, layer) { 
            let layerName = layer.get('title');
            if(layerName == "Crossing")
            {
              if(!khasraFeatures.find(elm=>elm.CrossingName== feature.get('TEXTSTRING')))
              {
                let mf :MapFeature = {CrossingName: feature.get('TEXTSTRING'),SelectedFeature: feature , SurveyNo:"", Permission :feature.get('Permission')};
                crossingFeatures.push(mf);   
                features.push(mf);
              }   
            }  
            if(layerName == "Khasra")
            {              
              if(!khasraFeatures.find(elm=>elm.SurveyNo==feature.get('Survey_No')))
              {
                let mf :MapFeature = { SurveyNo: feature.get('Survey_No'),SelectedFeature : feature , CrossingName:"",Permission :""};
                khasraFeatures.push(mf);      
                features.push(mf);
              }
            }              
          });  
        if(features.length > 2)
        {
           alert("Multiple features are selected please zoom in and select precise !")
        }
        else
        {
          if(crossingFeatures.length > 0)
          {
            let data = crossingFeatures[0].CrossingName;
            if(crossingFeatures[0].Permission== "NO")
              {
                alert("We don't need permission for this Crossing !!")
              }
            else{
              self.ShowCrossingPopup(data);
            }
            return;
          }
          if(khasraFeatures.length > 0)
          {
            let data =khasraFeatures[0].SelectedFeature.getProperties();
            self.ShowSurveyPopup(data);  
            return;
          }
        }     
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


