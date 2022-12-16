import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventoService } from './services/evento.service';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';




@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    NavComponent,
    DateTimeFormatPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    FontAwesomeModule
  ],
  providers: [EventoService],
  bootstrap: [AppComponent],
})
export class AppModule { }
