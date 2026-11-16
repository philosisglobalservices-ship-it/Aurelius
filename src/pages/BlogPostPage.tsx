import React from 'react';
import { BlogPost, PageRoute } from '../types';
import { ArrowLeft, Clock, Calendar, Share2, Tag, ShieldCheck, Sparkles } from 'lucide-react';

interface BlogPostPageProps {
  post: BlogPost | null;
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  allPosts: BlogPost[];
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onBack,
  onSelectPost,
  allPosts
}) => {
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Article not found</h2>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded bg-[#D4AF37] text-black text-xs font-semibold"
        >
          Return to Gazette
        </button>
      </div>
    );
  }

  const related = allPosts.filter(p => p.id !== post.id).slice(0, 2);

  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs text-[#8E8E9C] hover:text-[#D4AF37] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Automotive Gazette</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-semibold uppercase tracking-widest">
          <span>{post.category}</span>
          <span className="text-[#4E4E5A]">&middot;</span>
          <span className="text-[#8E8E9C] font-normal">{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-[1.2] text-balance">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-[#B3B3C0] leading-relaxed italic border-l-2 border-[#D4AF37] pl-4">
          {post.excerpt}
        </p>

        {/* Author & Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#20202A] text-xs text-[#8A8A96]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#201D13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-display font-bold">
              {post.author.name[0]}
            </div>
            <div>
              <span className="text-white font-semibold block">{post.author.name}</span>
              <span className="text-[11px] text-[#7A7A88]">{post.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{post.publishedAt}</span>
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181822] border border-[#2A2A38] hover:border-[#D4AF37] text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Featured Image */}
      <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-[#242430]">
        <img
          src={post.featuredImage}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Prose Content */}
      <div 
        className="prose prose-invert max-w-none space-y-6 text-sm text-[#CCCCCC] leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:font-display [&>h2]:mt-8 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-[#F3E5AB] [&>blockquote]:border-l-2 [&>blockquote]:border-[#D4AF37] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#E5E5E8] [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="pt-6 border-t border-[#1F1F28] flex items-center gap-2 flex-wrap text-xs">
          <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[#7A7A88]">Topics:</span>
          {post.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded bg-[#16161E] border border-[#262633] text-[#A5A5B2]">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* SEO Transparency Strip (Visual WordPress Proof) */}
      <div className="p-4 bg-[#111116] border border-[#22222E] rounded-xl text-xs space-y-2">
        <div className="flex items-center justify-between text-[#8E8E9C]">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            WordPress SEO Metadata Configuration
          </span>
          <span className="font-mono text-[11px] text-[#25D366]">Status: Index / Follow</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#A0A0AD]">
          <div>Focus Keyword: <strong className="text-white">{post.seo.focusKeyword}</strong></div>
          <div className="truncate">Slug: <span className="font-mono text-[#D4AF37]">/blog/{post.slug}</span></div>
          <div className="sm:col-span-2 text-[11px] text-[#7A7A88]">
            Meta Title: {post.seo.metaTitle}
          </div>
        </div>
      </div>

      {/* Related Stories */}
      {related.length > 0 && (
        <div className="pt-10 border-t border-[#20202A] space-y-4">
          <h3 className="text-base font-bold text-white font-display uppercase">
            Related Dispatches
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(r => (
              <div
                key={r.id}
                onClick={() => onSelectPost(r)}
                className="p-4 rounded-xl bg-[#121217] border border-[#22222D] hover:border-[#D4AF37]/50 cursor-pointer transition-all space-y-2"
              >
                <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">{r.category}</span>
                <h4 className="text-xs font-bold text-white line-clamp-2">{r.title}</h4>
                <p className="text-[11px] text-[#868694]">{r.readTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
