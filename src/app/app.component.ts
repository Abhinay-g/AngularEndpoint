import { Component, OnInit } from '@angular/core';
import { SimulatorService } from './simulator.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularEndpoint';
  acceleration_x: any = 0;
  acceleration_y: any = 0;
  acceleration_z: any = 0;
  totalAcceleration: any = 0;
  readonly VAPID_PUBLIC_KEY =
    'BAonEp9mCq5JkdVC8zK9lPZDhHeFaeDLel1OFUzgOGOW7cTVscv8w9l8KQSgqhBBX0s6_oaz8ROyOxPg9IntTtc';
  subscribed = false;
  /**
   *
   */
  constructor(private swPush: SwPush, private _simulator: SimulatorService) {}
  ngOnInit() {
    console.log('subscribed', this.subscribed);
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {
        console.log(sub);
        this._simulator.addPushSubscriber(sub).subscribe(res => {
          // console.log('hala lua ');
          this.subscribed = true; //  flag for subscription
          this.attachEventlistner();
        });
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  attachEventlistner() {
    console.log('callling attach event listner');

    window.addEventListener('devicemotion', event => {
      console.log('event triggered');
      this.acceleration_x = event.acceleration.x + ' m/s2';
      this.acceleration_y = event.acceleration.y + ' m/s2';
      this.acceleration_z = event.acceleration.z + ' m/s2';
      const avgAcceleration = Math.sqrt(
        Math.pow(event.acceleration.x, 2) +
          Math.pow(event.acceleration.y, 2) +
          Math.pow(event.acceleration.z, 2)
      );
      // this._simulator.sendAccelerationData('98').subscribe(res => {
      //   console.log(res);
      // });
      if (Math.abs(this.totalAcceleration - avgAcceleration) > 0.5) {
        this.totalAcceleration = avgAcceleration;
        console.log('calling send accelerate method ');
        this._simulator
          .sendAccelerationData(this.totalAcceleration)
          .subscribe(res => {
            console.log(res);
          });
      }
    });
  }
}
