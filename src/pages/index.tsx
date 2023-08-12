import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div className="flex items-center gap-x-4">
        <h3 className="text-xl ">
          Hi {currentUser.name}, you are signed in as {currentUser.role === "ADMIN" ? "an" : "a"}{" "}
          {currentUser.role}{" "}
        </h3>
        <button
          className="bg-violet-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </div>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="-mt-20 flex justify-center items-center flex-col px-24 gap-y-12">
          <h1 className="text-6xl text-violet-500 font-bold mb-16">
            Welcome to the Blitz Fullstack Application
          </h1>
          <UserInfo />
          <Link href={Routes.PostsPage()}>
            {" "}
            <button className="border-2 border-green-900 py-4 px-2 text-xl rounded hover:-translate-y-0.5 transition duration-500 hover:cursor-pointer">
              Click here to see all Posts
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
