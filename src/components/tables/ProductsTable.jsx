import useSWR from "swr"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@nextui-org/react"

export const ProductsTable = () => {
    const { data, error, isLoading } = useSWR('/products')

    return <Table aria-label="No hay productos">
        <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={data || []}>
            {(user) => <TableRow key={user.id}>
                {(columnKey) => <TableCell>{getKeyValue(user, columnKey)}</TableCell>}
            </TableRow>}
        </TableBody>
    </Table>
}

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "name",
        label: "Nombre",
    },
    {
        key: "description",
        label: "Descripcion",
    },
    {
        key: "price",
        label: "Price",
    },
];
