import { Card, CardHeader } from "@nextui-org/react"
import { ProductsTable } from "@/components/tables/ProductsTable"

export const AdminProductsRoute = () => {
    return <div>
        <Card className="mb-5">
            <CardHeader className="text-xl font-semibold">Productos</CardHeader>
        </Card>
        <ProductsTable />
    </div>
}