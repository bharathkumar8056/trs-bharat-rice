import { Suspense } from "react"

export default function RiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      {children}
    </Suspense>
  )
}
