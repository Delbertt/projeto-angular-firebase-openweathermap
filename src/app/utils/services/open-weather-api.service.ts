import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherAPIService {

  //https://openweathermap.org/api/one-call-3#how
  apiKey : String = environment.weatherApiKey;
  apiUrl : String = 'https://api.openweathermap.org/data/2.5/weather';
  lang   : String = 'pt_br' 

  constructor(public httpClient: HttpClient) { }

  getClima(lat : Number, lon : Number) {
    return this.httpClient.get(
      this.apiUrl + `?lat=${lat}&lon=${lon}&appid=${this.apiKey}&lang=${this.lang}`);
  }

}
