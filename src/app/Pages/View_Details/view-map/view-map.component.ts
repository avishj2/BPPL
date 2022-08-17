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
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
//import 'ol/ol.css';
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
import {DisasterManagementDetails, GeometryType, MapFeature, MapLayer, PointStyleModel as StyleModel} from './mapModel';
import { ConfigService } from 'src/app/services/config.service';
import ImageStyle from 'ol/style/Image';
import { StyleFunction } from 'ol/style/Style';
import {toStringHDMS} from 'ol/coordinate';
import Overlay from 'ol/Overlay';
import  Projection from 'ol/proj/Projection';
import {getDistance,getLength,getArea} from 'ol/sphere';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import RasterSource from 'ol/source/Raster';
import { OpenLayerDatamodel } from 'src/app/Model/Base.model';
import { ThisReceiver } from '@angular/compiler';
import { transformGeometryWithOptions } from 'ol/format/Feature';


@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {
  map: any;
  _ShowDisasterPoints : boolean = false;
  _OpenShowLayersPopup : boolean = false;
  _DisasterManagementLyr : VectorLayer;
  /**data table properties  */
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  /**REFERSH DATATABLE  */
  IsDtInitialized: boolean = false;
  _DisasterManagementDetails:DisasterManagementDetails[] = [];
  MapLayers: MapLayer[] = [];
  @ViewChild('closebutton') closebutton;
  _OpenLayerData : OpenLayerDatamodel;
  _LayerCol = [];
  _LayerArray1 = [];
  _LayerArray2 =[];
  _CheckAllLayer : boolean = true;
  _CheckAllLayerValue :boolean = true;

  constructor(public urlService: UrlService,
    public modelServiceService : ModelServiceService,
    public Utility: UtilityService,
    public CommonService : CommonService,
    public configService : ConfigService
    )
    {
     
      this._OpenLayerData = new OpenLayerDatamodel();
    }

 async ngOnInit() 
    {
      this.dtOptions = 
        {
          pagingType: 'full_numbers',
          pageLength: 10,
          destroy : true,
          language: {emptyTable : "Nearest Disaster Points Not Available!!"}
        };
      this.RegisterProj4s();
      this.showJsonLayer();
      let data = await this.Utility._ROULayer;
      console.log(data);
    }

  ngAfterViewInit(): void 
    {
      this.dtTrigger.next();           
    }

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

  showJsonLayer()
    {
      const GetPointStyleFunction = function(feature,styleModel: StyleModel,geoType : GeometryType)
      {
        let style: Style = new Style();

        
        if(geoType == GeometryType.Circle)
        {
          let image = new Circle({
            radius: 5,
            fill: new Fill({
              color:styleModel.imageColor,
                }),
            stroke: new Stroke({color: styleModel.imageStrokeColor, width: 1}),
            });
            style.setImage(image);
        }
        else if(geoType == GeometryType.Line)
        {
           let image = new Stroke({
            color: styleModel.imageStrokeColor,
            width: 1,
          });
          style.setStroke(image);
        }
        else if(geoType == GeometryType.Polygon)
        {
          let image = new Stroke({
            color: styleModel.imageStrokeColor,
            width: 1,
          });
          style.setStroke(image);

          if(styleModel.imageColor)
          {
            let fill = new Fill({
              color: styleModel.imageColor,
            });
            style.setFill(fill);
          }
        }
        else if(geoType == GeometryType.Icon)
        {
           let image = new Icon({
            src: styleModel.imageSource,
            scale: styleModel.scale          
          })
          style.setImage(image);
        }

        if(styleModel.showText)
        {
            let cols = styleModel.textProperty.split(",");
            let textOnMap = "";

            for (let index = 0; index < cols.length; index++) {
              if(!feature.get(cols[index]))
              {
                 continue;
              }
              textOnMap= textOnMap+ feature.get(cols[index]);
              if(index < cols.length -1 ) 
              {
                textOnMap = textOnMap + ",";
              }            
            }

            if(styleModel.zoomLevel)
            {
              let zoom = map.getView().getZoom();
              if(textOnMap == "")
              {
                textOnMap = zoom >= styleModel.zoomLevel ? styleModel.textProperty : '';
              }
              else
              {
                 textOnMap = zoom >= styleModel.zoomLevel ? textOnMap : '';
              }
            }

            let text : Text = new Text({
            font: styleModel.textFont,
            fill: new Fill({color: styleModel.textColor}),
            stroke: new Stroke({color: styleModel.textColor, width: 1}),
            text: textOnMap,
            textAlign : styleModel.textAlign,  
            padding : styleModel.padding
          });

          style.setText(text);
        }

        return style;
      }

      var self = this;
      let l_OLdata

      //const CS_PointLayer = this.CreateLayer(this.configService.getCSPoint(),GetPointStyleFunction,"Crossing",4);
      const CS_PointLayer : VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getCSPoint()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#f34141ed","#f34141ed",true,"#000","TEXTSTRING,Crossing_N",self.urlService.TextFont15,"left",null,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Circle)
        },
      });
      CS_PointLayer.set('title',self.urlService.CSLayer);      
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.CSLayer,CS_PointLayer,true, true)
      this._LayerCol.push(l_OLdata);

      //const TP_PointLayer = this.CreateLayer(this.configService.getTPPoint(),GetPointStyleFunction,"TP",4);
      const TP_PointLayer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getTPPoint()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#ffbf00","#ffbf00",true,"#022cfb","TEXTSTRING",self.urlService.TextFont15,"bottom",null,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Circle)
        },
      });   
      TP_PointLayer.set('title',self.urlService.TPLayer);  
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.TPLayer,TP_PointLayer,true, true)
      this._LayerCol.push(l_OLdata);

      //const Chainage_Layer = this.CreateLayer(this.configService.getChainage(),GetPointStyleFunction,"Chainage",4);
      const Chainage_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getChainage()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#3e8d42","#325a34",true,"#022F1F","ChainageName",self.urlService.TextFont10,"bottom",14,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Circle)
        },
      });   
      Chainage_Layer.set('title',self.urlService.Chainage); 
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Chainage,Chainage_Layer,true, true)
      this._LayerCol.push(l_OLdata);

      const Center_LineLayer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getCenterLine()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("","green",false);
          return GetPointStyleFunction(feature, style,GeometryType.Line)
        },
      });   
      Center_LineLayer.set('title',self.urlService.Center);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Center,Center_LineLayer,true, true)
      this._LayerCol.push(l_OLdata);

      const Village_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getVIllageBoundry()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#dfdf326e","#5990cb",true,"#f04141","Village",self.urlService.TextFont17,"left",null,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Polygon)
        },
      });   
      Village_Layer.set('title',self.urlService.Village);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Village,Village_Layer,true, true)
      this._LayerCol.push(l_OLdata);

      const Khasra_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getKhasrBoundry()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#0052eb4a","#d30d39e8",true,"#0052eb","Survey_No",self.urlService.TextFont17,"left",null,[0,0,0,0]);
          return GetPointStyleFunction(feature, style,GeometryType.Polygon)
        },
      }); 
      Khasra_Layer.set('title',self.urlService.Khasra);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Khasra,Khasra_Layer,true, true)
      this._LayerCol.push(l_OLdata);

      const ROU_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getROW()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#0052eb4a","#d30d39e8",false);
          return GetPointStyleFunction(feature, style,GeometryType.Polygon)
        },
      });
      ROU_Layer.set('title',self.urlService.ROU);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.ROU,ROU_Layer,true, true)
      this._LayerCol.push(l_OLdata);

      // Changes to add new GeoJson - Start
      const Well_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getWell()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModelForIcon(self.configService.getWellIcon(),.2,false);
          return GetPointStyleFunction(feature, style,GeometryType.Icon)
        },
      });   
     
      Well_Layer.set('title',self.urlService.Well);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Well,Well_Layer,true, true)
      this._LayerCol.push(l_OLdata);

     
      const Watertank_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getWaterTank()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModelForIcon(self.configService.getWaterTankIcon(),.4,false);
          return GetPointStyleFunction(feature, style,GeometryType.Icon)
        },
      });   
      Watertank_Layer.set('title',self.urlService.WaterTank);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.WaterTank,Watertank_Layer,true, true)
      this._LayerCol.push(l_OLdata);

      const BoreWell_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getBorewell()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModelForIcon(self.configService.getBWIcon(),.4,false);
          return GetPointStyleFunction(feature, style,GeometryType.Icon)
        },
      });   
      BoreWell_Layer.set('title',self.urlService.BoreWell);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.BoreWell,BoreWell_Layer,true,true)
      this._LayerCol.push(l_OLdata);
    
      const Pond_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getPond()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#00FFFF","#00FFFF",false);
          return GetPointStyleFunction(feature, style,GeometryType.Polygon)
        },
      });
      Pond_Layer.set('title',self.urlService.Pond);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Pond,Pond_Layer,true,true)
      this._LayerCol.push(l_OLdata);
      
      const Compound_Wall_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getCompound_Wall()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#000","#000",false);
          return GetPointStyleFunction(feature, style,GeometryType.Polygon)
        },
      });   
      Compound_Wall_Layer.set('title',self.urlService.Compound_Wall);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Compound_Wall,Compound_Wall_Layer,true, true)
      this._LayerCol.push(l_OLdata); 

      const Plantation_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getPlantation()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#00b300","#00b300",false);
          return GetPointStyleFunction(feature, style,GeometryType.Polygon)
        },
      });  
      Plantation_Layer.set('title',self.urlService.Plantation);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Plantation,Plantation_Layer,true, true)
      this._LayerCol.push(l_OLdata); 

      const Texthighlight_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getTexthightlight()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#621e73","#621e73",true,"#330000","TextName",self.urlService.TextFont15,"left",14,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Circle)
        },
      });   
      Texthighlight_Layer.set('title',self.urlService.Texthighlight); 
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Texthighlight,Texthighlight_Layer,true, true)
      this._LayerCol.push(l_OLdata); 
      

      const Building_Layer: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getBuilding()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#fff","#f9035e",true,"#330000","B",self.urlService.TextFont15,"left",14,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Polygon)
        },
      });  
      Building_Layer.set('title',self.urlService.Building);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Building,Building_Layer,true, true)
      this._LayerCol.push(l_OLdata);

      const FOREST_BOUNDARY: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getFOREST_BOUNDARY()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#00e600","#330000",true,"#330000","STRING",self.urlService.TextFont15,"left",null,[0,0,0,0]);
          return GetPointStyleFunction(feature, style,GeometryType.Polygon)
        },
      });  
      FOREST_BOUNDARY.set('title',self.urlService.FOREST_BOUNDARY);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.FOREST_BOUNDARY,FOREST_BOUNDARY,true, true)
      this._LayerCol.push(l_OLdata);

      const Neotectonic: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getNeotectonic_Fault()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("","#5a0c5a",false);          
          return GetPointStyleFunction(feature, style,GeometryType.Line)
        },
      });  
      Neotectonic.set('title',self.urlService.Neotectonic);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Neotectonic,Neotectonic,true, true)
      this._LayerCol.push(l_OLdata);

      const Khasara_Boundary_bigger: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getKhasaraBoundaryBigger()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("","#cc0000",false);          
          return GetPointStyleFunction(feature, style,GeometryType.Line)
        },
      });  
      Khasara_Boundary_bigger.set('title',self.urlService.Khasara_Boundary_bigger);
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.Khasara_Boundary_bigger,Khasara_Boundary_bigger,true, true)
      this._LayerCol.push(l_OLdata);

      const GCP_Points: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getGCP_Points()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#33ffff","#33ffff",true,"black","TEXTSTRING",self.urlService.TextFont15,"bottom",14,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Circle)
        },
      });   
      GCP_Points.set('title',self.urlService.GCP_Points); 
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.GCP_Points,GCP_Points,true, true)
      this._LayerCol.push(l_OLdata);

      const SurveyNoTextBigger: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getSurveyNoTextBigger()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#a22a2a","#a22a2a",true,"black","TEXTSTRING",self.urlService.TextFont10,"bottom",14,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Circle)
        },
      });   
      SurveyNoTextBigger.set('title',self.urlService.SurveyNoTextBigger); 
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.SurveyNoTextBigger,SurveyNoTextBigger,true, true)
      this._LayerCol.push(l_OLdata);    

      const DisasterManagementData: VectorLayer = new VectorLayer({
        source: new VectorSource({  
        features: new GeoJSON().readFeatures(this.configService.getDisasterManagementData()),
        format: new GeoJSON()
        }),
        style: function(feature){
          let style = self.SetStyleModel("#03fce3","#03fce3",true,"black","Type",self.urlService.TextFont15,"left",10,[0,2,4,5]);
          return GetPointStyleFunction(feature, style,GeometryType.Circle)
        },
      });   
      DisasterManagementData.set('title',self.urlService.DisasterManagementData);
      self._DisasterManagementLyr = DisasterManagementData; 
      l_OLdata = this._OpenLayerData.LayerInfo(self.urlService.DisasterManagementData,DisasterManagementData,true, true)
      this._LayerCol.push(l_OLdata);

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
      /**base map style and add layers */
      var washingtonLonLat = [72.018320,24.850438];//lat long panchpadra
      var washingtonWebMercator = transform(washingtonLonLat,'EPSG:32643', 'EPSG:4326');
      const map = new Map({
        //layers: LayersCol,
        layers:
        [
           tileLayer,
           Village_Layer,     
           FOREST_BOUNDARY,      
           Khasara_Boundary_bigger,           
           SurveyNoTextBigger,
           Khasra_Layer,
           ROU_Layer,
           Center_LineLayer,
           CS_PointLayer,
           TP_PointLayer,
           Chainage_Layer,          
           Compound_Wall_Layer,
           Building_Layer,          
           Plantation_Layer,         
           Pond_Layer,
           Watertank_Layer,
           BoreWell_Layer,
           Well_Layer,
           Texthighlight_Layer,           
           Neotectonic,
           GCP_Points,
           DisasterManagementData
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

      Khasara_Boundary_bigger.setVisible(false);
      BoreWell_Layer.setVisible(false);
      Watertank_Layer.setVisible(false);
      Well_Layer.setVisible(false);
      SurveyNoTextBigger.setVisible(false);
      Chainage_Layer.setVisible(false);  
      TP_PointLayer.setVisible(false);    
      CS_PointLayer.setVisible(false);    

      //Creating a Map Click Event Listener
      map.on('singleclick', function (e) {
        //console.log(e.coordinate)
        //alert("Lat, Long : " + e.coordinate[1] + ", " + e.coordinate[0])
        let crossingFeatures : MapFeature[] = [];
        let khasraFeatures : MapFeature[] = [];
        let TP_GCP_Features : MapFeature[] = [];
        let l_DisasterManagementData : MapFeature[] = [];
        let features : MapFeature[] = [];        
        //checkbox
        if(self._ShowDisasterPoints == true)
        {
          self._DisasterManagementDetails = [];
          let dmFeatures = self._DisasterManagementLyr.getSource().getFeatures();
          let features : any[];

          for (let index = 0; index < dmFeatures.length; index++) {
            try
            {
              let elm = dmFeatures[index];
              let dmPoint =(<Point>elm.getGeometry()).getCoordinates();
              e.coordinate.push(0);
              let dist = self.ComputeDistance(dmPoint,e.coordinate);
              if(dist)
              {
                dist = dist/1000;
                if(dist <= 10)
                {
                  let dmDetails : DisasterManagementDetails = new DisasterManagementDetails();
                  
                  dmDetails.Name = elm.get('TEXTSTRING');
                  dmDetails.Address = elm.get('Address');
                  if(!dmDetails.Address)
                  { 
                    dmDetails.Address = "";
                  }
                  dmDetails.Type = elm.get('Type');
                  dmDetails.Phone = elm.get('Phone_N');
                  if(!dmDetails.Phone)
                  {
                    dmDetails.Phone = "";
                  }
                  dmDetails.Distance = dist;
                  self._DisasterManagementDetails.push(dmDetails);
                  //self.ReloadDatatable();
                }
              }
            }
            catch(e)
            {
               console.log("DM error in point: " +index);
            }
          }
        }
        else
        {
          // start without check box click - start
          var feature = map.forEachFeatureAtPixel(e.pixel,        
            function(feature, layer) { 
              let layerName = layer.get('title');
              if(layerName == "Crossing")
              {
                if(!crossingFeatures.find(elm=>elm.CrossingName== feature.get('TEXTSTRING')))
                {
                  let mf :MapFeature = {CrossingName: feature.get('TEXTSTRING'),DM_Id:"",SelectedFeature: feature , SurveyNo:"",TP_GCP:"", Permission :feature.get('Permission')};
                  crossingFeatures.push(mf);   
                  features.push(mf);
                }   
              }  
              if(layerName == "Khasra")
              {              
                if(!khasraFeatures.find(elm=>elm.SurveyNo==feature.get('Survey_No')))
                {
                  let mf :MapFeature = { SurveyNo: feature.get('Survey_No'),DM_Id:"",SelectedFeature : feature , CrossingName:"",Permission :"",TP_GCP:""};
                  khasraFeatures.push(mf);      
                  features.push(mf);
                }
              }
              if(layerName == "TP" || layerName == "GCP_Points" )
              {              
                if(!TP_GCP_Features.find(elm=>elm.SurveyNo==feature.get('TEXTSTRING')))
                {
                  let mf :MapFeature = { TP_GCP: feature.get('TEXTSTRING'),DM_Id:"",SurveyNo:"",SelectedFeature : feature , CrossingName:"",Permission :""};
                  TP_GCP_Features.push(mf);      
                  features.push(mf);
                }
              } 
              if(layerName == "DisasterManagementData")
              {              
                if(!l_DisasterManagementData.find(elm=>elm.DM_Id==feature.get('TEXTSTRING')))
                {
                  let mf :MapFeature = { DM_Id: feature.get('TEXTSTRING'),TP_GCP:"",SurveyNo:"",SelectedFeature : feature , CrossingName:"",Permission :""};
                  l_DisasterManagementData.push(mf);      
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
            if(l_DisasterManagementData.length > 0)
            {
              let DM_Id = l_DisasterManagementData[0].DM_Id;
              let Name = l_DisasterManagementData[0].SelectedFeature.get('TEXTSTRING');
              let Address = l_DisasterManagementData[0].SelectedFeature.get('Address');
              if(!Address)
              { 
                Address = "";
              }
              let Type = l_DisasterManagementData[0].SelectedFeature.get('Type');
              let Phone = l_DisasterManagementData[0].SelectedFeature.get('Phone_N');
              if(!Phone)
              {
                Phone = "";
              }
                          
              const coordinate = e.coordinate;    
              content.innerHTML = '<p>You clicked at: '+DM_Id+' ('+Type+') :</p><code>Name :' + Name + ', Address:'+Address+', Phone:'+Phone+'</code>';
              overlay.setPosition(coordinate);

              return;
            }
            if(TP_GCP_Features.length > 0)
            {
              let TP_GCP = TP_GCP_Features[0].TP_GCP;
              let Easting = TP_GCP_Features[0].SelectedFeature.get('Easting');
              let Northing = TP_GCP_Features[0].SelectedFeature.get('Northing');
                          
              const coordinate = e.coordinate;
              const hdms =toStringHDMS(toLonLat(coordinate));
    
              content.innerHTML = '<p>You clicked at: '+TP_GCP+' :</p><code>Easting :' + Easting + ', Northing:'+Northing+'</code>';
              overlay.setPosition(coordinate);

              return;
            }
            if(khasraFeatures.length > 0)
            {
              let data =khasraFeatures[0].SelectedFeature.getProperties();
              self.ShowSurveyPopup(data);  
              return;
            }         
          }    
        // start without check box click - end 

        }
      });   
      
      map.getView().on('change:resolution', function (e) {
        let visible : boolean = true;

        if (map.getView().getZoom() < 12) {  
           visible = false;       
        }
        Khasara_Boundary_bigger.setVisible(visible);
        BoreWell_Layer.setVisible(visible);
        Watertank_Layer.setVisible(visible);
        Well_Layer.setVisible(visible);
        SurveyNoTextBigger.setVisible(visible);
        Chainage_Layer.setVisible(visible);    
        TP_PointLayer.setVisible(visible);    
        CS_PointLayer.setVisible(visible);      
     });
      
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

    ComputeDistance(argDMPoint : any,argClickPoint: any[]):any
    {     
      var distance = getDistance(argDMPoint, argClickPoint);      
      return distance;
    }

    RegisterProj4s()
    {
      let p4 = olProj4;
      //proj4.defs("EPSG:32644", "+proj=utm +zone=44 +datum=WGS84 +units=m +no_defs"); // projection definitions needs to be added on proj4 library
      Proj4.defs("EPSG:32643", "+proj=utm +zone=43 +datum=WGS84 +units=m +no_defs");
      Proj4.defs("EPSG:32644","+proj=utm +zone=44 +datum=WGS84 +units=m +no_defs");
      //Proj4.defs("EPSG:4326","+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
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

    /**
     * 
     * @param imageColor : Color used to fill
     * @param imageStrokeColor : color for the stroke (boundry)
     * @param showText 
     * @param textColor 
     * @param textProperty 
     * @param textFont 
     * @param textAlign 
     * @param zoomLevel 
     * @param padding 
     * @returns 
     */
    SetStyleModel(imageColor : string,imageStrokeColor:string,
      showText: boolean,textColor: string = "",textProperty: string= "",textFont: string= "",
      textAlign:string= "",zoomLevel : Number= null, padding:number[]=[]) :StyleModel
    {
       let styleModelObj = new StyleModel();
       styleModelObj.imageColor = imageColor;
       styleModelObj.imageStrokeColor = imageStrokeColor;
       styleModelObj.padding = padding;
       styleModelObj.showText = showText;
       styleModelObj.textAlign = textAlign;
       styleModelObj.textColor = textColor;
       styleModelObj.textFont = textFont;
       styleModelObj.textProperty = textProperty;
       styleModelObj.zoomLevel = zoomLevel;
       return styleModelObj;
    }

    SetStyleModelForIcon(imageSource:string, scale:number,
      showText: boolean,textColor: string = "",textProperty: string= "",textFont: string= "",
      textAlign:string= "",zoomLevel : Number= null, padding:number[]=[]) :StyleModel
    {
       let styleModelObj = new StyleModel();
       styleModelObj.padding = padding;
       styleModelObj.showText = showText;
       styleModelObj.textAlign = textAlign;
       styleModelObj.textColor = textColor;
       styleModelObj.textFont = textFont;
       styleModelObj.textProperty = textProperty;
       styleModelObj.zoomLevel = zoomLevel;
       styleModelObj.imageSource = imageSource;
       styleModelObj.scale = scale;
       return styleModelObj;
    }

    CreateLayer(features : any, styleF : StyleFunction,layerTitle : string, layerOrder: Number) :VectorLayer 
    {
        let layer : VectorLayer = new VectorLayer({
          source: new VectorSource({  
          features: new GeoJSON().readFeatures(features),
          format: new GeoJSON()
          }),
          style: styleF,
        });

        layer.set('title',layerTitle);

        let mLayer : MapLayer = new MapLayer();
        mLayer.Checked = true;
        mLayer.LayerName = layerTitle;
        mLayer.LayerObject = layer;
        mLayer.Order = layerOrder;

        this.MapLayers.push(mLayer);

        return layer;
    }

}


