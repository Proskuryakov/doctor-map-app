import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPage } from './routed/pages/main/main.page';
import { MainComponent } from './routed/components/main/main.component';
import { MapComponent } from './routed/components/map/map.component';
import { MapPage } from './routed/pages/map/map.page';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    MainComponent,
    MapComponent,
    MapPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
