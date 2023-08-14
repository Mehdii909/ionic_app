import { Component } from '@angular/core';
import {ProduitComponent} from "./produit/produit.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  protected readonly ProduitComponent = ProduitComponent;
}
