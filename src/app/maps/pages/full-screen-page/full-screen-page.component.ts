import { AfterViewInit, Component } from '@angular/core';
import mapboxgl from 'mapbox-gl';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'maps-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: 'map', // container ID  -- no deberia usarse con el id del div, ya veremos como arreglarlo
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-3.668081, 40.501955], // starting position [lng, lat]
      zoom: 14, // starting zoom
      accessToken: environment.mapbox_key, // Mapbox token
    });
  }

}
