import { createBrowserRouter } from "react-router-dom";
import { LoginRoute } from "./routes/LoginRoute";
import { AdminLayout } from "./components/layouts/AdminLayout";
import {
    AdminDashboardRoute,
    AdminUsersRoute,
    AdminCategoriesRoute,
    AdminProductsRoute,
    AdminTablesRoute,
    AdminTicketsRoute,
    AdminProductsCategoriesRoute,
} from "./routes/admin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginRoute />,
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDashboardRoute />,
                index: true,
            },
            {
                path: "/admin/users",
                element: <AdminUsersRoute />,
            },
            {
                path: "/admin/categories",
                element: <AdminCategoriesRoute />,
            },
            {
                path: "/admin/products",
                element: <AdminProductsRoute />,
            },
            {
                path: "/admin/products/:idProduct/categories",
                element: <AdminProductsCategoriesRoute />
            },
            {
                path: "/admin/tables",
                element: <AdminTablesRoute />,
            },
            {
                path: "/admin/tickets",
                element: <AdminTicketsRoute />,
            },
        ]
    },
]);
