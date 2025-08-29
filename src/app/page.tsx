import { redirect } from "next/navigation"

export default async function Home() {
  redirect("/dashboard")
}

// Prevent static generation for this page
export const dynamic = 'force-dynamic'
export const revalidate = 0
