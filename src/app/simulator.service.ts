import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  constructor(private http: HttpClient) {}
  sendData() {
    console.log('calling service');

    this.http
      .get('https://devcloudcartup.xyz/node/dist/sendDataToTelemetryDevice')
      .subscribe(res => {
        // console.log(res);
      });
  }
}
