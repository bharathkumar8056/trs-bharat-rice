import type React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Quote,
  Sparkles,
  BookOpen,
} from "lucide-react"
import blogPosts, { type BlogSection } from "@/lib/blog"
import { BlogImage } from "@/components/blog-image"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: "Blog | TRS Bharat" }
  return {
    title: `${post.title} | TRS Bharat Blog`,
    description: post.excerpt,
  }
}

function Section({ section }: { section: BlogSection }) {
  const sectionId = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  return (
    <section id={sectionId} className="scroll-mt-24 mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-5 leading-tight border-l-4 border-amber-500 pl-4">
        {section.heading}
      </h2>
      <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
        {section.paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {section.list && (
        <Card className="mt-6 border-amber-200 bg-amber-50/60 shadow-sm">
          <CardContent className="p-6">
            {section.list.title && (
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
                {section.list.title}
              </h3>
            )}
            <ul className="space-y-2">
              {section.list.items.map((item, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {section.quote && (
        <blockquote className="mt-6 border-l-4 border-blue-900 bg-gradient-to-r from-blue-50 to-white p-6 rounded-r-lg shadow-sm">
          <Quote className="w-8 h-8 text-blue-900/30 mb-2" />
          <p className="text-lg sm:text-xl italic text-blue-900 leading-relaxed mb-3">
            &ldquo;{section.quote.text}&rdquo;
          </p>
          {section.quote.author && (
            <footer className="text-sm font-semibold text-amber-700">— {section.quote.author}</footer>
          )}
        </blockquote>
      )}
    </section>
  )
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : b.category === post.category ? 1 : 0))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                <img
                  src="/assets/trs-logo.jpg"
                  alt="TRS Bharat Global Solutions Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">TRS Bharat Global Solutions</h1>
                <p className="text-blue-200 text-sm">Premium Export Solutions</p>
              </div>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="text-black border-white hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Posts
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero with image background */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="absolute inset-0 opacity-30">
          <BlogImage
            src={post.image}
            alt={post.title}
            category={post.category}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Badge className="bg-amber-600 hover:bg-amber-600 text-white text-sm">{post.category}</Badge>
            <span className="flex items-center text-sm text-blue-100">
              <Calendar className="w-4 h-4 mr-1.5" />
              {post.date}
            </span>
            <span className="flex items-center text-sm text-blue-100">
              <Clock className="w-4 h-4 mr-1.5" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
          <p className="text-lg sm:text-xl text-amber-200 italic leading-relaxed">{post.subtitle}</p>
        </div>
      </section>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Author strip */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-amber-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {post.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="font-semibold text-blue-900 text-sm">{post.author}</p>
              <p className="text-xs text-gray-500">{post.authorRole}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Long read
          </div>
        </div>

        {/* Table of contents */}
        <Card className="mb-10 border-blue-200 bg-blue-50/40">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-amber-600" />
              In this article
            </h3>
            <ol className="space-y-2 text-sm">
              {post.sections.map((section, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-amber-600 font-semibold mr-2 flex-shrink-0">{idx + 1}.</span>
                  <a
                    href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-blue-800 hover:text-amber-600 hover:underline transition-colors"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Intro with drop cap */}
        <p className="text-lg sm:text-xl text-gray-800 leading-relaxed mb-12 first-letter:text-6xl first-letter:font-bold first-letter:text-blue-900 first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">
          {post.intro}
        </p>

        {/* Sections */}
        {post.sections.map((section, idx) => (
          <Section key={idx} section={section} />
        ))}

        {/* Key Takeaways */}
        <Card className="my-12 bg-gradient-to-br from-blue-900 to-blue-800 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center mb-5">
              <Sparkles className="w-6 h-6 mr-2 text-amber-300" />
              <h2 className="text-2xl font-bold">Key Takeaways</h2>
            </div>
            <ul className="space-y-3">
              {post.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start text-blue-50">
                  <CheckCircle2 className="w-5 h-5 mr-3 text-amber-300 flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <div className="my-12 p-6 sm:p-8 bg-amber-50/60 border-l-4 border-amber-500 rounded-r-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-3">In Closing</h3>
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed italic">{post.conclusion}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-12 pt-6 border-t border-blue-100">
          <Tag className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-blue-900 mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Author bio card */}
        <Card className="mt-10 border-blue-200 bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-900 to-amber-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-amber-700 font-semibold uppercase tracking-wide mb-1">Written by</p>
              <p className="font-bold text-blue-900 text-lg">{post.author}</p>
              <p className="text-sm text-gray-600">{post.authorRole} · TRS Bharat Global Solutions</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-blue-50/50 py-16 border-t border-blue-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center">Continue Reading</h2>
            <p className="text-blue-700 text-center mb-10">More from the TRS Bharat blog</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                  <Card className="overflow-hidden border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                      <BlogImage
                        src={rp.image}
                        alt={rp.title}
                        category={rp.category}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-amber-600 text-white text-xs">{rp.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-blue-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors">
                        {rp.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">{rp.excerpt}</p>
                      <span className="text-sm font-semibold text-amber-600 flex items-center">
                        Read article
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-8 sm:p-12 text-center max-w-5xl mx-auto shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Source Premium Indian Rice?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get in touch with our team for bulk inquiries, samples, and tailored sourcing solutions for your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rice">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto">
                Explore Rice Varieties
              </Button>
            </Link>
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
