import { Routes } from "@blitzjs/next"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { PostForm } from "src/posts/components/PostForm"
import { Suspense } from "react"

const NewPostPage = () => {
  return (
    <Layout title={"Create New Post"}>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="-mt-24 w-full flex justify-center items-center flex-col px-4 py-12 gap-y-12 border-2  rounded-lg min-w-[450px] ">
          <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <PostForm />
          </Suspense>
          <p>
            <Link
              href={Routes.PostsPage()}
              className="border-2 border-green-900 py-4 px-2 text-xl rounded hover:-translate-y-0.5 transition duration-500 hover:cursor-pointer"
            >
              Posts
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

NewPostPage.authenticate = true

export default NewPostPage
