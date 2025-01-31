import Navigation from "@/app/components/common/navbar";
// import "../styles/layout.scss";
import Footer from "@/app/components/common/footer";
import "../styles/global.scss";
import { useRouter } from "next/router";
import AgentLayout from "./AgentLayout";
import AdminLayout from "./AdminLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Determine role from the URL path
  const isAgentRoute = router.pathname.startsWith("/");
  const isAdminRoute = router.pathname.startsWith("/admin");

  if (isAgentRoute) {
    return (
      <AgentLayout>
        {children}
      </AgentLayout>
    );
  }

  if (isAdminRoute) {
    return (
      <AdminLayout>
        {children}
      </AdminLayout>
    );
  }


  return (
    <html lang="en">
      <body>
       <Navigation />
        <main className="main-container">{children}</main>
       <Footer />
      </body>
    </html>
  );
}
