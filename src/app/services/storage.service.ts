import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Storage permanent data
 */
export class StorageService {

  constructor() { }


  /**
   * This for set the localstorage for the object
   * @param key : storage key
   * @param value : Its value it can be string or array
   */
  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * This for get the value from the storage key as object
   * @param key : Key which we need to get from the storage
   */
  public get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  /**
   * This for remove the storage key
   * @param key : Key which we need to remove from the storage
   */
  public remove(key: string) {
    localStorage.removeItem(key);
  }
  /**
   * clear local storage data
   */
  public clear() {
    localStorage.clear();
  }

}
