import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "@/config/paths";
import DashboardPage from "./pages/admin/DashboardPage";
import PaymentPage from "./pages/users/PaymentPage";
import Home from "./pages/Home";
import PaymentDetail from "./pages/admin/PaymentDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: paths.admin.path,
    element: <DashboardPage />,
  },
  {
    path: paths.admin.payment.path,
    element: <PaymentDetail />,
  },
  {
    path: paths.user.path,
    element: <PaymentPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
