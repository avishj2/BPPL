import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

   /**
     * This fucntion empty the colelction which binds the dropdown for state/district/tehsil/vilage respectivly based onthe
     * argument.
     * @param argSelection This defines what dropdown has changed. Based on this value below dropdowns will be changed
    */
    ResetDropDowns(argSelection : DropDownChangeEnum , argColl: any[],argParams:any)
    {
        switch(argSelection)
        {
        case DropDownChangeEnum.StateChanged: 
            console.log(argColl)
            argColl = [];
            this.ResetSelectedValue(argSelection,argParams);
            break;
        case DropDownChangeEnum.DistrictChanged: 
            argColl = [];
            this.ResetSelectedValue(argSelection,argParams);
            break;
        case DropDownChangeEnum.TalukaChanged: 
            argColl = [];
            this.ResetSelectedValue(argSelection, argParams);
            break;
        }
    }
    
    ResetSelectedValue(argSelection : DropDownChangeEnum, argParams)
    {
        switch(argSelection)
        {
            case DropDownChangeEnum.StateChanged:
                argParams.District = null;
                argParams.Taluka = null;
                argParams.Village = null;
                break;
            case DropDownChangeEnum.DistrictChanged:
                argParams.Taluka = null;
                argParams.Village = null;
                break;
            case DropDownChangeEnum.TalukaChanged:
                argParams.Village = null;
                break;
        }
    }

    LogText(argText)
    {
      console.log(argText);
    }
}

/**
 * Defines the selection from the dropdown.
 */
 export enum DropDownChangeEnum
 {
    StateChanged = 1,
    DistrictChanged = 2,
    TalukaChanged = 3
 }