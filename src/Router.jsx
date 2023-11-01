import { createHashRouter, Outlet } from "react-router-dom";
import { LoginRoute } from "./routes/LoginRoute";
import { TicketRoute } from "./routes/TicketRoute";
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
import {
    WaiterDashboardRoute
} from "./routes/waiter"
import { CashierDashboardRoute } from "./routes/cashier/CashierDashboardRoute";
import { PrivateRoute } from "./components/PrivateRoute";

export const router = createHashRouter([
    {
        path: "/",
        element: <LoginRoute />,
    },
    {
        path: "/tickets/:ticketId",
        element: <TicketRoute />
    },
    {
        path: "/admin",
        element: <PrivateRoute accountType="admin"><AdminLayout /></PrivateRoute>,
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
    {
        path: "/cashier",
        element: <PrivateRoute accountType="cashier"><><Outlet /></></PrivateRoute>,
        children: [
            {
                path: "/cashier/dashboard",
                element: <CashierDashboardRoute />
            },
        ]
    },
    {
        path: "/waiter",
        element: <PrivateRoute accountType="waiter"><><Outlet /></></PrivateRoute>,
        children: [
            {
                path: "/waiter/dashboard",
                element: <WaiterDashboardRoute />,
            }
        ]
    },
]);
