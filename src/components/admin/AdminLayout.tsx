import { useState, createContext, useContext, type ReactNode } from "react";
import Dashboard from "./Dashboard";
import PaymentRecords from "./PaymentRecords";

type AdminPage = "dashboard" | "payment";

type AdminLayoutContextType = {
  currentPage: AdminPage;
  setCurrentPage: (page: AdminPage) => void;
};

const AdminLayoutContext = createContext<AdminLayoutContextType | undefined>(
  undefined
);

export const useAdminLayout = () => {
  const context = useContext(AdminLayoutContext);
  if (!context) {
    throw new Error("useAdminLayout must be used within AdminLayout");
  }
  return context;
};

type AdminLayoutProps = {
  children?: ReactNode;
  initialPage?: AdminPage;
};

export default function AdminLayout({
  children,
  initialPage = "dashboard",
}: AdminLayoutProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>(initialPage);

  const contextValue: AdminLayoutContextType = {
    currentPage,
    setCurrentPage,
  };

  const renderPage = () => {
    if (children) {
      return children;
    }

    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "payment":
        return <PaymentRecords />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayoutContext.Provider value={contextValue}>
      <div className="flex h-screen w-full bg-gray-50">
        <aside className="w-60 bg-gray-900 text-white flex flex-col">
          <div className="px-4 py-5 text-lg font-semibold border-b border-gray-800">
            Admin Dashboard
          </div>
          <nav className="flex-1 py-3">
            <button
              className={`w-full text-left px-4 py-3 hover:bg-gray-800 ${
                currentPage === "dashboard" ? "bg-gray-800" : ""
              }`}
              onClick={() => setCurrentPage("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`w-full text-left px-4 py-3 hover:bg-gray-800 ${
                currentPage === "payment" ? "bg-gray-800" : ""
              }`}
              onClick={() => setCurrentPage("payment")}
            >
              Payment Records
            </button>
          </nav>
          <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-800">
            © 2025 ExcluSuive
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{renderPage()}</main>
      </div>
    </AdminLayoutContext.Provider>
  );
}
