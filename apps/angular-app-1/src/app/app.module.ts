import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import {
  AddProduitDialogComponent, ConfirmDialogComponent,
  EditProduitDialogComponent,
  Produit1Component,
  ProduitDetailsDialogComponent
} from './produit1/produit1.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, Produit1Component, AddProduitDialogComponent,
    EditProduitDialogComponent,
    ProduitDetailsDialogComponent,
    ConfirmDialogComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
