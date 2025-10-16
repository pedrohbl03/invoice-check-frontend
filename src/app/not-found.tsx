import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <h2 className="text-7xl font-bold">404!</h2>
      <div>
        <p className="text-md text-center">We believe that your are lost.</p>
        <p className="text-md text-center">But don&apos;t worry, you can find your way back to the homepage.</p>
      </div>
      <Button variant="link" className="text-blue-500 text-sm" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}