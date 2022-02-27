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

}