import { useState } from "react";
import RealtimePayments from "../../components/admin/RealtimePayments";
import ApiConnection from "../../components/admin/ApiConnection";
import AdminLayout from "@/components/admin/AdminLayout";

type MenuKey = "realtime" | "api";

export default function DashboardPage() {
  const [activeMenu] = useState<MenuKey>("realtime");

  return (
    <AdminLayout>
      <section className="p-6 space-y-6">
        {activeMenu === "realtime" ? <RealtimePayments /> : <ApiConnection />}
      </section>
    </AdminLayout>
  );
}
