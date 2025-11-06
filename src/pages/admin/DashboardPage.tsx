import { useState } from "react";

import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/Dashboard";
import PaymentRecords from "@/components/admin/PaymentRecords";

type MenuKey = "dashboard" | "payment";

export default function DashboardPage() {
  const [activeMenu] = useState<MenuKey>("dashboard");

  return (
    <AdminLayout>
      <section className="p-6 space-y-6">
        {activeMenu === "dashboard" ? <Dashboard /> : <PaymentRecords />}
      </section>
    </AdminLayout>
  );
}
