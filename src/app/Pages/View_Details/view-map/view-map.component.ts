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

  /**show openlayer map */
  ShowMap()
    {
      // var washingtonLonLat = [75.778885,26.922070];//lat long jaipur
      var washingtonLonLat = [82.7525294,20.9880135];//lat long india
      var washingtonWebMercator = new olProj.fromLonLat(washingtonLonLat);
        var OSMLayer = new TileLayer({
            source: new OSM()
        });
        var source = new VectorSource();
        var vector = new VectorLayer({
            source: source,
            style : [
              new Style({
                stroke: new Stroke({
                  color: 'blue',
                  width: 3,
                }),
                fill: new Fill({
                  color: 'rgba(255, 255, 255, 0.2)',
                }),
              }),
              new Style({
                image: new Circle({
                  radius: 6,
                  fill: new Fill({
                    color: 'blue',
                  }),
                }),
              })],
        });
        var layers = [
        OSMLayer,
        vector
        ];
      //console.log(layers);
        var view = new View({
            center: washingtonWebMercator,
            zoom: 5,
            maxZoom: 20
        })
        var map = new Map({
            layers: layers,
            target: map,
            view: view,
            controls: defaultControls().extend([new FullScreen()]),
            //controls: [] // Hide default controls.(zoomin and zoomout button hide)
        });
        map.setTarget('map');
        var thing = new Point( washingtonWebMercator);
        var featurething = new Feature({
            name: "Thing",
            geometry: thing
        });
        source.addFeature( featurething );
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
            color: 'yellow',
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
      
      const styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
      };
      
      const geojsonObject = 
      {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "EPSG:32643" } },
        "features": [
        { "type": "Feature", "properties": { "TEXTSTRING": "CART TRACK", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 220916.331, 2869106.143, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-18", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 220916.331, 2869106.143, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "ELECTRIC LINE", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221441.498525064263958, 2870792.852005797438323, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-17", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221441.498525064263958, 2870792.852005797438323, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "ELECTRIC LINE", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221471.484065008815378, 2870975.50134636182338, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-16", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221471.484065008815378, 2870975.50134636182338, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "WBM ROAD", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221508.973902911675395, 2871057.832667193375528, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-15", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221508.973902911675395, 2871057.832667193375528, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "LT LINE", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221621.65853906123084, 2871356.257315917871892, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-14", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221621.65853906123084, 2871356.257315917871892, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "WBM ROAD", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221647.767619494057726, 2871408.340449570678174, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-13", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221647.767619494057726, 2871408.340449570678174, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "OPTICAL FIBER CABLE", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221656.573525705840439, 2871425.906720866449177, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-12", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221656.573525705840439, 2871425.906720866449177, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "NH-25", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221663.28879680566024, 2871439.30253398604691, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-11", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221663.28879680566024, 2871439.30253398604691, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "LT LINE", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221694.289468126487918, 2871501.143551784101874, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-10", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221694.289468126487918, 2871501.143551784101874, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "RAILWAY  LAND", "TEXT_SIZE": 1.5, "TEXT_ANGLE": 0.0 }, "geometry": { "type": "Point", "coordinates": [ 221775.149, 2871999.90199999977, 0.0 ] } },
        { "type": "Feature", "properties": { "TEXTSTRING": "CS-9A", "TEXT_SIZE": 5.0, "TEXT_ANGLE": 45.0 }, "geometry": { "type": "Point", "coordinates": [ 221775.149, 2871999.90199999977, 0.0 ] } }
        ]
      }

      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject),
      });
      var features = new Feature();
      vectorSource.addFeature(features);
      
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: styleFunction,
      });
      
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    }
}

