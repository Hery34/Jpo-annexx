'use client';

import { Visiteur } from "@/lib/types/visiteur";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Eye, Building, User, Mail, Calendar } from "lucide-react";
import { useState } from "react";

interface VisiteursListProps {
  visiteurs: Visiteur[];
}

export default function VisiteursList({ visiteurs }: VisiteursListProps) {
  const [selectedVisiteur, setSelectedVisiteur] = useState<Visiteur | null>(null);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 text-red-800">
          <Users className="h-5 w-5" />
          <span className="font-semibold">
            {visiteurs.length} visiteur{visiteurs.length > 1 ? 's' : ''} inscrit{visiteurs.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {visiteurs.length === 0 ? (
        <Card className="w-full">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun visiteur inscrit pour le moment</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* En-tête du tableau - Desktop */}
          <div className="hidden md:block bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
              <div className="col-span-3 flex items-center gap-2">
                <Building className="h-4 w-4 text-red-500" />
                Entreprise
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <User className="h-4 w-4 text-red-500" />
                Nom
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <User className="h-4 w-4 text-red-500" />
                Prénom
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-red-500" />
                Email
              </div>
              <div className="col-span-1 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-500" />
                Date
              </div>
              <div className="col-span-1 text-center">Détails</div>
            </div>
          </div>

          {/* Liste des visiteurs */}
          {visiteurs.map((visiteur) => (
            <div key={visiteur.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Version Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">
                  <p className="font-medium text-gray-900 truncate">{visiteur.entreprise}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-700 truncate">{visiteur.nom}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-700 truncate">{visiteur.prenom}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-gray-600 truncate">{visiteur.email}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm text-gray-500">{formatDate(visiteur.created_at!)}</p>
                </div>
                <div className="col-span-1 text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedVisiteur(visiteur)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Version Mobile */}
              <div className="md:hidden space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-red-600">
                      {visiteur.prenom} {visiteur.nom}
                    </h3>
                    <p className="text-gray-600">{visiteur.entreprise}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedVisiteur(visiteur)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-red-500" />
                    <span className="truncate">{visiteur.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span>{formatDate(visiteur.created_at!)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de détail */}
      {selectedVisiteur && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl text-red-600">
                  Détails du visiteur
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedVisiteur(null)}
                  className="text-gray-500"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Entreprise</label>
                  <p className="text-lg font-semibold">{selectedVisiteur.entreprise}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nom</label>
                  <p className="text-lg">{selectedVisiteur.nom}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Prénom</label>
                  <p className="text-lg">{selectedVisiteur.prenom}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-lg">{selectedVisiteur.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Téléphone</label>
                  <p className="text-lg">{selectedVisiteur.telephone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date d&apos;inscription</label>
                  <p className="text-lg">{formatDate(selectedVisiteur.created_at!)}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Adresse</label>
                <p className="text-lg">{selectedVisiteur.adresse}</p>
              </div>
              
              {selectedVisiteur.note && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Note</label>
                  <p className="text-lg italic bg-gray-50 p-3 rounded-lg">{selectedVisiteur.note}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
