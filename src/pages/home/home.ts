import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

declare var google;

/**
 * https://developers.google.com/maps/documentation/javascript/directions
 */
@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  endPosition: any;
  originPosition: string;
  destinationPosition: string;

  constructor() { }

  ionViewDidLoad() {
    this.initializeMap();
  }

  initializeMap() {
    this.startPosition = new google.maps.LatLng(-22.906344, -43.133293);
    this.endPosition = new google.maps.LatLng(-22.896703, -43.125275);

    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);

    const markerStart = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });

    const markerEnd = new google.maps.Marker({
      position: this.endPosition,
      map: this.map,
    });

    this.calculateRoute();
  }

  calculateRoute() {
    if (this.startPosition && this.endPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.startPosition,
        destination: this.endPosition,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }
}
