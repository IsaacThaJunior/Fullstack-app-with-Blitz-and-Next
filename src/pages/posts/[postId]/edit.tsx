import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getPost from "src/posts/queries/getPost"
import { EditForm } from "src/posts/components/EditForm"

export const EditPost = () => {
  const postId = useParam("postId", "number")
  const [post] = useQuery(
    getPost,
    { id: postId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )

  return (
    <>
      <Head>
        <title>Edit Post {post.id}</title>
      </Head>

      <div className="w-full mt-12  py-4 flex justify-center items-center flex-col px-4  gap-y-12 border-2 border-slate-200 rounded-lg min-w-[450px] ">
        <h1 className="text-3xl text-center">Editing {post.title}</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <EditForm />
        </Suspense>
      </div>
    </>
  )
}

const EditPostPage = () => {
  return (
    <div className="mt-14 justify-center w-screen h-screen text-left px-24">
      <p className="cursor-pointer bg-violet-500 p-4 text-white text-lg rounded hover:-translate-y-0.5 transition-all duration-700 inline">
        <Link href={Routes.PostsPage()}>Back to the Posts Page</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <EditPost />
      </Suspense>
    </div>
  )
}

EditPostPage.authenticate = true
EditPostPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPostPage
