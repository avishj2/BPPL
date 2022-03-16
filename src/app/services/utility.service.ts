import { Injectable } from '@angular/core';

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

}