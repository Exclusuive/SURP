import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <aside className="w-60 bg-gray-900 text-white flex flex-col">
        <div className="px-4 py-5 text-lg font-semibold border-b border-gray-800">
          Admin Dashboard
        </div>
        <nav className="flex-1 py-3">
          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-800"
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </button>
          <button
            className="w-full text-left px-4 py-3 hover:bg-gray-800"
            onClick={() => navigate("/admin/payment")}
          >
            Payment Records
          </button>
        </nav>
        <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-800">
          © 2025 ExcluSuive
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
