import { fetchPosts } from "app/lib/contentful"
import Link from "next/link"

export default async function Page({ params }: { params: Promise<{ url: string }> }) {
  // const posts = await fetch('https://contentful-api/posts?url=${url}').then((res) => res.json())
  const posts = await fetchPosts()
  const url = (await params).url
  const post = posts.find((p) => p.url === url)
  if (!post) {
    return null
  }
  return (
    <div>
      <h1>My Post: {post.title}</h1>
      <Link href="/">Go Back</Link>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await fetchPosts()

  return posts.map((post) => ({
    url: post.url,
  }))
}
