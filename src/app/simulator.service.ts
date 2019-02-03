import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { OnlineOfflineService } from './online-offline.service';
import Dexie from 'dexie';
import { UUID } from 'angular2-uuid';
import { Acceleration } from './models/acceleration';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  subscribed = false;
  indexDb: any;
  constructor(
    private http: HttpClient,
    private readonly onlineOfflineService: OnlineOfflineService
  ) {
    this.registerOfflineOnlineEvent();
    this.createDatabase();
  }

  sendRandomAcceleration(data: Acceleration) {
    if (this.onlineOfflineService.isOnline) {
      this.sendtoConsole(data);
      // console.log(data);
    } else {
      this.sendToIndexDb(data);
      // console.log(data);
    }
  }
  sendtoConsole(data: Acceleration) {
    console.log(data);
  }
  sendToIndexDb(data: Acceleration) {
    // console.log(data);
    data.id = UUID.UUID();
    this.indexDb.acceleration
      .add(data)
      .then(async () => {
        const allItems = await this.indexDb.acceleration.toArray();
        console.log('Data Stored to index db ', allItems);
      })
      .catch(e => {
        console.log('error while inserting data ', e);
      });
  }

  uploadDataIndexDb() {
    // upload data from index db
  }
  createDatabase() {
    this.indexDb = new Dexie('AngularEndpointDB');
    this.indexDb.version(1).stores({
      acceleration: 'id,acceleration'
    });
  }
  registerOfflineOnlineEvent() {
    this.onlineOfflineService.connectionChanged.subscribe(res => {
      if (res) {
        console.log('online');
        this.uploadDataIndexDb();
      } else {
        console.log('offline');
      }
    });
  }
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

    // return this.http.post(
    //   // 'http://localhost:3000/users/sendAcceleration',
    //   // 'http://52.229.8.80:8085/users/sendAcceleration',
    //   'https://cloudcartup.xyz/node/NodeEndpoint/users/sendAcceleration',
    //   { acceleration: acceleration },
    //   httpOptions
    // );

    return of('data sent successfully');
  }
}
// 'http://52.229.8.80:8085/users/sendAcceleration',
// 'http://localhost:3000/users/sendAcceleration',
// https://cloudcartup.xyz/node/NodeEndpoint/users
