import Container from "@/components/Container";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="auth-layout">
      <Container className="h-screen flex items-center justify-center">
        {children}
      </Container>
    </div>
  )
}