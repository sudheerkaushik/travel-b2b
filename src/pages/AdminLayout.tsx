import Adminlinks from "@/app/components/admin/links";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
    <div className="admin-layout">
      <header className="navbar navbar-dark bg-dark">
        <nav className="container">
          <Link href="/admin/trip-list">Trip List</Link>
          <Link href="/admin/agent-list">Agent List</Link>
        </nav>
      </header>
      <Adminlinks/>
      <main className="content">{children}</main>
      <footer className="footer">
        <p>Admin Portal &copy; 2025</p>
      </footer>
    </div>
    </body>
    </html>
  );
}
