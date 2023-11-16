import { useCallback, useState } from "react"
import useSWR from "swr"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Card,
    CardBody,
    Input,
    Button,
    useDisclosure,
} from "@nextui-org/react"
import { Link } from "react-router-dom"
import { MdDelete, MdAddLink } from 'react-icons/md'
import { useProduct } from "@/hooks/useProduct"
import { YesNoModal } from "@/components/modals/YesNoModal"
import dayjs from "dayjs"

export const ProductsTable = () => {
    const { data, mutate } = useSWR('/products')
    const { deleteProduct } = useProduct()
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    const [selectedProduct, setSelectedProduct] = useState()
    const [searchText, setSearchText] = useState("")

    const cellBuilder = useCallback((product, key) => {
        switch (key) {
            case 'id': return product.id
            case 'name': return product.name
            case 'description': return product.description
            case 'price': return `$${product.price}`
            case 'availableFrom': return dayjs(product.available_from).format("DD/MM/YYYY")
            case 'availableUntil': return dayjs(product.available_until).format("DD/MM/YYYY")
            case 'actions': return <div className="flex gap-1">
                <Button
                    color="danger"
                    isIconOnly
                    onClick={() => { setSelectedProduct(product); onOpen() }}
                >
                    <MdDelete className="text-xl" />
                </Button>
                <Button
                    isIconOnly
                    as={Link}
                    to={`/admin/products/${product.id}/categories`}
                >
                    <MdAddLink className="text-xl" />
                </Button>
            </div>
        }
    }, [])

    return <>
        <Card className="mb-5">
            <CardBody>
                <Input
                    placeholder="Buscar"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </CardBody>
        </Card>
        <Table aria-label="No hay productos">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={data?.filter(p => p.name.toLowerCase().startsWith(searchText)) || []}>
                {(product) => <TableRow key={product.id}>
                    {(columnKey) => <TableCell>{cellBuilder(product, columnKey)}</TableCell>}
                </TableRow>}
            </TableBody>
        </Table>
        <YesNoModal
            title="Eliminar Producto"
            body={`Seguro que desea eliminar el producto "${selectedProduct?.name}"?`}
            onAccept={() => deleteProduct(selectedProduct?.id).then(_ => mutate())}
            onOpenChange={onOpenChange}
            isOpen={isOpen}
        />
    </>
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
    {
        key: "availableFrom",
        label: "Disponible desde",
    },
    {
        key: "availableUntil",
        label: "Disponible hasta",
    },
    {
        key: "actions",
        label: "Actions",
    }
];
