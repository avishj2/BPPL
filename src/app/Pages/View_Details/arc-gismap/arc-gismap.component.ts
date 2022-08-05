import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as projection from "@arcgis/core/geometry/projection";
import { load as projectionLoad, project } from "@arcgis/core/geometry/projection";
import WebMap from '@arcgis/core/WebMap';
import Map from '@arcgis/core/Map';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import Editor from "@arcgis/core/widgets/Editor";
import LayerList from "@arcgis/core/widgets/LayerList";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Print from "@arcgis/core/widgets/Print";
import * as content from "@arcgis/core/popup/content";
import { ViewSurveyTabsComponent } from 'src/app/Pages/View_Details/view-survey-tabs/view-survey-tabs.component';
import {ModelServiceService} from 'src/app/services/model-service.service';
import { NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonService} from 'src/app/services/common.service';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';
import Search from "@arcgis/core/widgets/Search";

@Component({
  selector: 'app-arc-gismap',
  templateUrl: './arc-gismap.component.html',
  styleUrls: ['./arc-gismap.component.css']
})
export class ArcGISMapComponent implements OnInit {
  public view: any = null;
  _OpenLayerList : boolean = false;
  _OpenBasemap : boolean = false;
  _OpenEditor : boolean = false;
  _OpenPrint : boolean = false;
  _OpenBookmark : boolean = false;
  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  @ViewChild('basemap') basemap: ElementRef;
  constructor(public urlService: UrlService,
    public modelServiceService : ModelServiceService,
    public Utility: UtilityService,
    public CommonService : CommonService,
    )
    {
    }


  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;
 
