import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { blogPosts, formatPostDate } from "@/lib/blog-posts";
import NotFound from "@/pages/NotFound";

const BlogArticle = () => {
  const { slug } = useParams();
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return <NotFound />;
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-custom pb-24 pt-32 md:pt-40">
        <article className="mx-auto max-w-3xl">
          <Button asChild variant="link" className="mb-8 h-auto p-0 font-mono text-xs"><Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Voltar ao blog</Link></Button>
          <div className="mb-5 flex flex-wrap gap-4 font-mono text-xs uppercase"><span className="text-highlight">{post.category}</span><time className="text-muted-foreground" dateTime={post.date}>{formatPostDate(post.date)}</time></div>
          <h1 className="font-serif text-4xl font-normal leading-tight tracking-normal md:text-5xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <p className="mt-5 font-mono text-xs text-muted-foreground">Curadoria CASE EJ · Fonte: {post.source}</p>
          <img src={post.image} alt={post.imageAlt} className="my-10 aspect-video w-full rounded-md object-cover" />
          <div className="space-y-6 text-lg leading-relaxed">{post.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          <h2 className="mb-4 mt-10 font-serif text-3xl font-normal tracking-normal">Por que isso importa na universidade?</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{post.studentTakeaway}</p>
          <Button asChild variant="outline" className="mt-8 max-w-full rounded-md"><a href={post.sourceUrl} target="_blank" rel="noopener noreferrer">Fonte: {post.source}<ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArticle;