import { Injectable } from '@angular/core';
import { SearchCriteria} from 'src/app/Model/Filters.model';
import {AdHocPaymentModel} from 'src/app/Model/Adhoc.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Common Datat Transfer Object service to store state data and page all the pages
 */
 export class CommonDtoService {
    constructor() { }

    _SearchCriteriaDTO : SearchCriteria;
    _AdHocPaymentDataDTO : AdHocPaymentModel;

 }