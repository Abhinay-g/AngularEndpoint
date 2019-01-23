import { Component, OnInit } from '@angular/core';
import { SimulatorService } from '../simulator.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY =
    'BAonEp9mCq5JkdVC8zK9lPZDhHeFaeDLel1OFUzgOGOW7cTVscv8w9l8KQSgqhBBX0s6_oaz8ROyOxPg9IntTtc';
  constructor(private swPush: SwPush, private _simulator: SimulatorService) {}

  ngOnInit() {}

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => this._simulator.addPushSubscriber(sub).subscribe())
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
