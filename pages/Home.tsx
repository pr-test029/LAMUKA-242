import React from 'react';
import { ArrowRight, Shield, HeartHandshake, Users, Mic2 } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-pink-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <img 
                src="https://picsum.photos/1920/1080?grayscale" 
                alt="Background pattern" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Ensemble pour la dignité de la <span className="text-yellow-400">Femme</span>
          </h1>
          <p className="text-lg md:text-xl text-pink-100 max-w-2xl mb-10">
            LAMUKA est un collectif engagé contre les violences basées sur le genre et pour l'inclusion des femmes et filles handicapées au Congo Brazzaville.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={() => onNavigate('assistant')}
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-pink-900 font-bold rounded-full transition-all shadow-lg flex items-center justify-center"
            >
              Trouver de l'aide maintenant <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold rounded-full transition-all"
            >
              Qui sommes-nous ?
            </button>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Domaines d'Intervention</h2>
            <div className="w-24 h-1 bg-pink-600 mx-auto rounded"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Lutte Contre les VBG", 
                desc: "Prévention et prise en charge des violences faites aux femmes handicapées." 
              },
              { 
                icon: HeartHandshake, 
                title: "Santé Sexuelle", 
                desc: "Accès aux soins de santé reproductive adaptés et inclusifs." 
              },
              { 
                icon: Users, 
                title: "Inclusion Sociale", 
                desc: "Promotion des droits et participation active dans la société." 
              },
              { 
                icon: Mic2, 
                title: "Autonomisation", 
                desc: "Formation, leadership et indépendance économique." 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-shadow border border-slate-100">
                <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats (Fictional for demo) */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <div className="text-4xl font-bold text-pink-700 mb-2">500+</div>
                    <div className="text-gray-600 font-medium">Femmes Accompagnées</div>
                </div>
                <div className="p-6">
                    <div className="text-4xl font-bold text-pink-700 mb-2">12</div>
                    <div className="text-gray-600 font-medium">Campagnes de Sensibilisation</div>
                </div>
                <div className="p-6">
                    <div className="text-4xl font-bold text-pink-700 mb-2">3</div>
                    <div className="text-gray-600 font-medium">Centres Partenaires</div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};