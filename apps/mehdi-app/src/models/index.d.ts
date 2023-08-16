import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPorduct = {
  readonly id: string;
  readonly name?: string | null;
  readonly prix?: number | null;
}

type LazyPorduct = {
  readonly id: string;
  readonly name?: string | null;
  readonly prix?: number | null;
}

export declare type Porduct = LazyLoading extends LazyLoadingDisabled ? EagerPorduct : LazyPorduct

export declare const Porduct: (new (init: ModelInit<Porduct>) => Porduct) & {
  copyOf(source: Porduct, mutator: (draft: MutableModel<Porduct>) => MutableModel<Porduct> | void): Porduct;
}

type EagerProduit = {
  readonly id: string;
  readonly nom?: string | null;
  readonly prixUnitaire: string;
  readonly quantite?: string | null;
}

type LazyProduit = {
  readonly id: string;
  readonly nom?: string | null;
  readonly prixUnitaire: string;
  readonly quantite?: string | null;
}

export declare type Produit = LazyLoading extends LazyLoadingDisabled ? EagerProduit : LazyProduit

export declare const Produit: (new (init: ModelInit<Produit>) => Produit) & {
  copyOf(source: Produit, mutator: (draft: MutableModel<Produit>) => MutableModel<Produit> | void): Produit;
}