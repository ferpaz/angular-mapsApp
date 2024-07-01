import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'maps-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public zoomValue: number = 14;

  public lngLat: LngLat = new LngLat(-3.668081, 40.501955);

  ngOnDestroy(): void {
    // Esto destruye el mapa y remueve los listeners para evitar memory leaks
    this.map?.remove();
  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML map no fue encontrado';

    this.map = new Map({
      container: this.divMap!.nativeElement, // container ID  -- no deberia usarse con el id del div, ya veremos como arreglarlo
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoomValue, // starting zoom

    });

    this.mapListeners();
  }

  zoom( value: any): void {
    this.map!.zoomTo(Number(value));
  }

  zoomOut(): void {
    this.map!.zoomOut();
    this.zoomValue = this.map!.getZoom();
  }

  zoomIn(): void {
    this.map!.zoomIn();
    this.zoomValue = this.map!.getZoom();
  }

  mapListeners() : void {
    if (!this.map) throw 'Error mapa no inicializado';

    this.map.on('zoom', () => {
      this.zoomValue = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() > 18) {
        this.map!.zoomTo(18);
      }
    });

    this.map.on('move', (event) => {
      this.lngLat = this.map!.getCenter();
    });
  }
}
