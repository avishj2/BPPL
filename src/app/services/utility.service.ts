import { Injectable } from '@angular/core';
import { SearchCriteria } from 'src/app/Model/Filters.model';
import { CompensationCol,AllSurveyDetailsDataModel,CompensationModel} from 'src/app/Model/Survey.model';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  _CompensationModel : CompensationModel;
  _CSPointLayer;
  _CenterLineLayer;
  _KhasraLayer;
  _VillageLayer;
  _ROULayer;

  constructor() {}

    LogText(argText)
      {
        console.log(argText);
      }

    LogText2(argLabel, argText)
      {
        console.log(argLabel,argText);
      }

    CloneFilterData(argData)
      {
        let l_SearchCriteria = new SearchCriteria();
        l_SearchCriteria.ChainageFrom = argData.ChainageFrom;
        l_SearchCriteria.ChainageTo = argData.ChainageTo;
        l_SearchCriteria.CrossingID = argData.CrossingID;
        l_SearchCriteria.CrossingType = argData.CrossingType;
        l_SearchCriteria.CrossingTypeName = argData.CrossingTypeName;
        l_SearchCriteria.DistrictId = argData.DistrictId;
        l_SearchCriteria.DistrictName = argData.DistrictName;
        l_SearchCriteria.OwnerID = argData.OwnerID;
        l_SearchCriteria.OwnerName = argData.OwnerName;
        l_SearchCriteria.StateId = argData.StateId;
        l_SearchCriteria.StateName = argData.StateName;
        l_SearchCriteria.SurveyID = argData.SurveyID;
        l_SearchCriteria.SurveyName = argData.SurveyName;
        l_SearchCriteria.TalukaId = argData.TalukaId;
        l_SearchCriteria.TalukaName = argData.TalukaName;
        l_SearchCriteria.TypeOfLand = argData.TypeOfLand;
        l_SearchCriteria.TypeOfNotification = argData.TypeOfNotification;
        l_SearchCriteria.VillageId = argData.VillageId;
        l_SearchCriteria.VillageName = argData.VillageName;
        return l_SearchCriteria;
      }


    CalTotalCompensation(argLandDetails, argCrops ,argTrees)
      {
        this._CompensationModel = new CompensationModel(); 
        /**land details */
        argLandDetails.forEach(element => {
          this._CompensationModel.Compensation.push({OwnerID: element.SurveyOwnerId,PaymentCategory:"Land",Amount: element.Compensation })
        });
        /**Crop details */
        argCrops.forEach(element => {
          this._CompensationModel.Compensation.push({OwnerID: element.SurveyOwnerId,PaymentCategory:"Crop",Amount: element.Compensation })
        });
        /**Tree details */
        argTrees.forEach(element => {
          this._CompensationModel.Compensation.push({OwnerID: element.SurveyOwnerId,PaymentCategory:"Tree",Amount: element.Compensation })
        });

        /**group object by OwnerName & PaymentCategory */
        let obj = {};
        this._CompensationModel.Compensation = this._CompensationModel.Compensation.reduce(function(r, o) 
          {
            let key = o.PaymentCategory + '-' + o.OwnerID;          
            if(!obj[key]) 
              {
                obj[key] = Object.assign({}, o); // copy of o
                r.push(obj[key]);
              } 
            else 
              {             
                obj[key].Amount += o.Amount;
              }
            return r;
          }, []);          
          this._CompensationModel.Compensation = this._CompensationModel.Compensation.sort((a, b) => (a.OwnerID < b.OwnerID ? -1 : 1));//SORTING BY OWNERNAME
          //this.LogText2("this._CompensationModel=>",this._CompensationModel);
          return this._CompensationModel;
      }

    async MapLayerGeoJson()
      {
        /**CS_Point Layer */
        let CS_PointURL = "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=388";
        this._CSPointLayer = await this.UrlToGeoJSON(CS_PointURL)
      
        /**Center_Line Layer */     
        let Center_LineURL = "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=398";   
        this._CenterLineLayer = await this.UrlToGeoJSON(Center_LineURL);

        /**Khasra_Layer Layer */     
        let Khasra_LayerURL = "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=419"; 
        this._KhasraLayer = await this.UrlToGeoJSON(Khasra_LayerURL);


        let Village_LayerURL = "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=401";
        this._VillageLayer = await this.UrlToGeoJSON(Village_LayerURL);

        /**Center_Line Layer */     
        let ROU_LayerURL = "https://bppl.dgdatam.com/api/SurveyDocuments/DownloadAwardAndMutations?documentId=400";
        this._ROULayer = await this.UrlToGeoJSON(ROU_LayerURL);

        // return{
        //   CSPointLayer : JSON.parse(CS_PointLayer),
        //   CenterLineLayer: JSON.parse(Center_LineLayer),
        //   KhasraLayer :JSON.parse(Khasra_Layer),
        //   VillageLayer : JSON.parse(Village_Layer),
        //   ROULayer: JSON.parse(ROU_Layer)
        // }
         
      }


      /**get Geojson data from API url */
      UrlToGeoJSON(argURL)
        {
          return fetch(argURL)
          .then(response => response.json())
          .then(data => {
            let Geodata = JSON.stringify(data);
            return Geodata;  
          });
        }


}