import { Metadata } from "next"
import Link from "next/link"
import { fetchPosts } from "app/lib/contentful"

export const metadata: Metadata = {
  title: "Cazcanes Tequila",
}

export default async function Web() {
  const data = await fetchPosts()
  return (
    <div>
      <h1>Home Page</h1>
      <p>Click on a link to view the dynamic page:</p>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <Link href={`/${post.url}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
