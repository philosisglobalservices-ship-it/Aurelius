import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Search, Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface BlogPageProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchTag = post.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTag) return false;
    }
    return post.status === 'Published';
  });

  const featuredPost = filteredPosts[0] || posts[0];
  const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          The Aurelius Gazette
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display uppercase tracking-tight">
          Automotive Intelligence &amp; Editorial
        </h1>
        <p className="text-xs sm:text-sm text-[#A0A0AD] leading-relaxed">
          Deep dives into blue-chip automotive market dynamics, bespoke coachbuilding, and engineering milestones.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121217] border border-[#22222E] rounded-xl p-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-black font-semibold'
                  : 'text-[#9E9EAA] hover:text-white bg-[#1A1A22]'
              }`}
            >
              {cat === 'all' ? 'All Editorial' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#737380] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search stories &amp; tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181822] border border-[#2A2A38] focus:border-[#D4AF37] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#686874] focus:outline-none"
          />
        </div>
      </div>

      {/* Featured Lead Story */}
      {featuredPost && (
        <div
          onClick={() => onSelectPost(featuredPost)}
          className="group cursor-pointer rounded-2xl overflow-hidden bg-[#121217] border border-[#242430] hover:border-[#D4AF37]/50 transition-all grid grid-cols-1 lg:grid-cols-12 items-center"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] lg:h-full bg-black overflow-hidden">
            <img
              src={featuredPost.featuredImage}
              alt={featuredPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-[#D4AF37] text-black">
                Featured Lead Story
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#8A8A96]">
              <span className="text-[#D4AF37] font-medium uppercase tracking-wider">{featuredPost.category}</span>
              <span>&middot;</span>
              <span>{featuredPost.readTime}</span>
              <span>&middot;</span>
              <span>{featuredPost.publishedAt}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#F3E5AB] font-display transition-colors leading-snug">
              {featuredPost.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#A0A0AE] line-clamp-3 leading-relaxed">
              {featuredPost.excerpt}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#B3B3BE]">By {featuredPost.author.name}</span>
              <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="group cursor-pointer bg-[#121217] border border-[#22222D] hover:border-[#D4AF37]/50 rounded-xl overflow-hidden transition-all flex flex-col justify-between"
          >
            <div className="aspect-[16/10] bg-[#0A0A0C] overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-[#868694]">
                  <span className="text-[#D4AF37] font-medium uppercase">{post.category}</span>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#F3E5AB] transition-colors line-clamp-2 font-display">
                  {post.title}
                </h3>

                <p className="text-xs text-[#9999A6] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1C1C24] flex items-center justify-between text-xs text-[#7A7A88]">
                <span>{post.publishedAt}</span>
                <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium">
                  Read &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
