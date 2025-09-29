export interface Visiteur {
  id?: number;
  created_at?: string;
  entreprise?: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  adresse?: string;
  note?: string;
}

export interface VisiteurInsert {
  entreprise?: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  adresse?: string;
  note?: string;
}

export interface VisiteurFormData {
  entreprise: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse: string;
  note: string;
}
