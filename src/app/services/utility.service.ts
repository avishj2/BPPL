import { Injectable } from '@angular/core';
import { SearchCriteria } from 'src/app/Model/Filters.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

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

}