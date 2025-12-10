import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, HeartHandshake, Users, Mic2, ChevronRight, Play } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 2s; }
        .animate-slide-up { animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* Hero Section Revolutionized */}
      <section className="relative min-h-screen flex items-center bg-slate-50 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-3xl animate-float -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-300/20 to-pink-300/20 rounded-full blur-3xl animate-float-delayed translate-y-1/3 -translate-x-1/4 z-0"></div>

        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 font-bold text-sm tracking-wide border border-pink-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-pink-600 mr-2 animate-pulse"></span>
              Collectif LAMUKA
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Solidarité <br/>
              Justice <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Développement</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed border-l-4 border-pink-500 pl-6">
              Promouvoir l’autonomisation de la jeune fille et femme en situation d’handicap au Congo.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigate('assistant')}
                className="group px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all flex items-center hover:-translate-y-1"
              >
                J'ai besoin d'aide
                <div className="ml-3 bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
                   <ChevronRight className="w-4 h-4" />
                </div>
              </button>
              <button 
                onClick={() => onNavigate('services')}
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold shadow-sm hover:shadow-lg hover:border-pink-200 transition-all flex items-center"
              >
                Nos Domaines d'Activités
              </button>
            </div>
          </div>

          <div className={`relative hidden lg:block h-[600px] w-full ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
             <div className="absolute inset-0 grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <img src="https://picsum.photos/seed/women1/400/500" className="w-full h-64 object-cover rounded-3xl shadow-2xl animate-float" alt="Femme souriante" />
                   <div className="p-6 bg-pink-600 rounded-3xl text-white shadow-xl flex flex-col justify-center h-48 animate-float-delayed">
                      <div className="text-xl font-bold mb-2">Notre Mission</div>
                      <div className="text-pink-100 text-sm leading-tight">Une société d'égalité et d'équité pour toutes.</div>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl h-40 flex items-center animate-float">
                      <p className="text-slate-800 font-medium italic">"Pour l'autonomisation de la femme en situation d'handicap."</p>
                   </div>
                   <img src="https://picsum.photos/seed/women2/400/600" className="w-full h-80 object-cover rounded-3xl shadow-2xl animate-float-delayed" alt="Groupe de parole" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Revolution Section (Stylisé, contenu adapté) */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {[
              { num: "Justice", label: "Lutte contre les VBG" },
              { num: "Santé", label: "Droits Sexuels & Reproduction" },
              { num: "Avenir", label: "Formation Entrepreneuriale" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 group cursor-default">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stat.num}
                </div>
                <div className="text-slate-400 font-medium tracking-widest text-sm uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Cards with Hover Expand */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Nos Domaines d'Activités</h2>
              <div className="h-1.5 w-20 bg-pink-600 rounded-full"></div>
            </div>
            <button onClick={() => onNavigate('services')} className="hidden md:flex items-center text-pink-600 font-bold hover:text-pink-800 transition-colors mt-4 md:mt-0">
              En savoir plus <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Lutte VBG", desc: "Lutte contre les violences basées sur le genre.", color: "bg-blue-50 text-blue-600" },
              { icon: HeartHandshake, title: "Santé", desc: "Droit en santé sexuelle et santé de la reproduction.", color: "bg-pink-50 text-pink-600" },
              { icon: Users, title: "Entrepreneuriat", desc: "Formation entrepreneuriale pour l'autonomisation.", color: "bg-yellow-50 text-yellow-600" }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150`}></div>
                
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}>
                  <item.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 relative z-10">{item.desc}</p>
                
                <div className="flex items-center text-slate-900 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Détails <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-pink-600 to-purple-800 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">Rejoignez LAMUKA</h2>
            <p className="text-pink-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
              Contribuer à la promotion des droits de la jeune fille et femme en situation de handicap pour une société d’égalité.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
               <button 
                onClick={() => onNavigate('contact')}
                className="px-10 py-4 bg-white text-pink-700 font-bold rounded-full shadow-lg hover:shadow-white/50 hover:scale-105 transition-all"
               >
                 Nous Contacter
               </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};