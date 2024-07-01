import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'maps-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML map no fue encontrado';

    const map = new Map({
      container: this.divMap!.nativeElement, // container ID  -- no deberia usarse con el id del div, ya veremos como arreglarlo
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-3.668081, 40.501955], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }

}
