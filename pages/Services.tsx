import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full">
    <div className="h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-pink-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 flex-1">{description}</p>
      <button className="text-pink-600 font-semibold hover:text-pink-800 self-start">En savoir plus →</button>
    </div>
  </div>
);

export const Services: React.FC = () => {
  const services = [
    {
      title: "Ecoute et Soutien Psychologique",
      description: "Une ligne d'écoute et des groupes de parole sécurisés pour les victimes de VBG, animés par des professionnels formés au handicap.",
      image: "https://picsum.photos/seed/psych/500/300"
    },
    {
      title: "Accompagnement Juridique",
      description: "Assistance dans les démarches judiciaires pour que justice soit rendue. Nous collaborons avec des avocats partenaires.",
      image: "https://picsum.photos/seed/law/500/300"
    },
    {
      title: "Santé Mobile",
      description: "Campagnes de sensibilisation et cliniques mobiles pour rapprocher les soins de santé reproductive des femmes à mobilité réduite.",
      image: "https://picsum.photos/seed/health/500/300"
    },
    {
      title: "Ateliers d'Autonomisation",
      description: "Formation en gestion, artisanat et numérique pour favoriser l'indépendance financière.",
      image: "https://picsum.photos/seed/work/500/300"
    }
  ];

  return (
    <div className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-900 mb-4">Nos Actions sur le Terrain</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          Nous déployons des programmes concrets pour répondre aux besoins spécifiques des femmes handicapées au Congo.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
};