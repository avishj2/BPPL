/**pre-Engineering category datamodel */
export class CategoryDataModel{
    Categories :CategoryColl[];

ReadFromString()
    {
    let data = [
            {
                CategoryName :"Project Wise Report",
                CategoryID : 1
            },
            {
                CategoryName :"Aligment Sheet",
                CategoryID : 2
            },
            {
                CategoryName :"Award and Mutation Entry",
                CategoryID : 3
            }
        ];
        this.Categories =  JSON.parse(JSON.stringify(data));
    }
}

export class CategoryColl{
    CategoryName :string;
    CategoryID : any;
}

/**AGI/Terminals details */
export class AGITerminalsDataModel{
    AGITerminalsDetails : AGITerminalsDetails;

   constructor(){
       this.AGITerminalsDetails = new AGITerminalsDetails();
   }
}
export class AGITerminalsDetails{
    AGIStationNo : any;//searchdropdown
    OwnerName: string; //searchdropdown
    SurveyNo : any;//searchdropdown
    AGITerminalsName : string;
    Chainage : any;
    PlotSizeInMeter:any;
    TypesOfland : string;//classificationofland
    DLCIrrigated :boolean;
    OwnerNameCount :any;
    SubRegisterIrrigated :boolean;
    SubRegisterNonIrrigated : boolean;
    RateExpectedByFarmer: any;
    MapWithDetailsFromTalhati :any;
    Remarks : string;
    ConstructionStartDate : any;
    ConstructionEndDate : any;
    Registry : boolean;
    From7upon12 : boolean;
    From8A : boolean;
    FromNo6: boolean;
    DLCYantri: boolean;
    DILRSurvey : boolean;
    FiveyrsSaledeed:  boolean;
    Notice63AA : boolean;
    Notice65BB: boolean;
    PanchanammaForAVillage : boolean;
    NegociationwithVillage: boolean;
    PanchanammaForMarketValue : boolean;
    MiscDetails : boolean;

}

