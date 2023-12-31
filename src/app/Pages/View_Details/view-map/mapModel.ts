export class MapFeature{
    CrossingName : string; 
    SurveyNo : string;
    SelectedFeature : any;
    Permission : string;
    TP_GCP :string;   
    DM_Id : any 
  }

export class MapLayer
{
   LayerName : string;
   LayerObject : any;
   Checked : boolean;
   Order : Number
}

export class PointStyleModel
{
    imageColor : string;
    imageStrokeColor : string;
    showText: boolean;
    textColor: string = "";
    textProperty: string= "";
    textFont: string= "";
    textAlign:string= "";
    zoomLevel : Number= null;
    padding:number[]=[];
    scale: number;
    imageSource : string;
}

export enum GeometryType
{
  Circle = 1,
  Line = 2,
  Polygon = 3,
  Icon = 4
}

export class DisasterManagementDetails
{
   Name : string;
   Address : string;
   Phone : string;
   Type : string;
   Distance : number;
}