import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import getPosts from "src/posts/queries/getPosts"

// importing the currentUser hook
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

export const PostsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="w-[80rem] px-12 py-4">
      <h2 className="text-3xl text-center font-bold mb-5">All Posts</h2>
      <ol className="mb-8 grid grid-cols-3 gap-6  ">
        {posts.map((post) => (
          <li key={post.id} className="border border-red-500 p-5 ">
            <Link href={Routes.ShowPostPage({ postId: post.id })}>
              <h3 className="text-xl mb-8">{post.title}</h3>
              <p className="truncate">{post.content}</p>
            </Link>
          </li>
        ))}
      </ol>

      {posts.length < 1 ? (
        <h1 className="text-4xl font-bold text-center">
          There are no posts available!. Do check back soon
        </h1>
      ) : (
        <div className="flex justify-between">
          <button
            disabled={page === 0}
            onClick={goToPreviousPage}
            className="bg-violet-500 p-2 text-white text-lg rounded hover:-translate-y-0.5 transition-all duration-700"
          >
            Previous
          </button>
          <button
            disabled={!hasMore}
            onClick={goToNextPage}
            className="bg-violet-500 p-2 px-3 text-white text-lg rounded hover:-translate-y-0.5 transition-all duration-700 disabled:bg-slate-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

const PostsPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Layout title="Posts">
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="-mt-24 flex justify-center items-center flex-col px-4 py-12 gap-y-12 border-2 border-slate-200 rounded-lg min-w-[450px] ">
          <Suspense fallback={<div>Loading...</div>}>
            <PostsList />
          </Suspense>

          {/* Checking the logged in user role and using it to render the create button */}
          {currentUser && currentUser.role === "ADMIN" && (
            <Link href={Routes.NewPostPage()}>
              <button className="border-2 border-green-900 py-4 px-2 text-xl rounded hover:-translate-y-0.5 transition duration-500 hover:cursor-pointer">
                Create Post
              </button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default PostsPage
