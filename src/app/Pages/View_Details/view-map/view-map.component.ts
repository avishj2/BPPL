import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import * as olProj from 'ol/proj';
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

      const CS_PointSource = new VectorSource({        
          url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=388",//387,382
          //features: new GeoJSON().readFeatures(geojsonObject),
          format: new GeoJSON()
        });      
        var features = new Feature();
        CS_PointSource.addFeature(features); 
        /*** */     
        const CS_PointLayer = new VectorLayer({
          source: CS_PointSource,
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
        const Center_LineSource = new VectorSource({        
          url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=398",
          format: new GeoJSON()
        });
        var features = new Feature();
        Center_LineSource.addFeature(features); 
        const Center_LineLayer = new VectorLayer({
          source: Center_LineSource,
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
        const Village_Source = new VectorSource({        
          url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=401",
          format: new GeoJSON()
        });
        var features = new Feature();
        Village_Source.addFeature(features); 
        const Village_Layer = new VectorLayer({
          source: Village_Source,
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

        const Khasra_Source = new VectorSource({        
          url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=399",
          format: new GeoJSON()
        });
        var features = new Feature();
        Khasra_Source.addFeature(features); 
        const Khasra_Layer = new VectorLayer({
          source: Khasra_Source,
          style: KhasraPolygonstyle,
        });

        const ROU_Source = new VectorSource({        
          url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=400",
          format: new GeoJSON()
        });
        var features = new Feature();
        ROU_Source.addFeature(features); 
        const ROU_Layer = new VectorLayer({
          source: ROU_Source,
          style: KhasraPolygonstyle,
        });
      /**base map style and add layers */
      var washingtonLonLat = [72.2584733,25.9234036];//lat long panchpadra
      var washingtonWebMercator = new olProj.fromLonLat(washingtonLonLat);
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
          center: washingtonWebMercator,//[0, 0],
          zoom: 10, 
        }),
        controls: defaultControls().extend([new FullScreen()]),
      });
      //Creating a Map Click Event Listener
      map.on('singleclick', function (e) {
        var feature = map.forEachFeatureAtPixel(e.pixel,
          function(feature, layer) {  
            let data = feature.get('crossingId')
            if(data != null) 
              {
                self.ShowCrossingPopup(data)
              } 
            else{
              alert("CrossingId is not available!!")
            }
            //console.log(feature.get('crossingId'))//if  just need one field
            console.log(feature.getProperties()); //get all properties using
          });          
      })
    }


    ShowCrossingPopup(arg)
      { 
        /**NgbModalOptions  add some option in ngbmodel  */
        let ngbModalOptions: NgbModalOptions = {
          //backdrop : 'static',//outside click to not close model
          keyboard : false,
          size: 'xl'
          };
          let argdata = {
            CrossingID : arg,
            CrossingTypeName : "Openlayer map",
            ShowModel : true
          }
        /**used popup model common service function */
        this.modelServiceService.ShowPopUP(ChildViewCrossingComponent,ngbModalOptions,argdata,
          null,null);
      }
}


