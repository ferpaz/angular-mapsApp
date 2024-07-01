import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlainMarker {
  lngLat: number[];
  color: string;
}

@Component({
  selector: 'maps-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public markers: MarkerAndColor[] = [];

  private _defaultZoomValue: number = 14;
  private _initalLngLat: LngLat = new LngLat(-3.668081, 40.501955);

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  ngOnDestroy(): void {
    // Esto destruye el mapa y remueve los listeners para evitar memory leaks
    this.map?.remove();
  }

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML map no fue encontrado';

    this.map = new Map({
      container: this.divMap!.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this._initalLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.map.on('move', () => {
      const { lng, lat } = this.map!.getCenter();
      this._initalLngLat = new LngLat(lng, lat);
      this.saveToLocalStorage();
    });

    if (this.markers.length > 0) {
      this.markers.forEach( ({ marker }) => {
        marker.addTo(this.map!);
      });
    }
  }

  createMarker() {
    if(!this.map) throw 'Error mapa no inicializado';

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color).addTo(this.map);
  }

  addMarker( lngLat: LngLat, color: string ): Marker {
    const marker = new Marker(
      {
        color: color,
        draggable: true,
      })
      .setLngLat(lngLat);

    this.markers.push({ marker, color });
    this.saveToLocalStorage();

    marker.on('drag', () => {
      console.log(marker.getLngLat());
      this.saveToLocalStorage();
    });

    return marker;
  }

  deleteMarker( index: number ) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);

    this.saveToLocalStorage();
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({ center: marker.getLngLat(), zoom: this._defaultZoomValue });
  }

  loadFromLocalStorage() {
    const initialLngLatArray = JSON.parse(localStorage.getItem('initialLngLat') ?? '[]');
    if (initialLngLatArray.length == 2) this._initalLngLat = new LngLat(initialLngLatArray[0], initialLngLatArray[1]);

    const plainMarkers = JSON.parse(localStorage.getItem('markers') ?? '[]');

    plainMarkers.forEach( (m: PlainMarker) => {
      const [lng, lat] = m.lngLat;
      this.addMarker(new LngLat(lng, lat), m.color);
    });
  }

  saveToLocalStorage() {
    const plainMarkers : PlainMarker[] = this.markers.map( ({ color, marker }) => ({
      lngLat: marker.getLngLat().toArray(),
      color: color,
    }));

    localStorage.setItem('markers', JSON.stringify(plainMarkers));
    localStorage.setItem('initialLngLat', JSON.stringify(this._initalLngLat.toArray()));
  }

  invertColor(hex : string) {
      if (hex.indexOf('#') === 0) {
          hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
          throw new Error('Invalid HEX color.');
      }
      // invert color components
      var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
          g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
          b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
      // pad each with zeros and return
      return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  private padZero(str: string, len: number | undefined = 2) {
      len = len || 2;
      var zeros = new Array(len).join('0');
      return (zeros + str).slice(-len);
  }
}
