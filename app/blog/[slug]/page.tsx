import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Reveal from "@/components/ui/Reveal";
import ArticleBody from "@/components/blog/ArticleBody";
import BlogSidebar from "@/components/seo/BlogSidebar";
import RelatedContent from "@/components/seo/RelatedContent";
import ContactCta from "@/components/sections/ContactCta";
import { pageMetadata, jsonLdScript } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { posts, getPost } from "@/lib/data/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [post.category.toLowerCase(), "limpieza industrial", "blog industrial"],
  });
}

function articleJsonLd(post: NonNullable<ReturnType<typeof getPost>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
  };
}

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleJsonLd(post))} />

      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <div className="py-12">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Article body with contextual internal links */}
          <article aria-label="Contenido del artículo">
            <Reveal>
              <ArticleBody slug={post.slug} />
            </Reveal>

            <div className="mt-12">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue">
                <ArrowLeft size={16} /> Volver al blog
              </Link>
            </div>
          </article>

          <Reveal delay={0.1}>
            <BlogSidebar currentSlug={post.slug} />
          </Reveal>
        </div>
      </div>

      <RelatedContent slug={post.slug} title="Sigue explorando" />

      <ContactCta />
    </>
  );
}
