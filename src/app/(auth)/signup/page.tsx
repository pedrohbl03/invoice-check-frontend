import Link from 'next/link'
import { SignUpForm } from '@/components/Auth/SignUpForm'

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-6 text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="text-sm text-muted-foreground">Fill the form to continue</p>
      </div>
      <SignUpForm />
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Already have an account?{' '}
        <Link href="/signin" className="underline underline-offset-4 hover:text-primary">
          Sign in
        </Link>
      </p>
    </div>
  )
}