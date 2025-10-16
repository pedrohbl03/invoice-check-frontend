import Link from 'next/link'
import { SignInForm } from '@/components/Auth/SignInForm'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'

export default function SignInPage() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-6 text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">Access your account</p>
      </div>
      <Suspense fallback={<Spinner className="mx-auto h-12 w-12" />}>
        <SignInForm />
      </Suspense>
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Didn&apos;t have an account?{' '}
        <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
          Create an account
        </Link>
      </p>
    </div>
  )
}