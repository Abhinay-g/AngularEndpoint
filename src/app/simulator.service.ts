import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  constructor(private http: HttpClient) {}
  sendData() {
    console.log('calling service');

    this.http.get('http://52.229.8.80:3000/users').subscribe(res => {
      // console.log(res);
    });
  }
}
