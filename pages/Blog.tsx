import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, ArrowLeft, Tag, Clock, Share2, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string; // Now string because HTML comes from DB
  date: string;
  author: string;
  image_url: string;
  category: string;
  read_time: string;
  created_at: string;
}

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      // Map DB fields to Component fields if names differ, otherwise direct use
      const mappedPosts = data.map((post: any) => ({
        ...post,
        date: new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
      }));
      setPosts(mappedPosts);
    }
    setLoading(false);
  };

  const handlePostClick = async (post: BlogPost) => {
    setSelectedPost(post);
    // Increment view count
    await supabase.rpc('increment_views', { post_id: post.id }).catch(async () => {
        // Fallback if RPC doesn't exist: manual update
        const { data } = await supabase.from('posts').select('views').eq('id', post.id).single();
        if (data) {
            await supabase.from('posts').update({ views: (data.views || 0) + 1 }).eq('id', post.id);
        }
    });
  };

  const categories = ["Tout", ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = selectedCategory === "Tout" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  // LOADING STATE
  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 text-pink-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Chargement des articles...</p>
            </div>
        </div>
    );
  }

  // VIEW: SINGLE POST DETAIL
  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen animate-fade-in">
         <style>{`
          @keyframes slide-down {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-down { animation: slide-down 0.8s ease-out forwards; }
        `}</style>
        
        {/* Cinematic Header Image */}
        <div className="relative h-[60vh] w-full overflow-hidden">
            <img 
              src={selectedPost.image_url || "https://picsum.photos/1200/800"} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover animate-scale-slow"
              style={{ animation: 'scale-slow 20s linear infinite alternate' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
            
            <div className="absolute top-6 left-6 z-20">
               <button 
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center text-white bg-black/30 hover:bg-black/50 backdrop-blur-md px-6 py-3 rounded-full transition-all border border-white/20"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Retour
                </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white container mx-auto z-20 animate-slide-up">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="bg-pink-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-pink-600/40">{selectedPost.category}</span>
                  <span className="flex items-center text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm"><Clock className="w-4 h-4 mr-2"/> {selectedPost.read_time}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-5xl text-shadow-lg mb-4">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center space-x-4 mt-6">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="font-bold text-white">{selectedPost.author}</div>
                        <div className="text-white/70 text-sm">{selectedPost.date}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="prose prose-lg prose-pink prose-img:rounded-3xl prose-headings:font-bold text-gray-800">
              <p className="text-2xl font-light leading-relaxed text-gray-500 mb-10 border-l-4 border-pink-500 pl-6">
                 {selectedPost.excerpt}
              </p>
              {/* Dangerous HTML rendering for DB content */}
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col items-center">
               <h3 className="text-xl font-bold mb-6">Partager cet article</h3>
               <div className="flex space-x-4 mb-10">
                   {['Facebook', 'Twitter', 'LinkedIn'].map(net => (
                       <button key={net} className="px-6 py-2 bg-gray-100 rounded-full hover:bg-pink-600 hover:text-white transition-colors text-sm font-bold">
                           {net}
                       </button>
                   ))}
               </div>
               <button 
                  onClick={() => setSelectedPost(null)}
                  className="group flex items-center text-pink-600 font-bold hover:text-pink-800 transition-colors"
               >
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Retourner au blog
               </button>
            </div>
        </div>
      </div>
    );
  }

  // VIEW: POSTS GRID
  return (
    <div className="bg-slate-50 min-h-screen">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
      `}</style>

      {/* Modern Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-600 rounded-full blur-[100px] opacity-40"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-600 rounded-full blur-[100px] opacity-40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full mb-6 animate-slide-up">
              <Sparkles className="w-6 h-6 text-yellow-300" />
           </div>
           <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight animate-slide-up delay-100">
             L'Écho du <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">Terrain</span>
           </h1>
           <p className="text-xl text-slate-300 max-w-2xl leading-relaxed animate-slide-up delay-200">
             Découvrez les voix, les victoires et les combats quotidiens qui façonnent notre mouvement pour l'inclusion.
           </p>
        </div>
      </section>

      {/* Floating Filter Bar */}
      <div className="sticky top-16 z-40 py-6 -mt-8">
        <div className="container mx-auto px-4">
           <div className="bg-white/80 backdrop-blur-lg border border-white/50 shadow-lg rounded-full p-2 mx-auto max-w-4xl flex items-center justify-between overflow-x-auto scrollbar-hide">
              <div className="flex items-center space-x-2 px-2">
                 {categories.map((cat) => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                       selectedCategory === cat 
                         ? 'bg-slate-900 text-white shadow-md transform scale-105' 
                         : 'text-slate-600 hover:bg-pink-50 hover:text-pink-600'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        {filteredPosts.length === 0 ? (
           <div className="text-center py-20 text-slate-400">
              <p className="text-xl">Aucun article trouvé pour cette catégorie.</p>
           </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post, idx) => (
            <article 
              key={post.id} 
              onClick={() => handlePostClick(post)}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 cursor-pointer flex flex-col"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                   <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-white/50">
                     {post.category}
                   </span>
                </div>
                <img 
                  src={post.image_url || "https://picsum.photos/600/400"} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-slate-400 font-bold uppercase tracking-wider mb-4 space-x-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{post.read_time}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-pink-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                   <div className="flex items-center text-sm font-bold text-slate-900">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-3">
                         {post.author.charAt(0)}
                      </div>
                      {post.author}
                   </div>
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};
