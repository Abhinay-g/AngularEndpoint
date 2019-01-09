import { Component, OnInit } from '@angular/core';
import { SimulatorService } from './simulator.service';

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
  /**
   *
   */
  constructor(private _simulator: SimulatorService) {}
  ngOnInit() {
    window.addEventListener('devicemotion', event => {
      console.log('event triggered');

      this.acceleration_x = event.acceleration.x + ' m/s2';
      this.acceleration_y = event.acceleration.y + ' m/s2';
      this.acceleration_z = event.acceleration.z + ' m/s2';
      this._simulator.sendData();
    });
  }
}
