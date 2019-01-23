import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  subscribed = false;
  constructor(private http: HttpClient) {}
  sendData() {
    console.log('calling service');

    // this.http
    //   .get('https://devcloudcartup.xyz/node/dist/sendDataToTelemetryDevice')
    //   .subscribe(res => {
    //     // console.log(res);
    //   });
    this.http.get('http://52.229.8.80:8085/users').subscribe(res => {
      // console.log(res);
    });
  }

  addPushSubscriber(sub: any) {
    console.log(sub);

    // return this.http.post('http://localhost:3000/users/newsletter', sub);
    // return this.http.post('http://52.229.8.80:8085/users/newsletter', sub);
    return this.http.post(
      'https://cloudcartup.xyz/node/NodeEndpoint/users/newsletter',
      sub
    );
  }

  sendAccelerationData(acceleration: string) {
    console.log('calling service');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(
      // 'http://localhost:3000/users/sendAcceleration',
      // 'http://52.229.8.80:8085/users/sendAcceleration',
      'https://cloudcartup.xyz/node/NodeEndpoint/users/sendAcceleration',
      { acceleration: acceleration },
      httpOptions
    );
  }
}
// 'http://52.229.8.80:8085/users/sendAcceleration',
// 'http://localhost:3000/users/sendAcceleration',
// https://cloudcartup.xyz/node/NodeEndpoint/users
