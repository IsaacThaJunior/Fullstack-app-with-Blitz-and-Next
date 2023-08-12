import React, { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import { FORM_ERROR, Form } from "src/core/components/Form"
import { LabeledTextField, LabeledTextArea } from "src/core/components/LabeledTextField"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
export { FORM_ERROR } from "src/core/components/Form"

import createPost from "../mutations/createPost"
import { CreatePostSchema } from "../schemas"

type FormProps = {}

export const PostForm = (props: FormProps) => {
  const [createPostMutation] = useMutation(createPost)
  const router = useRouter()

  return (
    <Form
      schema={CreatePostSchema}
      initialValues={{ title: "", content: "" }}
      onSubmit={async (values) => {
        try {
          const post = await createPostMutation(values)
          await router.push(Routes.PostsPage({ postId: post.id }))
        } catch (error) {
          return { [FORM_ERROR]: error.toString() }
        }
      }}
    >
      <LabeledTextField
        name="title"
        label="Title"
        placeholder="Please enter the title of your post"
      />
      <LabeledTextArea
        name="content"
        label="Content"
        placeholder="Please the content of your post"
        cols={30}
        rows={10}
      />

      <button className="bg-violet-500 text-white px-8 ml-32 my-6 text-xl py-2 rounded">
        Create post
      </button>
    </Form>
  )
}
