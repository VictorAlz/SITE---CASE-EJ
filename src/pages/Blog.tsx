import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NewsGrid } from "@/components/TechNews";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-posts";

const Blog = () => {
  const [category, setCategory] = useState("Todos");
  const categories = ["Todos", ...new Set(blogPosts.map(post => post.category))];
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-custom pb-24 pt-36 md:pt-44">
        <p className="mb-4 font-mono text-xs uppercase text-highlight">CASE EJ · Para universitários</p>
        <h1 className="font-serif text-5xl font-normal tracking-normal md:text-7xl">Blog <em className="text-highlight">TECH</em></h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Do campus ao mercado: notícias, descobertas e perspectivas para conectar seus estudos ao mundo da tecnologia.</p>
        <div className="my-10 flex flex-wrap gap-2" aria-label="Categorias do blog">
          {categories.map(item => <Button key={item} variant={item === category ? "default" : "outline"} onClick={() => setCategory(item)} aria-pressed={item === category} className="rounded-md font-mono text-xs">{item}</Button>)}
        </div>
        <NewsGrid category={category} />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;