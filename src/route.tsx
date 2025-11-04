import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "@/config/paths";
import PaymentRecordsPage from "./pages/admin/PaymentRecordsPage";
import PaymentPage from "./pages/users/PaymentPage";
import Home from "./pages/Home";
import PaymentDetailPage from "./pages/admin/PaymentDetailPage";
import DashboardPage from "./pages/admin/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: paths.admin.dashboard.path,
    element: <DashboardPage />,
  },
  {
    path: paths.admin.payment.path,
    element: <PaymentRecordsPage />,
  },
  {
    path: paths.admin.payment.path,
    element: <PaymentDetailPage />,
  },
  {
    path: paths.user.path,
    element: <PaymentPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
