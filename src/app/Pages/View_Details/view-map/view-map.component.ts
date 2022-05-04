import { Component, OnInit } from '@angular/core';
import VectorLayer from 'ol/layer/Vector';
//import Proj from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import * as olProj from 'ol/proj';
import {Fill, Stroke, Style,Circle, Text} from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import 'ol/ol.css';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import {toStringHDMS} from 'ol/coordinate';
import Overlay from 'ol/Overlay';

/**ol map plugins */
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';
import {get as GetProjection} from 'ol/proj'
import {Extent} from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import {fromLonLat} from 'ol/proj';
import {altKeyOnly, click, pointerMove} from 'ol/events/condition';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.css']
})
export class ViewMapComponent implements OnInit {
  map: any;
  geometry:any;
  draw: any;
  snap: any;
  source:any;
  select:any;
  VectorLayer : any;
  testp;
  vectorSource;
  vectorLayer;

  projection: Projection;
  extent: Extent 
  //= [-20026376.39, -20048966.10, 20026376.39, 20048966.10];
  constructor() { }

  ngOnInit(): void 
    {
      //  this.ShowMap();
      this.showJsonLayer();  
    }

  showJsonLayer()
    {
      const image = new Circle({
        radius: 5,
        fill: new Fill({
          color: 'blue',
        }),
        stroke: new Stroke({color: 'red', width: 1}),
      });
      
      const styles = {
        'Point': new Style({
          image: image,
        }),
        'LineString': new Style({
          stroke: new Stroke({
            color: 'green',
            width: 1,
          }),
        }),
        'MultiLineString': new Style({
          stroke: new Stroke({
            color: 'green',
            width: 1,
          }),
        }),
        'MultiPoint': new Style({
          image: image,
        }),
        'MultiPolygon': new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 1,
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)',
          }),
        }),
        'Polygon': new Style({
          stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3,
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
          }),
        }),
        'GeometryCollection': new Style({
          stroke: new Stroke({
            color: 'magenta',
            width: 2,
          }),
          fill: new Fill({
            color: 'magenta',
          }),
          image: new Circle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
              color: 'magenta',
            }),
          }),
        }),
        'Circle': new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2,
          }),
          fill: new Fill({
            color: 'rgba(255,0,0,0.2)',
          }),
        }),
      };
      const highlightStyle = new Style({
        fill: new Fill({
          color: '#EEE',
        }),
        stroke: new Stroke({
          color: '#3399CC',
          width: 2,
        }),
      });
      const styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
      };
      
      const vectorSource = new VectorSource({        
        url : "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=387",//387,382
        //features: new GeoJSON().readFeatures(geojsonObject),
        format: new GeoJSON()//{dataProjection: 'EPSG:4326', featureProjection: 'EPSG:32643'}
      });
      
      var features = new Feature();
      vectorSource.addFeature(features);      
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: styleFunction,
      });
      var washingtonLonLat = [72.2584733,25.9234036];//lat long panchpadra
      var washingtonWebMercator = new olProj.fromLonLat(washingtonLonLat);
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        target: 'map',
        view: new View({
          center: washingtonWebMercator,//[0, 0],
          zoom: 10, 
        }),
        controls: defaultControls().extend([new FullScreen()]),
      });
      const selected = [];
      //Creating a Map Click Event Listener
      map.on('singleclick', function (e) {
        var feature = map.forEachFeatureAtPixel(e.pixel,
          function(feature, layer) {  
            feature.getProperties();//get all properties using
            //feature.get('name')//if  just need one field
            console.log(feature.getProperties());  
            /**selecte multiple feature highlight */
            const selIndex = selected.indexOf(feature);
              if (selIndex < 0) 
              {
                selected.push(feature);
                feature.setStyle(highlightStyle);
              } 
              else 
              {
                selected.splice(selIndex, 1);
                feature.setStyle(undefined);
              }          
          });          
      })
    }
}


