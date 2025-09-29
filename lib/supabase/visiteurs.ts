import { createClient } from './client';
import { Visiteur, VisiteurInsert } from '@/lib/types/visiteur';

export async function insertVisiteur(visiteur: VisiteurInsert) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('visiteurs')
    .insert([visiteur])
    .select()
    .single();

  if (error) {
    throw new Error(`Erreur lors de l'insertion du visiteur: ${error.message}`);
  }

  return data;
}

export async function getVisiteurs() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('visiteurs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Erreur lors de la récupération des visiteurs: ${error.message}`);
  }

  return data;
}

export async function getEmailsExistants() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('visiteurs')
    .select('email')
    .not('email', 'is', null);

  if (error) {
    throw new Error(`Erreur lors de la récupération des emails: ${error.message}`);
  }

  return data.map(visiteur => visiteur.email?.toLowerCase()).filter(Boolean);
}

export async function getVisiteurById(id: number) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('visiteurs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Erreur lors de la récupération du visiteur: ${error.message}`);
  }

  return data;
}
