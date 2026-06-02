import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import blogPosts, { type BlogPost } from "@/lib/blog"
import { BlogImage } from "@/components/blog-image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden border-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="relative w-full h-56 sm:h-64 bg-gray-100 overflow-hidden block">
        <BlogImage
          src={post.image}
          alt={post.title}
          category={post.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-amber-600 text-white shadow-md">{post.category}</Badge>
        </div>
      </Link>

      {/* Preview content */}
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {post.date}
          </span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 leading-tight hover:text-amber-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-blue-700 mb-5 leading-relaxed flex-1">{post.excerpt}</p>

        <Link href={`/blog/${post.slug}`} className="mt-auto">
          <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white group/btn">
            <BookOpen className="w-4 h-4 mr-2" />
            Read the Blog
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            TRS Bharat <span className="text-amber-400">Blog</span>
          </h1>
          <p className="text-blue-100 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Insights, stories, and expertise on the world of Indian rice — from regional varieties and nutrition to
            sustainable farming and global trade.
          </p>
        </div>
      </section>

      {/* Posts */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 text-center mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More About Indian Rice?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Get in touch with our team for bulk inquiries, product samples, and expert guidance on choosing the right
            rice variety for your market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rice">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                Explore Rice Varieties
              </Button>
            </Link>
            <Link href="/#contact">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
