import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  constructor(private http: HttpClient) {}
  sendData() {
    console.log('calling service');

    // this.http
    //   .get('https://devcloudcartup.xyz/node/dist/sendDataToTelemetryDevice')
    //   .subscribe(res => {
    //     // console.log(res);
    //   });
    this.http
      .get('https://52.229.8.80:3000')
      .subscribe(res => {
        // console.log(res);
      });
  }
}
