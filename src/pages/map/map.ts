import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import moment from 'moment';

declare var google;

/**
 * Para obter a chave
 * https://developers.google.com/maps/documentation/static-maps/get-api-key?hl=pt-br
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  origem: any;
  destino: any;
  inicioTimer: number;

  constructor(public toastController: ToastController) { }

  ionViewDidLoad() {
    this.inicioTimer = moment().valueOf();
    this.initializeMap();
    this.calculateRoute();
  }

  initializeMap() {
    // Roraima
    this.origem = new google.maps.LatLng(2.8235, -60.6758);
    // Porto Alegre
    this.destino = new google.maps.LatLng(-30.0277, -51.2287);
    

    const mapOptions = {
      zoom: 12,
      // zoom: 1,
      center: this.origem,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);
  }

  calculateRoute() {
    if (this.origem && this.destino) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.origem,
        destination: this.destino,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
      this.showToast();
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

  showToast() {
    const toast = this.toastController.create({
      message: (moment().valueOf() - this.inicioTimer) + "ms"
    });
    toast.present();
  }
}
