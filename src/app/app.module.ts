import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AddProduitDialogComponent,
  ConfirmDialogComponent,
  EditProduitDialogComponent,
  ProduitComponent, ProduitDetailsDialogComponent, ProduitDetailsModalComponent
} from "./produit/produit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent,
    ProduitComponent,
    AddProduitDialogComponent,
    EditProduitDialogComponent,
    ProduitDetailsDialogComponent,
    ConfirmDialogComponent,
    ProduitDetailsModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
