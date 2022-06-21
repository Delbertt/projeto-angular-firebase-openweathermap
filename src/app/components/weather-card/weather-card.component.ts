import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utils/services/auth.service';
import { OpenWeatherAPIService } from 'src/app/utils/services/open-weather-api.service';


@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  weatherInfo : any;

  ready : Boolean = false;
  positionError : String = '';

  constructor(public authService: AuthService, public weatherService : OpenWeatherAPIService) { }

  ngOnInit(): void {
    this.getWeatherAPI();
   }

  getWeatherAPI() : void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.weatherService
      .getClima(position.coords.latitude, position.coords.longitude)
      .subscribe((result) => {
        this.weatherInfo = result;
      })
    }, (error) => {
      let message : String;
      // https://developer.mozilla.org/pt-BR/docs/Web/API/GeolocationPositionError
      switch(error.code) {
        case 1: this.positionError = 
           'Não foi possível obter a informação sobre geolocalização por que a página não possuía permissão para fazê-lo.'; break;
        case 2: this.positionError = 
           'A obtenção da geolocalização falhou por que pelo menos uma fonte interna de posicionamento retornou um erro interno.'; break;
        case 3: this.positionError = 
           'O tempo máximo permitido para obter a geolocalização foi atingido antes de se obter a informação.'; break;
      } 
    });
    this.ready = true;
  }
}
