import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import { UpdatePostSchema } from "src/posts/schemas"
import { LabeledTextField, LabeledTextArea } from "src/core/components/LabeledTextField"
import { FORM_ERROR, Form } from "src/core/components/Form"
import getPost from "src/posts/queries/getPost"
import updatePost from "src/posts/mutations/updatePost"

type FormProps = {}

export const EditForm = (props: FormProps) => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post, { setQueryData }] = useQuery(
    getPost,
    { id: postId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePostMutation] = useMutation(updatePost)

  return (
    <Form
      schema={UpdatePostSchema}
      initialValues={post}
      onSubmit={async (values) => {
        try {
          const updated = await updatePostMutation({
            ...values,
          })
          await setQueryData(updated)
          await router.push(Routes.ShowPostPage({ postId: updated.id }))
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    >
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextArea cols={30} rows={10} name="content" label="Content" placeholder="Content" />

      <button className="bg-violet-500 text-white px-8 ml-32 my-6 text-xl py-2 rounded">
        Update post
      </button>
    </Form>
  )
}
