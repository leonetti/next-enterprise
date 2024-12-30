export async function fetchPosts() {
  // Simulate a sample response with a delay (e.g., 500ms)
  const response = await new Promise<{
    ok: boolean
    json: () => { id: string; title: string; content: string; url: string }[]
  }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          ok: true,
          json: () => [
            { id: "data-1", title: "Post 1", content: "This is the content of Post 1", url: "post-1" },
            { id: "data-2", title: "Post 2", content: "This is the content of Post 2", url: "post-2" },
            { id: "data-3", title: "Post 3", content: "This is the content of Post 3", url: "post-3" },
          ],
        }),
      500 // Simulated delay in milliseconds
    )
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: Mocked Error`)
  }

  return response.json() // Return the fake data
}
