export class DropdownDataModel{
  Jurisdiction : any;
  Section : any;
  ChainageTo : any;
  ChainageFrom : any;
  State : any;
  District : any;
  Taluka : any;
  Village : any;
  SurveyNumber : any;

  constructor(){

  }
}
/**get all states details from api, data model */
export class StateDataModel{
  StateDataColl :  StateDataColl[];
  
  constructor(){
    this.StateDataColl =[];
  }
}
export class StateDataColl{
  StateId  : any;
  Name : string;
}  