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
import Query from "@arcgis/core/rest/support/Query";
import esriConfig from "@arcgis/core/config";
import esriId from "@arcgis/core/identity/IdentityManager";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpHeaders,HttpResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
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
  _SurveyNo : string;
  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;
  constructor(public urlService: UrlService,
    public modelServiceService : ModelServiceService,
    public Utility: UtilityService,
    public CommonService : CommonService,
    private http: HttpClient,
    public httpService : HttpService,
    ){}

  initializeWebMap(): Promise<any> {    
    // esriConfig.portalUrl = "https://shalinee1.maps.arcgis.com/arcgis"
    const container = this.mapViewEl.nativeElement;
    const webmap = new WebMap({
      portalItem: {
        id: '0c96587e9db643e8baf8ae4f96b94d16' //'81c5c531a26a48299a600fe4be4b1299'// ee945975a60c47fe80b6fd37ab331705 (S) .. aa1d3f80270146208328cf66d022e09c (G)
      }
    });
    const view = new MapView({
      container,
      map: webmap,
    });

    const searchWidget = new Search({
      view: view
    });
    // Adds the search widget below other elements in
    view.ui.add(searchWidget, {position: "manual"});
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
              // var graphic = response.results.filter(function (result) 
              // {
              //   // check if the graphic belongs to the layer of interest
              //   let layer = result.graphic.layer.title
              //   console.log("Layer name => ",layer);
              //   //result.graphic.layer.fields[5].name
              //   //'Survey_No'
              //   return result.graphic.layer.title === "Khasra boundary"//"CHAINAGE"
              // })[0].graphic;
              // //do something with the result graphic
              // console.log(graphic.attributes);
            }
        });
          //======end
      });

     
    return this.view.when();
  }


  initializeFeatureLayer(): Promise<any> 
    {
      //esriConfig.apiKey = "fUgDMIBCSPttb0MF";
      const container = this.mapViewEl.nativeElement;  
      const template = {
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

      // const featureLayer = new FeatureLayer({
      //   url: "https://services5.arcgis.com/7ZC5WD9ov5lKqoSp/arcgis/rest/services/Khasra_boundary_Layer/FeatureServer",
      //   // url: "https://services5.arcgis.com/7ZC5WD9ov5lKqoSp/arcgis/rest/services/BPPL_Layers/FeatureServer",
      //   outFields: ["*"],
      //   popupTemplate: template
      //   });

        const featureLayer = new FeatureLayer({
          portalItem: {
            id: "54722552aeee471a9082c78416bdd1ca"
          },
          outFields: ["*"]
        });

      var map = new Map({
        basemap: "hybrid",//"gray-vector",
        layers: [featureLayer]
      });
      const view = new MapView({
        container,
        map : map,
        //center: [72.018320,24.850438],
        scale: 5000000
      });
      map.add(featureLayer); 
      
        let query = featureLayer.createQuery();
        query.where = "'Survey_No' = '55'";
        query.outFields = ["Survey_No"];

        featureLayer.queryFeatures(query)
          .then(function(response){
            // returns a feature set with features containing the following attributes
            // STATE_NAME, COUNTY_NAME, POPULATION, POP_DENSITY
            return;
          });

      const searchWidget = new Search({
        view: view
      });
      // Adds the search widget below other elements in
      view.ui.add(searchWidget, {
        position: "manual",
      });
      this.view = view;
      return this.view.when();
    }

  ngOnInit(): any {
    //Initialize MapView and return an instance of MapView
    this.initializeWebMap().then(() => {
      // The map has been initialized
        console.log('The map is ready.');
    });
    this.devServerLogin();
    // this.initializeFeatureLayer().then(() => {
    //     console.log('The map is ready.');
    // });
  }


  // devServerLogin()
  // {
  //   let portalTokenUrl = "https://www.arcgis.com/sharing/rest/generateToken"; //Federated evn.,  use Portal  to generate user token.
  //   this.httpService.HttpPostRequest(portalTokenUrl,this.getCredentials(),this.EsriCallBack.bind(this),null);
  // }

  EsriCallBack(dtas)
    {
      if(dtas!=null)
      {
        console.log(dtas)
      }
    }

  devServerLogin()
  {
    let portalTokenUrl = "https://www.arcgis.com/sharing/rest/generateToken";
    // this.http.post(portalTokenUrl, this.getCredentials(), this.getHttpOptions()).subscribe(esriResponse =>{
    //   sessionStorage.setItem('dev_access_token', esriResponse['token']);
    //   console.log("['token']==> ",esriResponse['token'])
    //   sessionStorage.setItem('dev_access_token_expires', esriResponse['expires']);
    // });    


    // test only === working
    let tokenData ={
      "token": "IcHjbX_0pSUfgIEVviBJ3zSUVWynIAaxguKyhQfP0symoZ-4YJ02TGxf9fn1-gMxb0-b9fXyPIJpLmeWbERalfxs1SIqqG4TaVCmpK2C4jaV9-RFdQFHnmYq4lRNFPVlCmJdok7Hk_x3V66O8E7KKbh8rlyEUIXQhREudHs4FkMElmE_RgXNMwtdZPfH8nfI",
      "expires": 1660157906101,
      "ssl": true,
      'server': portalTokenUrl,
      'userId': "shalinee1",
      }
      esriId.registerToken(tokenData);
  }

  getCredentials()
  {
    let username = "shalinee1";
    let password = "shalinee123";
    let request=  "getToken"
    let expiration = 720;
    let f = "json"
    let referer= 'http://'+ window.location.host+'/';

    var params = {
      username: username,
      password: password,
      // client: client,
      request : request,
      referer: referer,
      expiration: expiration,
      f: f
      };

      //let expiration = 720; //1440 -> 60 minute * 24 = 1 day token , 720 ->  12hrs token   
      let tokenCredentials =  'username='+params.username+'&password='+params.password+'&f=json&expiration='+params.expiration+'&request='+request+'&referer='+ params.referer;
      return tokenCredentials;
    }

    private getHttpOptions()
      {
        let httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'}),//({'Access-Control-Allow-Headers': '*'}),//
          withCredentials: true,
        };
        return httpOptions;
      }


  ngOnDestroy(): void {
    if (this.view) {   
      this.view.destroy();   // destroy the map view
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
          id: "4",           
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

  OpenbkExpand()
    {
      const bookmarks = new Bookmarks({
        view: this.view,   
        id: "5",          
        editingEnabled: true,  // allows bookmarks to be added, edited, or deleted
        visibleElements: {
          time: false // don't show the time (h:m:s) next to the date
        }
      });
      const bkExpand = new Expand({
        view: this.view,
        expanded: true,
        content: bookmarks,
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
