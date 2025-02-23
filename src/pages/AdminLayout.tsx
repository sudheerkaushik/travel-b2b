import Adminlinks from "@/app/components/admin/links";
import Navigation from "@/app/components/common/navbar";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div className="admin-layout container-fluid">
        <div className="row">
          <div className="col-2 mt-4">
            <Adminlinks />
          </div>
          <div className="col-10">
            <main className="content">{children}</main>
          </div>
          <div className="col-12">
            <footer className="footer">
              <p>Admin Portal &copy; 2025</p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
