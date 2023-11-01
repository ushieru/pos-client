import {
    Card,
    CardHeader,
} from "@nextui-org/react"
import { AdminsTable } from "@/components/tables/AdminsTable"

export const AdminUsersRoute = () => {

    return <div >
        <Card className="mb-5">
            <CardHeader className="text-xl font-semibold">Usuarios</CardHeader>
        </Card>
        <AdminsTable />
    </div>
}