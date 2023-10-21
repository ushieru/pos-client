import { useState } from "react"
import useSWR from "swr"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    useDisclosure
} from "@nextui-org/react"
import { YesNoModal } from "@/components/modals/YesNoModal"
import { useCategory } from '@/hooks/useCategory'

export const CategoriesTable = () => {
    const { data, error, isLoading } = useSWR('/categories')
    const { deleteCategory } = useCategory()
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    const [selectedCategory, setSelectedCategory] = useState()

    const cellBuilder = (category, columnKey) => {
        switch (columnKey) {
            case 'id': return category.id
            case 'name': return category.name
            case 'actions': return <>
                <Button
                    color="danger"
                    onClick={() => { setSelectedCategory(category); onOpen() }}>
                    Delete
                </Button>
            </>
        }
    }

    return <>
        <Table aria-label="No hay categorias">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={data || []}>
                {(category) => <TableRow key={category.id}>
                    {(columnKey) => <TableCell>{cellBuilder(category, columnKey)}</TableCell>}
                </TableRow>}
            </TableBody>
        </Table>
        <YesNoModal
            title="Eliminar Categoria"
            body={`Seguro que desea eliminar la categoria "${selectedCategory?.name}"?`}
            onAccept={() => deleteCategory(selectedCategory?.id)}
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
        key: "actions",
        label: "Acciones",
    },
];
