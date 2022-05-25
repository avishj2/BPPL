import {BaseResponse, CommonDropdownModel,CommonDocDataModel} from './Base.model';

export class UserRespDataModel extends BaseResponse 
    {
        Result : UserDataModel[];
        constructor(){      
        super();
        this.Result = [];
        }
    }
export class PasswordUpdateRespModel extends BaseResponse 
    {
        Result : UserDataModel;
        constructor(){      
        super();
        this.Result = new UserDataModel();
        }
    }

export class UserDataModel
    {
        UserId: any;
        Email: string;
        UserGuid: string;
        FName: string;
        LName: string;
        UserName: string;
        PhNo: string;
        Status: any;
        Password: string;

        public CloneData(argData)
            {
                let l_UserDataModel = new UserDataModel();
                l_UserDataModel.UserId = argData.UserId;
                l_UserDataModel.Email = argData.Email;
                l_UserDataModel.UserGuid = argData.UserGuid;
                l_UserDataModel.FName = argData.FName;
                l_UserDataModel.LName = argData.LName;
                l_UserDataModel.UserName = argData.UserName;
                l_UserDataModel.PhNo = argData.PhNo;
                l_UserDataModel.Status = argData.Status;
                l_UserDataModel.Password = argData.Password;
                return l_UserDataModel;
            }
    }

export class RoleRespDataModel extends BaseResponse 
    {
        Result : RoleDataModel[];
        
        constructor(){      
        super();
        this.Result = [];
        }
    }

export class RoleDataModel
    {
        UserRoleId: any;
        UserId: any;
        RoleId: any;
        RoleName: string;
    }

export class UserDropdownsModel{
    UserStatus : CommonDropdownModel[];
    UserRoles : CommonDropdownModel[];

    constructor()
        {
            this.UserStatus = [];
            this.UserRoles = [];
        }
}