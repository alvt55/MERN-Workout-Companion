import { ClientOnly } from "./client"
// server component (entry point page)
export function generateStaticParams() {
    return [{ slug: [''] }]
  }
   
  export default function Page() {
    return <ClientOnly/>
  }