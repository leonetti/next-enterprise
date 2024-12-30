import { notFound } from "next/navigation"
import { fetchPosts, type Post } from "src/lib/contentful"
import Link from "next/link"

async function getPost(url: string) {
  // const res = await fetch(`https://api.vercel.app/blog/${id}`, {
  //   cache: "force-cache",
  // })
  const posts = await fetchPosts()
  const post = posts.find((p) => p.url === url)
  if (!post) notFound()
  return post
}

export async function generateStaticParams() {
  // const posts = await fetch("https://api.vercel.app/blog", {
  //   cache: "force-cache",
  // }).then((res) => res.json())
  const posts = await fetchPosts()

  return posts.map((post: Post) => ({
    url: post.url,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ url: string }> }) {
  const { url } = await params
  const post = await getPost(url)

  return {
    title: post.title,
  }
}

export default async function Page({ params }: { params: Promise<{ url: string }> }) {
  const { url } = await params
  //   // const posts = await fetch('https://contentful-api/posts?url=${url}').then((res) => res.json())
  const post = await getPost(url)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link href="/">Go Back</Link>
    </article>
  )
}
