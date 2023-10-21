import { Button, Divider } from "@nextui-org/react"
import { Outlet, Link } from "react-router-dom"

export const AdminLayout = () => {
    return <div className="flex">
        <aside className="h-screen w-[200px] border-r flex flex-col gap-1">
            <div className="h-[150px]" />
            <Button as={Link} to="/admin/dashboard" radius="none" variant="light">
                Dashboard
            </Button>
            <Button as={Link} to="/admin/users" radius="none" variant="light">
                Usuarios
            </Button>
            <Button as={Link} to="/admin/categories" radius="none" variant="light">
                Categorias
            </Button>
            <Button as={Link} to="/admin/products" radius="none" variant="light">
                Productos
            </Button>
            <Button as={Link} to="/admin/tables" radius="none" variant="light">
                Mesas
            </Button>
            <Button as={Link} to="/admin/tickets" radius="none" variant="light">
                Tickets
            </Button>
            <Divider />
            <Button as={Link} to="/" replace={true} radius="none" variant="light">
                Cerrar Sesion
            </Button>
        </aside>
        <div className="overflow-auto m-10 flex-grow">
            <Outlet />
        </div>
    </div>
}