import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ProduitComponent} from "./produit/produit.component";

const routes: Routes = [
  {
    path: 'produit',
    component: ProduitComponent,
  },
  {
    path: '',
    redirectTo: 'produit',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
