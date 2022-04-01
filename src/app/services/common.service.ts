import { Injectable } from '@angular/core';
//import { NgxSpinnerService } from "ngx-spinner";
import { AlertsService } from 'angular-alert-module';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
    providedIn: 'root'
  })

/**
 * All common services like alert, toast and loading related functions
 */
 export class CommonService {
    public loading;
    public alertInfo;
    public actionSheet;
    public toast;
    // tslint:disable-next-line: variable-name
    validation_msg: any;
    
  
    constructor(
      private spinner: NgxSpinnerService,
      //public loadingCtrl: LoadingController,
      //private alertCtrl: AlertController,
      //public toastCtrl: ToastController,
      private alerts: AlertsService,
      //private toastr: ToastrService,
     // private loaderService: LoaderService
    ) {
      this.validation_msg = {
        required: ' is required.',
        pattern: ' not having valid pattern.',
        minlength: ' not having minlength',
        maxlength: ' not having maxlength'
      };
    }
  
    /**
     * function for showing alert box and confirm box
     * @param message Alert message 
     * @param title Alert title
     * @param buttontxt Alert button text
     * @param handler Alert button ok button pressed callback
     * @param cancelButton case of confirm box cancel button text
     * @param cancelHandler cancel button confimr box callback 
     * @param cssClass Alert botton css class name
     */
    // tslint:disable-next-line: max-line-length
    public async showAlert(message: string = '', title: string = '', buttontxt = 'Ok', handler = () => { }, cancelButton: any = '', cancelHandler = () => { }, cssClass: any = '') {
      if (this.alertInfo) {
        await this.alertInfo.dismiss().catch((e) => {
          console.log(e);
        });
      }
      const ttl = (title);
      const msg = (message);
      const btnOk = (buttontxt);
      const btnCancel = (cancelButton);
  
      const buttonsArr = [{
        text: btnOk,
        handler
      }];
  
      if (cancelButton !== '') {
        buttonsArr.push({
          text: btnCancel,
          handler: cancelHandler
        });
      }
      this.alertInfo = await this.alertInfo.create({
        header: title ? ttl : 'AMS',
        subHeader: msg,
        message: '',
        cssClass,
        backdropDismiss: false,
        buttons: buttonsArr
      });
      await this.alertInfo.present();
  
    }
  
  /**
   *  Function for showing loading
   * @param options extra parms for loading in object form
   */
    public async showLoading(options = {}) {
      if (this.loading) {
        await this.loading.dismiss().catch((e) => {
          console.log(e);
        });
      }
      //this.loading = await this.loaderService.create(options);
      //const loadingPresent = await this.loading.present();
      // if (!this.loading) {
      //   await loadingPresent.dismiss()
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // }
    }
  /**
   * function for hide spinner loader in angular website
   */
  public hideSpinnerLoading()
      {
        this.spinner.hide();
          // setTimeout(() => 
          // {
          //   // spinner ends after 5 seconds 
          //   this.spinner.hide();
          // }, 100);
      }
  
    /**
   * function for show spinner loader in angular website
   */
  public ShowSpinnerLoading()
    {
      this.spinner.show();//show loader 
    }
  

  public ShowSpinner(){
      this.spinner.show();//show loader 
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
  }
  
  /**
   * function for hide loading
   */
    public async hideLoading() {
      if (this.loading !== '' && this.loading !== undefined) {
        await this.loading.dismiss()
          .catch(() => console.log('loader was not dismissed'));
        this.loading = '';
      }
    }
  /**
   * function for hide toast
   */
    public async hideToast() {
      if (this.toast) {
        await this.toast.dismiss().catch((e) => {
          console.log(e);
        });
      }
    }
  /**
   * Function for showing toast
   * @param message toast message
   * @param duration toast duration to hide auto loading in ms 
   * @param color toast color
   * @param position toast postion bottom|middle|top
   * @param showCloseBtn true, if want to show close button in toast
   */
    // public async presentToast(message, duration?: number, color: string = 'dark', position?: any, showCloseBtn: boolean = false) {
    //   if (message) { // color : dark, danger
    //     if (this.toast) {
    //       await this.toast.dismiss().catch((e) => {
    //         console.log(e);
    //       });
    //     }
    //     const msg = (message);
  
    //     this.toast = await this.toastr.success(
    //       msg
    //       // duration: duration ? duration : 2000,
    //       // cssClass: 'toastcustome',
    //       // color,
    //      // showCloseButton: showCloseBtn ? showCloseBtn : false,
    //      // closeButtonText: ('Ok'),
    //       // position: position ? position : 'top'   // "top", "middle", "bottom",
    //     );
    //     // await this.toast.onDidDismiss(() => {
    //     // console.log('Dismissed toast');
    //     // });
    //     await this.toast.present();
    //   }
    // }
    
    /**
     * function for validate formBuilder form
     * @param form form FormGroup
     * @param msg message object with field name, validation type and custome message
     */
    public validation(form, msg: any = '') {
      if (form.valid) {
        return true;
      }
      // tslint:disable-next-line: forin
      outer: for (const field in form.controls) {
        const control = form.get(field);
        if (control && (control.dirty || !control.valid)) {
          // tslint:disable-next-line: triple-equals
          if (msg != '') {
            const messages = msg[field];
            // tslint:disable-next-line: forin
            for (const key in control.errors) {
              if (messages[key]) {
                this.showAlert(messages[key]);
              } else {
                this.showAlert('Field have error:- ' + key);
              }
              break outer;
            }
          } else {
            // tslint:disable-next-line: forin
            for (const key in control.errors) {
              const messages = this.validation_msg[key];
              if (messages) {
                this.showAlert(field + messages);
              } else {
                this.showAlert('Field have error:- ' + key);
              }
              break outer;
            }
          }
        }
      }
    }
  
  
  }
