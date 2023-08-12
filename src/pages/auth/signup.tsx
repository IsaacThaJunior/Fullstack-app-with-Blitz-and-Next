import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { SignupForm } from "src/auth/components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="-mt-24 flex justify-center items-center flex-col px-4 py-12 gap-y-12 border-2 border-slate-200 rounded-lg min-w-[450px] ">
          <SignupForm onSuccess={() => router.push(Routes.Home())} />
        </div>
      </div>
    </Layout>
  )
}

export default SignupPage
