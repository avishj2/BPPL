/**
 * This class will only have common model classes with properties only !
 * There shall be no dependencies on any class to avoid any circular dependency
 */

export class BaseModel
{

}

export class LoginModel extends BaseModel
{
    /**
     *
     */
    constructor() {
        super();
        this.TokenDetails = null;
    }

    UserName : any;
    Password : any;
    IMEI : any;
    AccessType : any;
    TokenDetails : string;
    grant_type : string = "password";
    /**
     * OTP Token signifies whether the Phone/app has been verified by sending OTP to the users phone.
     * If OTP is not available or returned invalid OTP from API then sending OTP screen will show up.
     */
    OTPToken : string
}


export class WelcomeModel
{
    Message : string;
    HasMessage: boolean;
    AppVersion: string;
    DoNotLetAppProceedFurther: boolean;
    UserName: string;
    EmpID: string;
}

export class UserLocation
{
    ID : any;
    Lat : any;
    Long : any;
    UserID : any;
    ProjectID : any;
    GeometryWKT : any;
    CreatedBy : string;
    /**
     *
     */
    constructor() {
        this.ProjectID = 2; // Recon - Not required in here        
    }
}

export class UserLocationModel
{
    UserLocation : UserLocation;
    /**
     *
     */
    constructor() {
        this.UserLocation = new UserLocation();
    }
}

export class OTPConfiguration
    {
        TimerDuration : any;
        ShowHexAlert : boolean;
    }

export class UserModelData{
        UserName: string;
    }

export class ConfigModel
    {
        UserModel : UserModelData;
       
constructor() {
    this.UserModel= new UserModelData();
    
    }
}

/** This is common dropdowndown class ,but dulicated
 *  in ams rectification and notice distribution
 * 
*/
export class CommonDropdownModel{
    Disabled: boolean;
    Selected: boolean;
    Text: string;
    Value: any
}

/***show dropdown menu based on the role in the navigation bar */
export class GetRolesDataModel{
    UserID : string;
    Roles : string[];

    constructor(){
        this.Roles = [];
    }

}

