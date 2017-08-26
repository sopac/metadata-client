import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import { FormsModule } from '@angular/forms';
import {MetadataService} from "./metadata.service";

import {PanelModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DataScrollerModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    DataScrollerModule,
    DialogModule,
    InputTextModule,
  ],
  providers: [MetadataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