    const template = {
      // autocasts as new PopupTemplate()
      title: "Khasra boundary",
      Value  : "{Survey_No}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "State_N",
              label: "State_N",
            },
            {
              fieldName: "District_N",
              label: "District_N",
            },
            {
              fieldName: "Tehsil_N",
              label: "Tehsil",
            },
            {
              fieldName: "Village_N",
              label: "Village",
            },
            {
              fieldName: "Survey_No",
              label: "Survey_No"
            },
          ]
        }
      ]
    };

    const webmap = new WebMap({
      portalItem: {
        id: '0c96587e9db643e8baf8ae4f96b94d16' //'81c5c531a26a48299a600fe4be4b1299'// ee945975a60c47fe80b6fd37ab331705 (S) .. aa1d3f80270146208328cf66d022e09c (G)
      }
    });

    var map = new Map({
      basemap: "imagery"//"gray-vector",
    })

    const view = new MapView({
      container,
      map: webmap,
      //map : map,
    });

    const featureLayer = new FeatureLayer({
      url: "https://services5.arcgis.com/7ZC5WD9ov5lKqoSp/arcgis/rest/services/Khasra_boundary_Layer/FeatureServer",
      //url: "https://services5.arcgis.com/7ZC5WD9ov5lKqoSp/arcgis/rest/services/BPPL_Layers/FeatureServer",
      outFields: ["*"],
      popupTemplate: template
      });
    //map.add(featureLayer); 

    const searchWidget = new Search({
      view: view
    });
    // Adds the search widget below other elements in
    view.ui.add(searchWidget, {
      position: "manual",
    });

    // const editor = new Editor({
    //   view: view,
    // });
    // view.ui.add(editor, 'top-right');

    webmap.when(() => {
      if (webmap.bookmarks && webmap.bookmarks.length) {
        console.log('Bookmarks: ', webmap.bookmarks.length);
      } else {
        console.log('No bookmarks in this webmap.');
      }
    });
    this.view = view;
     ///=======start 
    //click on map 
    view.on("click", function(event){
      view.hitTest(event).then(function (response) {
          // do something with the result graphic
            //first method
          // console.log(response.results[0].layer.title)
          // let layerName = response.results[0].layer.title
          // if(layerName ==="Khasra boundary")
          // {
          //   let field = response.results[0].layer.fields[5].name     
          // }
          //second method
          if (response.results.length) 
          {
            var graphic = response.results.filter(function (result) 
            {
              // check if the graphic belongs to the layer of interest
              let layer = result.graphic.layer.title
              console.log("Layer name => ",layer);
              result.graphic.layer.fields[5].name
              //'Survey_No'
              return result.graphic.layer.title === "CHAINAGE"//"Khasra boundary"
            })[0].graphic;
            //do something with the result graphic
            console.log(graphic.attributes);
          }
        });
          //======end
      });

     
    return this.view.when();
  }

  ngOnInit(): any {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
        console.log('The map is ready.');
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }

  ShowSurveyPopup(arg)
      {
        // let featurelayerData = this._graphic.graphic.attribute;
        // console.log(featurelayerData)
        //if(featurelayerData){
        //   /**NgbModalOptions  add some option in ngbmodel  */
        // let ngbModalOptions: NgbModalOptions = {
        //   keyboard : false,
        //   size: 'xl'
        //   };
        //   let argdata = {
        //     ShowModel: true,
        //     // VillageName: arg.Village_N,
        //     VillageName : arg.Village,
        //     TehsilName :arg.Tehsil_N,           
        //     SurveyName :arg.DBSurvey_N,//Survey_No
        //   }
        // /**used popup model common service function */
        // this.modelServiceService.ShowPopUP(ViewSurveyTabsComponent,ngbModalOptions,argdata,
        //   null,null);
        // }
        
      }

  OpenLayerList()
    {
      let layerlist = new LayerList({
        view: this.view,
        id: "1",
        listItemCreatedFunction: function(event){
          var itemView = event.item; // layer-view of selection
          itemView.open = true;
          itemView.panel = {
            content: "legend",
          }; 
          // itemView.actionsSections = [
          //   [
          //     {
          //       title: "Go to full extent",
          //       className: "esri-icon-zoom-out-fixed",
          //       id: "full-extent"
          //     },
          //     {
          //       title: "Layer information",
          //       className: "esri-icon-description",
          //       id: "information"
          //     }
          //   ],
          // ];
        }
      });
      layerlist.selectionEnabled = true;
      if(this._OpenLayerList == false)
        {
          this._OpenLayerList = true;
          this.view.ui.empty("top-right");
          this.view.ui.add(layerlist, {position: "top-right"});
        }
        else{
          // this.view.ui.remove(layerlist);
          this.HideWidget();          
        }        
    }

    OpenBaseMaps()
      {
        let basemapGallery = new BasemapGallery({
          view: this.view,
          id : "2"
        });
        if(this._OpenBasemap== false)
          {
            this._OpenBasemap = true;
            this.view.ui.empty("top-right");
            // Add widget to the top right corner of the view
            this.view.ui.add(basemapGallery, {position: "top-right"});
          }
        else{
          this.HideWidget();
        }
      }

    OpenEditor()
      {
        const editor = new Editor({
          view: this.view,
          id: "3",
          //layerInfos: [pointInfos, lineInfos, polyInfos]
        });
        if(this._OpenEditor == false)
          {
            this._OpenEditor = true;
            this.view.ui.empty("top-right");
            this.view.ui.add(editor, "top-right");
          }
        else{
          this.HideWidget();          
        }
         
      }
    
    openPrint()
      {
        this.view.when(() => {
          const print = new Print({
            view: this.view,            
            printServiceUrl:// specify your own print service
              "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
          });
          if(this._OpenPrint == false)
            {
              this._OpenPrint = true;
              this.view.ui.empty("top-right");
              // Add widget to the top right corner of the view
              this.view.ui.add(print, "top-right");
            }
          else
            {
              this.HideWidget();
            }        
        });
      }

    OpenbkExpand(){
      const bkExpand = new Expand({
        view: this.view,
        expanded: true
      });
      if(this._OpenBookmark == false)
        {
          this._OpenBookmark = true;
          this.view.ui.empty("top-right");
          this.view.ui.add(bkExpand, "top-right");
        }
      else
        {
          this.HideWidget();
        }          
    }
    OpenQuery()
      {
        
      }
    HideWidget()
      {
        this.view.ui.empty("top-right");
        this._OpenLayerList = false;
        this._OpenBasemap = false;
        this._OpenEditor = false;
        this._OpenPrint = false;
        this._OpenBookmark = false;
      }
}
