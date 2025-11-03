import { useState } from "react";
import RealtimePayments from "../../components/admin/RealtimePayments";
import ApiConnection from "../../components/admin/ApiConnection";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

type MenuKey = "realtime" | "api";

export default function DashboardPage() {
  const [activeMenu] = useState<MenuKey>("realtime");

  return (
    <AdminLayout>
      <section className="p-6 space-y-6">
        {activeMenu === "realtime" ? <RealtimePayments /> : <ApiConnection />}

        <div className="flex justify-end gap-3">
          <Button
            variant="default"
            onClick={() => {
              console.log("Collect clicked");
            }}
          >
            Collect
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              console.log("Refund clicked");
            }}
          >
            Refund
          </Button>
        </div>
      </section>
    </AdminLayout>
  );
}
