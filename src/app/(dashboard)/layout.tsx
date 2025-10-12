import Header from "@/components/Header";
import Container from "@/components/Container";
import CustomBreadcrumb from "@/components/CustomBreadcrumb";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <Header />
      <Container className="py-2 px-4">
        <CustomBreadcrumb />
        <div className="dashboard-layout mt-4">
          {children}
        </div>
      </Container>
    </div>

  );
}
