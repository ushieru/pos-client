import { useCallback, useState } from "react"
import useSWR from "swr"
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Chip,
    useDisclosure,
} from "@nextui-org/react"
import { MdDelete, MdEdit } from 'react-icons/md'
import { useUser } from "@/hooks/useUser"
import { YesNoModal } from "../modals/YesNoModal"
import { UpdateUserModal } from "../modals/user/UpdateUserModal"

export const UsersTable = () => {
    const { data, mutate } = useSWR('/users')
    const [selectedUser, setSelectedUser] = useState()
    const { deleteUser } = useUser()
    const { isOpen: deleteIsOpen, onOpenChange: deleteOnOpenChange, onOpen: deleteOnOpen } = useDisclosure()
    const { isOpen: updateIsOpen, onOpenChange: updateOnOpenChange, onOpen: updateOnOpen } = useDisclosure()

    const cellBuilder = useCallback((user, columnKey) => {
        switch (columnKey) {
            case 'id': return user.id
            case 'isActive': return user.account.is_active ? <div className="w-2 h-2 bg-green-500 rounded-full" /> : <div className="w-2 h-2 bg-red-500 rounded-full" />
            case 'name': return user.name
            case 'email': return user.email
            case 'username': return user.account.username
            case 'rol':
                const rol = user.account.account_type
                return rol == "admin"
                    ? <Chip>Administrador</Chip>
                    : rol == "cashier"
                        ? <Chip>Cajero</Chip>
                        : <Chip>Mesero</Chip>
            case 'actions': return <div className="flex gap-1">
                <Button
                    color="danger"
                    isIconOnly
                    onPress={() => { setSelectedUser(user); deleteOnOpen() }}>
                    <MdDelete className="text-xl" />
                </Button >
                <Button
                    color="secondary"
                    isIconOnly
                    onPress={() => { setSelectedUser(user); updateOnOpen() }}>
                    <MdEdit className="text-xl" />
                </Button>
            </div >
        }
    }, [])



    return <>
        <Table aria-label="No hay usuarios">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={data || []}>
                {(user) => <TableRow key={user.id}>
                    {(columnKey) => <TableCell>{cellBuilder(user, columnKey)}</TableCell>}
                </TableRow>}
            </TableBody>
        </Table>
        <YesNoModal
            title="Eliminar Usuario"
            body={`Seguro que desea eliminar el usuario "${selectedUser?.name}"?`}
            onAccept={() => deleteUser(selectedUser?.id).then(_ => mutate())}
            onOpenChange={deleteOnOpenChange}
            isOpen={deleteIsOpen}
        />
        <UpdateUserModal
            isOpen={updateIsOpen}
            onOpenChange={updateOnOpenChange}
            user={selectedUser}
        />
    </>
}

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: 'isActive',
        label: 'Estado'
    },
    {
        key: "name",
        label: "Nombre",
    },
    {
        key: "username",
        label: "Nombre de usuario",
    },
    {
        key: 'rol',
        label: 'Rol'
    },
    {
        key: "email",
        label: "Email",
    },
    {
        key: "actions",
        label: "Acciones",
    },
];
