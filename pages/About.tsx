import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
        {/* Header Cinematic */}
        <section className="relative h-[60vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
           <img 
             src="https://picsum.photos/id/338/1920/1080" 
             alt="Team background" 
             className="absolute inset-0 w-full h-full object-cover opacity-30"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
           
           <div className="relative z-10 text-center max-w-4xl px-4 animate-fade-in-up">
              <span className="text-pink-500 font-bold tracking-widest uppercase text-sm mb-4 block">COLLECTIF LAMUKA</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Solidarité – Justice <br/> <span className="text-pink-500">Développement</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Promouvoir l’autonomisation de la jeune fille et femme en situation d’handicap.
              </p>
           </div>
        </section>

        {/* Asymmetrical Story Section */}
        <section className="py-24 container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-pink-200 rounded-3xl transform -rotate-3 translate-x-4 translate-y-4"></div>
                    <img 
                      src="https://picsum.photos/seed/about1/800/800" 
                      alt="Femmes unies" 
                      className="relative rounded-3xl shadow-2xl w-full object-cover z-10 transform hover:rotate-0 transition-transform duration-500"
                    />
                </div>
                <div className="w-full md:w-1/2 space-y-8">
                    <h2 className="text-4xl font-bold text-slate-900">Notre Engagement</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Le COLLECTIF LAMUKA œuvre pour une société où la jeune fille et la femme en situation de handicap ne sont plus laissées pour compte. Nous croyons fermement que l'égalité et l'équité sont les piliers d'un développement durable.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="h-1 w-20 bg-pink-600"></div>
                        <div className="h-1 w-10 bg-pink-300"></div>
                    </div>
                </div>
            </div>
        </section>

        {/* Mission / Vision Cards */}
        <section className="py-20 bg-slate-50 relative">
            {/* Decorative background element */}
            <div className="absolute top-0 left-1/2 w-full h-full bg-white transform -skew-y-3 -z-0 origin-top-left"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { 
                            title: "Notre Vision", 
                            icon: Eye, 
                            text: "Promouvoir l’autonomisation de la jeune fille et femme en situation d’handicap.",
                            bg: "bg-pink-600 text-white"
                        },
                        { 
                            title: "Nos Missions", 
                            icon: Target, 
                            text: "Contribuer à la promotion des droits de la jeune fille et femme en situation de handicap pour une société d’égalité et d’équité.",
                            bg: "bg-slate-900 text-white"
                        },
                        { 
                            title: "Notre Devise", 
                            icon: Heart, 
                            text: "Solidarité – Justice - Développement.",
                            bg: "bg-white text-slate-900 border border-slate-200"
                        }
                    ].map((card, idx) => (
                        <div key={idx} className={`p-10 rounded-[2rem] shadow-xl ${card.bg} flex flex-col items-start hover:-translate-y-2 transition-transform duration-300`}>
                            <card.icon className="w-10 h-10 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                            <p className="leading-relaxed opacity-90">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </div>
  );
};