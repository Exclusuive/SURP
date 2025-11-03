import { useState } from "react";
import RealtimePayments from "../../components/admin/RealtimePayments";
import ApiConnection from "../../components/admin/ApiConnection";

type MenuKey = "realtime" | "api";

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("realtime");

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <aside className="w-60 bg-gray-900 text-white flex flex-col">
        <div className="px-4 py-5 text-lg font-semibold border-b border-gray-800">
          Admin Dashboard
        </div>
        <nav className="flex-1 py-3">
          <button
            className={`w-full text-left px-4 py-3 hover:bg-gray-800 ${
              activeMenu === "realtime" ? "bg-gray-800" : ""
            }`}
            onClick={() => setActiveMenu("realtime")}
          >
            실시간 Payment 현황
          </button>
        </nav>
        <div className="px-4 py-3 text-xs text-gray-400 border-t border-gray-800">
          © {new Date().getFullYear()}
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold">
            {activeMenu === "realtime" ? "실시간 Payment 현황" : "API 연결"}
          </h1>
        </header>

        <section className="p-6">
          {activeMenu === "realtime" ? <RealtimePayments /> : <ApiConnection />}
        </section>
      </main>
    </div>
  );
}
