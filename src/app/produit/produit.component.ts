import { Component, Input, OnInit } from '@angular/core';
import { Produit } from '../model/ProduitModel';
import { ProduitService } from '../service/produit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertController, ModalController, NavController} from '@ionic/angular'; // Importer ModalController
import { NavParams } from '@ionic/angular'; // Importer NavParams

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss'],
})
export class ProduitComponent implements OnInit {
  produits: Produit[] = [];
  filteredData: Produit[] = [];
  searchText = '';

  constructor(
    private produitService: ProduitService,
    private modalController: ModalController, // Utiliser ModalController
    private alertController: AlertController // Ajoutez cette ligne
  ) {}

  onSearchChange() {
    this.filteredData = [];

    if (!this.searchText) {
      this.filteredData = this.produits;
      return;
    }

    this.filteredData = this.produits.filter((item) => {
      const fullSearch = `${item.nom}`.toLowerCase();
      return fullSearch.includes(this.searchText.toLowerCase());
    });
  }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getAllProduits().subscribe((data: Produit[]) => {
      this.produits = data;
      this.filteredData = data;
    });
  }

  async deleteProduit(produitId: number): Promise<void> {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmer la suppression',
      message: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annuler');
          },
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.produitService.deleteProduit(produitId).subscribe(() => {
              this.loadProduits();
            });
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  async openAddDialog(): Promise<void> {
    const addProduitModal = await this.modalController.create({
      component: AddProduitDialogComponent,
    });

    addProduitModal.present();

    addProduitModal.onDidDismiss().then((result) => {
      if (result.data) {
        this.produitService.addProduit(result.data).subscribe(() => {
          this.loadProduits();
          this.showSuccessMessage('Produit ajouté avec succès'); // Appel de la fonction pour afficher le message
        });
      }
    });
  }

// Ajoutez cette fonction pour afficher le message de succès
  async showSuccessMessage(message: string): Promise<void> {
    const successAlert = await this.alertController.create({
      header: 'Succès',
      message,
      buttons: ['OK'],
    });

    await successAlert.present();
  }

  async openEditDialog1(
    id: number,
  ): Promise<void> {
    const selectedProduit = this.produits.find((produit) => produit.id === id);

    const editProduitModal = await this.modalController.create({
      component: EditProduitDialogComponent,
      componentProps: { produit: selectedProduit },
    });

    editProduitModal.present();

    editProduitModal.onDidDismiss().then((result) => {
      if (result.data) {
        this.produitService.updateProduit(result.data.id, result.data).subscribe(() => {
          this.loadProduits();
        });
      }
    });
  }

  async openEditDialog(id: number): Promise<void> {
    const selectedProduit = this.produits.find((produit) => produit.id === id);
    console.log('id:',selectedProduit?.id);
    console.log('prod:',selectedProduit);

    if (!selectedProduit) {
      // Handle the case where the selected product is not found
      return;
    }

    const editProduitModal = await this.modalController.create({
      component: EditProduitDialogComponent,
      componentProps: { produit: selectedProduit },
    });

    editProduitModal.present();

    editProduitModal.onDidDismiss().then((result) => {
      if (result.data) {
        this.produitService.updateProduit(result.data.id, result.data).subscribe(() => {
          this.loadProduits();
          console.log('id:',result.data.id);
          console.log('prod:',result.data);

          // Show a success alert message here
          this.presentSuccessAlert('Modification réussie !');
        });
      }
    });
  }

  async presentSuccessAlert(message: string): Promise<void> {
    const successAlert = await this.alertController.create({
      header: 'Succès',
      message,
      buttons: ['OK'],
    });

    await successAlert.present();
  }

  // async afficherProduit1(id: number): Promise<void> {
  //   const selectedProduit = this.produits.find((produit) => produit.id === id);
  //
  //   const produitDetailsModal = await this.modalController.create({
  //     component: ProduitDetailsDialogComponent,
  //     componentProps: { produit: selectedProduit },
  //   });
  //
  //   produitDetailsModal.present();
  // }
  async afficherProduit(id: number): Promise<void> {
    const selectedProduit = this.produits.find((produit) => produit.id === id);

    const produitDetailsModal = await this.modalController.create({
      component: ProduitDetailsModalComponent,
      componentProps: { produit: selectedProduit },
    });

    produitDetailsModal.present();
  }
}

@Component({
  selector: 'app-produit-details-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Détails du produit</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">Fermer</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label><strong>Nom :</strong> {{ produit.nom }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label><strong>Prix unitaire :</strong> {{ produit.prixUnitaire }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-label><strong>Quantité :</strong> {{ produit.quantite }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
})
export class ProduitDetailsModalComponent {
  // @ts-ignore
  @Input() produit: Produit;

  constructor(private modalController: ModalController) {}

  dismissModal(): void {
    this.modalController.dismiss();
  }
}
@Component({
  selector: 'app-add-produit-dialog',
  templateUrl: './add-produit-dialog.component.html',
  styleUrls: ['./produit.component.scss'],
})
export class AddProduitDialogComponent implements OnInit {
  // @ts-ignore
  addProduitForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addProduitForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prixUnitaire: ['', Validators.required],
      quantite: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addProduitForm.valid) {
      const produit = {
        nom: this.addProduitForm.value.nom,
        prixUnitaire: this.addProduitForm.value.prixUnitaire,
        quantite: this.addProduitForm.value.quantite,
      };
      this.modalController.dismiss(produit);
    }
  }

  dismissModal(): void {
    this.modalController.dismiss(); // Close the modal without adding a product
  }
}

@Component({
  selector: 'app-edit-produit-dialog',
  templateUrl: './edit-produit-dialog.component.html',
  styleUrls: ['./produit.component.scss'],
})
export class EditProduitDialogComponent implements OnInit {
  // @ts-ignore
  editProduitForm: FormGroup;
  // @ts-ignore
  @Input() produit: Produit;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController

  ) {}

  ngOnInit(): void {
    this.editProduitForm = this.formBuilder.group({
      nom: [this.produit.nom, Validators.required],
      prixUnitaire: [this.produit.prixUnitaire, Validators.required],
      quantite: [this.produit.quantite, Validators.required],
    });
  }

  async onSubmit() {
    if (this.editProduitForm.valid) {
      const confirmDialog = await this.alertController.create({
        header: 'Confirmer la modification',
        message: 'Êtes-vous sûr de vouloir modifier ce produit ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Confirmer',
            handler: async () => {
              const produit = {
                id: this.produit.id,
                nom: this.editProduitForm.value.nom,
                prixUnitaire: this.editProduitForm.value.prixUnitaire,
                quantite: this.editProduitForm.value.quantite,
              };

              this.modalController.dismiss(produit);

            },
          },
        ],
      });

      await confirmDialog.present();
    }
  }

  dismissModal(): void {
    this.modalController.dismiss(); // Close the modal without adding a product
  }
}

@Component({
  selector: 'app-produit-details-dialog',
  templateUrl: './produit-details-dialog.component.html',
  styleUrls: ['./produit.component.scss'],
})
export class ProduitDetailsDialogComponent {
  @Input() produit: any;

  constructor(private modalController: ModalController,
              private navCtrl: NavController) {}

}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ data.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>{{ data.message }}</ion-item>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="dismiss(false)">Annuler</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button
            [color]="data.confirmColor"
            (click)="dismiss(true)"
          >{{ data.confirmText }}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  `,
})
export class ConfirmDialogComponent {
  @Input() data: any;
  constructor(private modalController: ModalController) {}
  dismiss(confirmed: boolean) {
    this.modalController.dismiss(confirmed);
  }
}
