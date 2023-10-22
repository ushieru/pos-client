import {
    Button,
    Card,
    CardBody,
    CardHeader,
    useDisclosure
} from "@nextui-org/react"
import { CategoriesTable } from "@/components/tables/CategoriesTable"
import { CreateCategoryModal } from "@/components/modals/category/CreateCategoryModal"

export const AdminCategoriesRoute = () => {
    const { isOpen, onOpenChange, onOpen } = useDisclosure()

    return <div>
        <Card className="mb-5">
            <CardHeader className="text-xl font-semibold">Categorias</CardHeader>
        </Card>
        <Card className="mb-5">
            <CardBody>
                <Button onClick={onOpen}>Nueva Categoria</Button>
            </CardBody>
        </Card>
        <CategoriesTable />
        <CreateCategoryModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
}