import { useEffect } from "react"
import { Button, Divider } from "@nextui-org/react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { useSessionStore } from "@/stores/useSessionStore"

export const AdminLayout = () => {
    const navigate = useNavigate();
    const session = useSessionStore(s => s.session)
    const closeSession = useSessionStore(s => s.closeSession)

    useEffect(() => {
        if (!session?.token)
            return navigate("/");
    }, [session])

    return <div className="flex">
        <aside className="h-screen w-[200px] border-r flex flex-col gap-1">
            <div className="h-[150px] grid place-items-center">
                <img
                    src="/icon.svg"
                    className="w-[100px]"
                />
            </div>
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
            <Button radius="none" variant="light" onPress={closeSession}>
                Cerrar Sesion
            </Button>
        </aside>
        <div className="h-screen overflow-auto p-10 flex-grow">
            <Outlet />
        </div>
    </div>
}
