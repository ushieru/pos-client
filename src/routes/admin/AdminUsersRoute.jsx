import {
    Card,
    CardHeader,
    CardBody,
    Button,
    useDisclosure,
} from "@nextui-org/react"
import { UsersTable } from "@/components/tables/UsersTable"
import { CreateUserModal } from "@/components/modals/user/CreateUserModal"

export const AdminUsersRoute = () => {
    const { isOpen, onOpenChange, onOpen } = useDisclosure()

    return <>
        <div >
            <Card className="mb-5">
                <CardHeader className="text-xl font-semibold">Usuarios</CardHeader>
            </Card>
            <Card className="mb-5">
                <CardBody>
                    <Button onClick={onOpen}>Nuevo Usuario</Button>
                </CardBody>
            </Card>
            <UsersTable />
        </div>
        <CreateUserModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
}
