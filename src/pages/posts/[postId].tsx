import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import getPost from "src/posts/queries/getPost"
import deletePost from "src/posts/mutations/deletePost"

// importing the currentUser hook
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

export const Post = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [deletePostMutation] = useMutation(deletePost)
  const [post] = useQuery(getPost, { id: postId })

  const currentUser = useCurrentUser()

  return (
    <>
      <Head>
        <title>Post {post.id}</title>
      </Head>

      <div className="w-full mt-12 px-12 py-4">
        <h1 className="text-5xl font-bold text-center"> {post.title}</h1>

        <p className="text-2xl mt-4">{post.content}</p>

        {/* Checking the logged in user role and using it to render the create button */}
        {currentUser && currentUser.role === "ADMIN" && (
          <div className="mt-24 gap-24 flex justify-center">
            <button className="bg-violet-500 text-white px-8 text-xl py-2 rounded">
              <Link href={Routes.EditPostPage({ postId: post.id })}>Edit</Link>
            </button>

            <button
              type="button"
              className="bg-red-500 text-white px-6 py-2 text-xl rounded"
              onClick={async () => {
                if (window.confirm("This post will be deleted")) {
                  await deletePostMutation({ id: post.id })
                  await router.push(Routes.PostsPage())
                }
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  )
}

const ShowPostPage = () => {
  return (
    <div className="mt-14 justify-center w-screen h-screen text-left px-24">
      <p className="cursor-pointer bg-violet-500 p-4 text-white text-lg rounded hover:-translate-y-0.5 transition-all duration-700 inline">
        <Link href={Routes.PostsPage()}>Back to the Posts Page</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  )
}

ShowPostPage.authenticate = true
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPostPage
