'use client';

import { useState, useEffect } from 'react';
import { insertVisiteur, getEmailsExistants } from '@/lib/supabase/visiteurs';
import { VisiteurFormData } from '@/lib/types/visiteur';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VisiteurForm() {
  const [formData, setFormData] = useState<VisiteurFormData>({
    entreprise: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    note: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    telephone?: string;
    email?: string;
  }>({});
  const [emailsExistants, setEmailsExistants] = useState<string[]>([]);
  const [isLoadingEmails, setIsLoadingEmails] = useState(false);

  // Charger les emails existants au montage du composant
  useEffect(() => {
    const loadEmailsExistants = async () => {
      try {
        const emails = await getEmailsExistants();
        setEmailsExistants(emails);
      } catch (err) {
        console.error('Erreur lors du chargement des emails:', err);
      }
    };

    loadEmailsExistants();
  }, []);

  // Faire disparaître le message de succès automatiquement
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 4000); // Disparaît après 4 secondes

      return () => clearTimeout(timer);
    }
  }, [success]);

  // Fonction de formatage
  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Fonctions de validation
  const validateTelephone = (telephone: string): string | null => {
    const phoneRegex = /^0[1-9]\d{8}$/;
    if (!phoneRegex.test(telephone)) {
      return 'Le numéro de téléphone doit être au format 0609090909 (10 chiffres commençant par 0)';
    }
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Veuillez entrer une adresse email valide';
    }
    
    // Vérifier si l'email existe déjà
    if (emailsExistants.includes(email.toLowerCase())) {
      return 'Cette adresse email est déjà utilisée';
    }
    
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Appliquer le formatage pour nom et prénom
    let formattedValue = value;
    if (name === 'nom' || name === 'prenom') {
      formattedValue = capitalizeFirstLetter(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Validation en temps réel
    if (name === 'telephone') {
      const error = validateTelephone(value);
      setValidationErrors(prev => ({
        ...prev,
        telephone: error || undefined
      }));
    } else if (name === 'email') {
      const error = validateEmail(value);
      setValidationErrors(prev => ({
        ...prev,
        email: error || undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation avant soumission
    const telephoneError = validateTelephone(formData.telephone);
    const emailError = validateEmail(formData.email);
    
    if (telephoneError || emailError) {
      setValidationErrors({
        telephone: telephoneError || undefined,
        email: emailError || undefined
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setValidationErrors({});

    try {
      // Formater les données avant l'envoi
      const formattedData = {
        ...formData,
        nom: capitalizeFirstLetter(formData.nom),
        prenom: capitalizeFirstLetter(formData.prenom)
      };
      
      await insertVisiteur(formattedData);
      setSuccess(true);
      setFormData({
        entreprise: '',
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        adresse: '',
        note: ''
      });
      
      // Recharger la liste des emails après un enregistrement réussi
      setIsLoadingEmails(true);
      const emails = await getEmailsExistants();
      setEmailsExistants(emails);
      setIsLoadingEmails(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-red-600">
          Formulaire d&apos;enregistrement
        </CardTitle>
        <CardDescription className="text-lg">
          JPO Marseille EST - 03 & 04 octobre 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            <span>Visiteur enregistré avec succès !</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
            <XCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {isLoadingEmails && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-blue-800">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Mise à jour de la liste des emails...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="entreprise" className="text-sm font-medium">
                Entreprise
              </Label>
              <Input
                id="entreprise"
                name="entreprise"
                type="text"
                value={formData.entreprise}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Nom de l'entreprise"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom" className="text-sm font-medium">
                Nom *
              </Label>
              <Input
                id="nom"
                name="nom"
                type="text"
                value={formData.nom}
                onChange={handleInputChange}
                required
                className="w-full"
                placeholder="Votre nom"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prenom" className="text-sm font-medium">
                Prénom *
              </Label>
              <Input
                id="prenom"
                name="prenom"
                type="text"
                value={formData.prenom}
                onChange={handleInputChange}
                required
                className="w-full"
                placeholder="Votre prénom"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone" className="text-sm font-medium">
                Téléphone *
              </Label>
              <Input
                id="telephone"
                name="telephone"
                type="tel"
                value={formData.telephone}
                onChange={handleInputChange}
                required
                className={`w-full ${validationErrors.telephone ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="0609090909"
              />
              {validationErrors.telephone && (
                <p className="text-sm text-red-600">{validationErrors.telephone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full ${validationErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="votre.email@exemple.com"
              />
              {validationErrors.email && (
                <p className="text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="adresse" className="text-sm font-medium">
                Adresse
              </Label>
              <Input
                id="adresse"
                name="adresse"
                type="text"
                value={formData.adresse}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Votre adresse complète"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="note" className="text-sm font-medium">
                Note (optionnel)
              </Label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical"
                placeholder="Informations complémentaires..."
              />
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isLoading || isLoadingEmails || !!validationErrors.telephone || !!validationErrors.email}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                'Enregistrer le visiteur'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
