import React, { useState } from 'react';
import { Calendar, User, ArrowRight, ArrowLeft, Tag, Clock, Share2 } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: React.ReactNode;
  date: string;
  author: string;
  image: string;
  category: string;
  readTime: string;
}

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Lancement de la campagne 'Brisons le Silence'",
      excerpt: "Une journée mémorable où plus de 200 femmes se sont réunies pour échanger sur les violences basées sur le genre et les mécanismes d'alerte à Brazzaville.",
      content: (
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Ce 12 octobre restera gravé dans les mémoires du collectif LAMUKA. Dans la grande salle de la Mairie de Mfilou, plus de 200 femmes, dont une cinquantaine vivant avec un handicap, se sont rassemblées pour dire "STOP" aux violences basées sur le genre.
          </p>
          <h3 className="text-xl font-bold text-pink-900 mt-4">Une réalité alarmante</h3>
          <p>
            Les témoignages recueillis lors de cette journée confirment l'urgence d'agir. Les femmes handicapées sont souvent des proies faciles pour les agresseurs, profitant de leur mobilité réduite ou de leur difficulté à communiquer pour commettre l'irréparable en toute impunité.
          </p>
          <p>
            "On m'a dit que personne ne me croirait parce que je suis en fauteuil," a témoigné Marie, une participante courageuse. C'est précisément pour briser ce type de silence que notre campagne a été lancée.
          </p>
          <h3 className="text-xl font-bold text-pink-900 mt-4">Des outils concrets</h3>
          <p>
            Au-delà de la sensibilisation, nous avons distribué des "Kits d'Alerte" contenant des sifflets et des fiches pratiques avec les numéros d'urgence. Nous avons également présenté notre nouvelle application mobile permettant de géolocaliser les centres d'aide les plus proches.
          </p>
        </div>
      ),
      date: "12 Octobre 2023",
      author: "Jeanne M.",
      image: "https://picsum.photos/seed/blog1/800/600",
      category: "Campagne",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Témoignage : Le parcours de résilience de Sophie",
      excerpt: "Après avoir perdu l'usage de ses jambes, Sophie a dû faire face à la stigmatisation. Aujourd'hui, elle dirige sa propre entreprise de couture à Pointe-Noire.",
      content: (
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Sophie avait 15 ans lorsqu'un accident de la route a changé sa vie. Devenue paraplégique, elle a vu son monde s'effondrer. "Le plus dur n'était pas le fauteuil, mais le regard des autres. On me voyait comme une charge, plus comme une femme," confie-t-elle.
          </p>
          <h3 className="text-xl font-bold text-pink-900 mt-4">La couture comme refuge</h3>
          <p>
            Rejetée par une partie de sa famille, Sophie a trouvé refuge au centre d'apprentissage de LAMUKA. C'est là qu'elle a touché sa première machine à coudre. Ce qui n'était qu'un passe-temps est devenu une passion dévorante, puis une vocation.
          </p>
          <p>
            Aujourd'hui, à 28 ans, Sophie emploie trois autres jeunes femmes, dont deux sont sourdes-muettes. Son atelier "Mains de Fée" à Pointe-Noire est réputé pour ses tenues en pagne moderne.
          </p>
          <p>
            "Je ne suis pas une femme handicapée qui coud. Je suis une couturière qui se déplace assise," aime-t-elle rappeler avec un sourire radieux. Son histoire est la preuve vivante que le handicap n'est pas une fatalité, mais un défi que l'on peut relever avec le bon accompagnement.
          </p>
        </div>
      ),
      date: "28 Septembre 2023",
      author: "Équipe Lamuka",
      image: "https://picsum.photos/seed/blog2/800/600",
      category: "Témoignage",
      readTime: "4 min"
    },
    {
      id: 3,
      title: "Comprendre la loi sur la protection des personnes handicapées",
      excerpt: "Décryptage des textes juridiques congolais qui protègent les femmes handicapées contre la discrimination et les abus.",
      content: (
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            La législation congolaise a fait des progrès significatifs ces dernières années, mais ces textes restent souvent méconnus du grand public et des premières concernées. Cet article vise à vulgariser les droits fondamentaux garantis par la loi.
          </p>
          <h3 className="text-xl font-bold text-pink-900 mt-4">Le droit à l'intégrité physique</h3>
          <p>
            L'article 15 de la loi spécifique stipule que toute forme d'abus, de violence ou de négligence envers une personne vulnérable est passible de peines aggravées. Cela inclut les violences domestiques, souvent tues dans le cercle familial.
          </p>
          <h3 className="text-xl font-bold text-pink-900 mt-4">L'accès à l'emploi</h3>
          <p>
            Saviez-vous que les entreprises de plus de 50 salariés sont tenues d'avoir un quota de travailleurs handicapés ? Nous vous expliquons comment faire valoir ce droit et quels sont les recours en cas de discrimination à l'embauche.
          </p>
          <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
            <strong>Note :</strong> LAMUKA offre une assistance juridique gratuite tous les mercredis matin à notre siège pour vous aider à monter vos dossiers.
          </div>
        </div>
      ),
      date: "15 Septembre 2023",
      author: "Me. T. Ngoma",
      image: "https://picsum.photos/seed/blog3/800/600",
      category: "Droit",
      readTime: "7 min"
    },
    {
      id: 4,
      title: "Atelier sur la santé sexuelle et reproductive",
      excerpt: "Retour en images sur notre atelier de formation destiné aux prestataires de santé pour un accueil inclusif des femmes à mobilité réduite.",
      content: (
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            L'accès à la santé sexuelle est un droit universel, pourtant les femmes handicapées font face à des barrières physiques et attitudinales majeures. Tables d'examen inadaptées, personnel non formé, préjugés sur leur sexualité... la liste est longue.
          </p>
          <p>
            C'est pourquoi LAMUKA a organisé une formation de 3 jours pour 20 sages-femmes et infirmiers des centres de santé de Brazzaville.
          </p>
          <h3 className="text-xl font-bold text-pink-900 mt-4">Au programme</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Techniques de manipulation et de transfert pour les patientes à mobilité réduite.</li>
            <li>Communication bienveillante et sans jugement.</li>
            <li>Sensibilisation aux besoins spécifiques en matière de contraception et de suivi de grossesse.</li>
          </ul>
          <p>
            "J'ai réalisé que je posais des questions intrusives sans m'en rendre compte. Cette formation m'a ouvert les yeux," a admis un participant. Un petit pas pour le personnel médical, un grand pas pour le respect de l'intimité de nos bénéficiaires.
          </p>
        </div>
      ),
      date: "02 Septembre 2023",
      author: "Dr. K. Ibara",
      image: "https://picsum.photos/seed/blog4/800/600",
      category: "Santé",
      readTime: "6 min"
    },
    {
      id: 5,
      title: "Inclusion numérique : Un levier pour l'autonomisation",
      excerpt: "Comment le numérique peut briser l'isolement des femmes handicapées et leur offrir de nouvelles opportunités économiques.",
      content: (
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Le numérique est une opportunité formidable pour contourner les obstacles physiques. Pour une femme qui ne peut pas se déplacer facilement, internet ouvre une fenêtre sur le monde, sur l'éducation et sur l'emploi.
          </p>
          <p>
            LAMUKA a lancé le programme "Digital Pour Toutes". Nous formons des jeunes femmes au Community Management, au graphisme et au secrétariat à distance.
          </p>
          <p>
            Grâce à ces compétences, elles peuvent travailler depuis chez elles, générer un revenu et gagner en indépendance financière vis-à-vis de leur famille ou de leur conjoint. L'ordinateur devient alors un véritable outil de libération.
          </p>
        </div>
      ),
      date: "20 Août 2023",
      author: "Sarah L.",
      image: "https://picsum.photos/seed/blog5/800/600",
      category: "Innovation",
      readTime: "5 min"
    },
    {
      id: 6,
      title: "Partenariat avec les centres de santé de Mfilou",
      excerpt: "Signature d'une convention pour garantir la gratuité des soins d'urgence pour les victimes de VBG identifiées par LAMUKA.",
      content: (
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            C'est une victoire importante pour notre plaidoyer local. La mairie de Mfilou et le district sanitaire ont signé une convention avec LAMUKA pour la prise en charge immédiate et gratuite des victimes de violences sexuelles.
          </p>
          <p>
            Trop souvent, les victimes renoncent aux soins ou au constat médical (nécessaire pour la justice) faute d'argent. Ce frein financier est désormais levé dans 3 centres de santé pilotes de l'arrondissement.
          </p>
          <p>
            Ce partenariat inclut également la fourniture gratuite de kits de prophylaxie post-exposition (PPE) pour prévenir le VIH et les grossesses non désirées en cas de viol.
          </p>
        </div>
      ),
      date: "10 Août 2023",
      author: "Direction",
      image: "https://picsum.photos/seed/blog6/800/600",
      category: "Partenariat",
      readTime: "3 min"
    }
  ];

  const categories = ["Tout", ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = selectedCategory === "Tout" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  // Detail View
  if (selectedPost) {
    return (
      <div className="bg-slate-50 min-h-screen pb-16">
        {/* Scroll Progress Indicator could go here */}
        
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] w-full">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white container mx-auto">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="mb-6 flex items-center text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full w-fit backdrop-blur-sm"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Retour aux articles
                </button>
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm font-medium">
                  <span className="bg-pink-600 px-3 py-1 rounded-full">{selectedPost.category}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {selectedPost.date}</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {selectedPost.readTime} de lecture</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
                  {selectedPost.title}
                </h1>
            </div>
        </div>

        {/* Content Body */}
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12">
            
            {/* Author Info */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
               <div className="flex items-center">
                 <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-xl mr-4">
                    {selectedPost.author.charAt(0)}
                 </div>
                 <div>
                   <div className="text-gray-900 font-bold">{selectedPost.author}</div>
                   <div className="text-pink-600 text-sm">Auteur</div>
                 </div>
               </div>
               <button className="text-gray-400 hover:text-pink-600 transition-colors">
                 <Share2 className="w-5 h-5" />
               </button>
            </div>

            {/* Actual Text Content */}
            <div className="prose prose-lg prose-pink text-gray-700 max-w-none">
              <p className="lead text-xl text-gray-500 italic mb-8 border-l-4 border-pink-300 pl-4">
                {selectedPost.excerpt}
              </p>
              {selectedPost.content}
            </div>

            {/* Navigation Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
               <button 
                  onClick={() => setSelectedPost(null)}
                  className="px-8 py-3 bg-pink-50 text-pink-700 font-bold rounded-full hover:bg-pink-100 transition-colors flex items-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Voir tous les articles
               </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Grid List View
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-pink-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités & Témoignages</h1>
          <p className="text-pink-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Restez informé de nos actions sur le terrain, découvrez des parcours inspirants et les dernières avancées pour les droits des femmes au Congo.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto pb-2 scrollbar-hide space-x-2">
             <span className="text-gray-400 mr-2 hidden md:block">
               <Tag className="w-5 h-5" />
             </span>
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setSelectedCategory(cat)}
                 className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                   selectedCategory === cat 
                     ? 'bg-pink-600 text-white shadow-md transform scale-105' 
                     : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Aucun article trouvé dans cette catégorie.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-50 flex flex-col h-full transform hover:-translate-y-1 group"
              >
                <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-pink-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                      <Calendar className="w-3 h-3 mr-1.5 text-pink-500" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1.5 text-pink-500" />
                      {post.author}
                    </div>
                  </div>
                  <h2 
                    onClick={() => setSelectedPost(post)}
                    className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-pink-700 transition-colors cursor-pointer"
                  >
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center text-pink-700 font-bold text-sm hover:text-pink-900 transition-colors mt-auto group self-start"
                  >
                    Lire l'article 
                    <span className="ml-2 bg-pink-100 p-1 rounded-full group-hover:bg-pink-200 transition-colors">
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
