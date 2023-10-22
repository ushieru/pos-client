import {
    Card,
    CardHeader,
    CardBody,
    Button,
    useDisclosure,
} from "@nextui-org/react"
import { ProductsTable } from "@/components/tables/ProductsTable"
import { CreateProductModal } from "@/components/modals/product/CreateProductModal"

export const AdminProductsRoute = () => {
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    return <div>
        <Card className="mb-5">
            <CardHeader className="text-xl font-semibold">Productos</CardHeader>
        </Card>
        <Card className="mb-5">
            <CardBody>
                <Button onClick={onOpen}>Nuevo Producto</Button>
            </CardBody>
        </Card>
        <ProductsTable />
        <CreateProductModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
}