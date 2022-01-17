import { Injectable, Type } from '@angular/core';
import { NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor(private modalService: NgbModal) 
  {

   }
  
   /**
    * This function will open the pop up based on the input parameters
    * @param content Componenet type name
    * @param argNgbModalOptions ngModel options. Like : Size, OUter click disable etc
    * @param argDTO Data to be sent in the child component
    * @param argCallBack SuccessCall back function in the parent component.
    * @param argDismiss Dismiss call back function in the parent component.
    */
   ShowPopUP<T>(content : T,argNgbModalOptions : NgbModalOptions, argDTO : any, argCallBack= (arg) => {},
   argDismiss= (arg) => {})   
   {
    const modalRef = this.modalService.open(content,argNgbModalOptions);
    /**Model function */
    modalRef.componentInstance.fromParent = argDTO;
    modalRef.result.then((result) => {
      /**model pop-up model data retun if model successfully submitted */
      if(argCallBack)
      {
         argCallBack(result);        
      }
    }, (reason) => {
      if(argDismiss)
      {
          argDismiss(reason);
          //console.log('Dismissed action: ' + reason);
      }
    });
   }
}
