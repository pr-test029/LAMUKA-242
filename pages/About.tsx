import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-900 mb-8 text-center">À Propos de LAMUKA</h1>
        
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p className="mb-6">
            LAMUKA est né d'une volonté farouche de briser le silence. Au Congo Brazzaville, les femmes et jeunes filles vivant avec un handicap sont souvent doublement marginalisées : par leur genre et par leur handicap.
          </p>

          <div className="my-10 p-6 bg-pink-50 border-l-4 border-pink-600 rounded-r-lg">
            <h3 className="text-xl font-bold text-pink-800 mb-2">Notre Vision</h3>
            <p className="italic text-gray-700">
              "Une société congolaise inclusive où chaque femme, quel que soit son handicap, jouit pleinement de ses droits, de sa santé et de sa dignité."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Nos Objectifs</h2>
          <ul className="list-disc pl-6 space-y-3 mb-8">
            <li>Lutter contre toutes les formes de Violences Basées sur le Genre (VBG).</li>
            <li>Faciliter l'accès à la santé sexuelle et reproductive pour les femmes handicapées.</li>
            <li>Promouvoir l'autonomisation économique par la formation professionnelle.</li>
            <li>Plaidoyer auprès des institutions pour des politiques publiques inclusives.</li>
          </ul>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <img 
              src="https://picsum.photos/600/400?random=1" 
              alt="Community meeting" 
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <img 
              src="https://picsum.photos/600/400?random=2" 
              alt="Support group" 
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};