import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-900 mb-12">Contactez-nous</h1>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
          {/* Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">Nos Coordonnées</h2>
            <p className="text-gray-600">
              Vous avez besoin d'aide ou vous souhaitez rejoindre notre cause ? N'hésitez pas à nous contacter.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Adresse</h4>
                  <p className="text-gray-600">20 rue Kimpouanza, Avenue Mayama, Mfilou, Brazzaville</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Téléphone</h4>
                  <p className="text-gray-600">+242 06 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600">contact@lamuka-congo.org</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-bold text-gray-900 mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-pink-600 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-pink-600 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-pink-600 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Envoyer un Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none">
                  <option>Demande d'aide</option>
                  <option>Devenir bénévole</option>
                  <option>Partenariat</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition-colors shadow-md">
                Envoyer
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Notre Siège</h2>
          <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-pink-100 h-96">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://maps.google.com/maps?q=20+rue+Kimpouanza,+Avenue+Mayama,+Mfilou,+Brazzaville&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="Localisation LAMUKA"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};