import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blogPosts, formatPostDate } from "@/lib/blog-posts";

export const NewsGrid = ({ category = "Todos" }: { category?: string }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
    {blogPosts.filter(post => category === "Todos" || post.category === category).map(post => (
      <article key={post.slug} className="group min-w-0">
        <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-md aspect-[16/10]" aria-label={`Ler: ${post.title}`}>
          <img src={post.image} alt={post.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
        </Link>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase">
          <span className="text-highlight">{post.category}</span>
          <time dateTime={post.date} className="text-muted-foreground">{formatPostDate(post.date)}</time>
        </div>
        <h3 className="mt-3 font-serif text-2xl font-normal leading-snug tracking-normal">
          <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-highlight">{post.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <Button asChild variant="link" className="mt-4 h-auto p-0 font-mono text-xs text-foreground hover:text-highlight">
          <Link to={`/blog/${post.slug}`}>Ler matéria <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </article>
    ))}
  </div>
);

const TechNews = () => (
  <section className="section-padding bg-muted/40" aria-labelledby="tech-news-title">
    <div className="container-custom">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase text-highlight">Blog CASE EJ · Conexão universitária</p>
          <h2 id="tech-news-title" className="font-serif text-4xl font-normal tracking-normal md:text-5xl">Últimas do mundo <em className="text-highlight">TECH</em></h2>
          <p className="mt-4 max-w-xl text-muted-foreground">Tecnologia em pauta, novas ideias e o que importa para quem está construindo o futuro.</p>
        </div>
        <Button asChild variant="outline" className="w-fit shrink-0 rounded-md font-mono text-xs">
          <Link to="/blog">Explorar o blog <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <NewsGrid />
    </div>
  </section>
);

export default TechNews;