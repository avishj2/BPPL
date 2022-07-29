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


@Component({
  selector: 'app-arc-gismap',
  templateUrl: './arc-gismap.component.html',
  styleUrls: ['./arc-gismap.component.css']
})
export class ArcGISMapComponent implements OnInit {
  public view: any = null;

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef;

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
    
    view.ui.add(editor, "top-right");

    const bookmarks = new Bookmarks({
      view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
    });

    const bkExpand = new Expand({
      view,
      content: bookmarks,
      expanded: true,
    });

    // Add the widget to the top-right corner of the view
    view.ui.add(bkExpand, 'top-right');

    // bonus - how many bookmarks in the webmap?
    webmap.when(() => {
      if (webmap.bookmarks && webmap.bookmarks.length) {
        console.log('Bookmarks: ', webmap.bookmarks.length);
      } else {
        console.log('No bookmarks in this webmap.');
      }
    });

    this.view = view;
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
}
