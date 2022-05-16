import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  
  getItme(id: any){
    return JSON.parse(localStorage.getItem(id) || '[]');
  }

  setItem(id: any,data: any){
    localStorage.setItem(id, JSON.stringify(data));
  }
}
