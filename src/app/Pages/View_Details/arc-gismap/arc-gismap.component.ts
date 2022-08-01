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
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import Editor from "@arcgis/core/widgets/Editor";
import LayerList from "@arcgis/core/widgets/LayerList";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import * as content from "@arcgis/core/popup/content";
import { ViewSurveyTabsComponent } from 'src/app/Pages/View_Details/view-survey-tabs/view-survey-tabs.component';
import {ModelServiceService} from 'src/app/services/model-service.service';
import { NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CommonService} from 'src/app/services/common.service';
import { UrlService } from 'src/app/services/url.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-arc-gismap',
  templateUrl: './arc-gismap.component.html',
  styleUrls: ['./arc-gismap.component.css']
})
export class ArcGISMapComponent implements OnInit {
  public view: any = null;

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

  constructor(public urlService: UrlService,
    public modelServiceService : ModelServiceService,
    public Utility: UtilityService,
    public CommonService : CommonService,
    )
    {
    }


  initializeMap(): Promise<any> {
    const container = this.mapViewEl.nativeElement;
    
    const webmap = new WebMap({
      portalItem: {
        id: '0c96587e9db643e8baf8ae4f96b94d16' //'81c5c531a26a48299a600fe4be4b1299'// ee945975a60c47fe80b6fd37ab331705 (S) .. aa1d3f80270146208328cf66d022e09c (G)
       //id: '0c96587e9db643e8baf8ae4f96b94d16',
      }
    });

    const view = new MapView({
      container,
      map: webmap
    });

    const editor = new Editor({
      view: view
    });
    
    // view.ui.add(editor, "top-right");

    // typical usage
    let layerlist = new LayerList({
      view: view,
      listItemCreatedFunction: function(event){
        const item = event.item;
        item.panel = {
          content: "legend"
        };
      }
    });
    layerlist.selectionEnabled = true;
    layerlist.multipleSelectionEnabled = true;
    view.ui.add(layerlist, {
      position: "top-right"//"top-left"
    });

    let basemapGallery = new BasemapGallery({
      view: view
    });
    // Add widget to the top right corner of the view
    // view.ui.add(basemapGallery, {
    //   position: "top-right"
    // });

    const bookmarks = new Bookmarks({
      view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
    });

    const bkExpand = new Expand({
      view,
      content: bookmarks,
      expanded: false,
    });

    // Add the widget to the top-right corner of the view
    //view.ui.add(bkExpand, 'top-right');

    // bonus - how many bookmarks in the webmap?
    webmap.when(() => {
      if (webmap.bookmarks && webmap.bookmarks.length) {
        console.log('Bookmarks: ', webmap.bookmarks.length);
      } else {
        console.log('No bookmarks in this webmap.');
      }
    });

    this.view = view;
    //click on map 
    // view.on("click", (event) => {
    //   console.log("event",event)
    //       // Search for symbols on click's position
    //     view.hitTest(event.screenPoint)
    //     .then(function(response){
    //       // Retrieve the first symbol
    //       var graphic = response.results[0].graphic;
    //       if (graphic) {
    //         // We now have access to its attributes
    //         console.log(graphic.attributes);
    //       }
    //     });

    //   });

    // view.on("layerview-create", function(event) {
    //   // The event contains the layer and its layer view that has just been
    //   // created. Here we check for the creation of a layer view for a layer with
    //   // a specific id, and log the layer view
    //   if (event.layer.id === "Khsara boundary") {
    //     // The LayerView for the desired layer
    //     console.log(event.layerView);
    //   }
    // });

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
