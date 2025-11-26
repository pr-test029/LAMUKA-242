import React from 'react';

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">LAMUKA</h3>
            <p className="max-w-md text-gray-400">
              Collectif engagé pour la protection et l'autonomisation des femmes et filles handicapées au Congo. Ensemble, construisons un avenir sans violence.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('home')} className="hover:text-pink-400 transition-colors">Accueil</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-pink-400 transition-colors">À Propos</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-pink-400 transition-colors">Nos Actions</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-pink-400 transition-colors">Blog</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-pink-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Urgence</h4>
            <p className="text-gray-400 mb-2">Besoin d'aide immédiate ?</p>
            <div className="text-2xl font-bold text-yellow-500">111 (Gratuit)</div>
            <p className="text-xs text-gray-500 mt-2">Disponible 24h/24 et 7j/7</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Collectif LAMUKA. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};