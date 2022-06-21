import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherComponent } from './views/weather/weather.component';
import { LoginComponent } from './views/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './utils/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { OpenWeatherAPIService } from './utils/services/open-weather-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    WeatherCardComponent,
    WeatherComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
  ],
  providers: [AuthService, OpenWeatherAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
