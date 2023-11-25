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
    useDisclosure
} from "@nextui-org/react"
import { MdDelete, MdEdit } from 'react-icons/md'
import { YesNoModal } from "@/components/modals/YesNoModal"
import { useCategory } from '@/hooks/useCategory'
import { UpdateCategoryModal } from "@/components/modals/category/UpdateCategoryModal"

export const CategoriesTable = () => {
    const { data, mutate } = useSWR('/categories')
    const { deleteCategory } = useCategory()
    const { isOpen: deleteIsOpen, onOpenChange: deleteOnOpenChange, onOpen: deleteOnOpen } = useDisclosure()
    const { isOpen: updateIsOpen, onOpenChange: updateOnOpenChange, onOpen: updateOnOpen } = useDisclosure()
    const [selectedCategory, setSelectedCategory] = useState()
    const [searchText, setSearchText] = useState("")

    const cellBuilder = useCallback((category, columnKey) => {
        switch (columnKey) {
            case 'id': return category.id
            case 'name': return category.name
            case 'actions': return <div className="flex gap-1">
                <Button
                    color="danger"
                    isIconOnly
                    onPress={() => { setSelectedCategory(category); deleteOnOpen() }}>
                    <MdDelete className="text-xl" />
                </Button>
                <Button
                    color="secondary"
                    isIconOnly
                    onPress={() => { setSelectedCategory(category); updateOnOpen() }}>
                    <MdEdit className="text-xl" />
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
        <Table aria-label="No hay categorias">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={data?.filter(p => p.name.toLowerCase().startsWith(searchText)) || []}>
                {(category) => <TableRow key={category.id}>
                    {(columnKey) => <TableCell>{cellBuilder(category, columnKey)}</TableCell>}
                </TableRow>}
            </TableBody>
        </Table>
        <YesNoModal
            title="Eliminar Categoria"
            body={`Seguro que desea eliminar la categoria "${selectedCategory?.name}"?`}
            onAccept={() => deleteCategory(selectedCategory?.id).then(_ => mutate())}
            onOpenChange={deleteOnOpenChange}
            isOpen={deleteIsOpen}
        />
        <UpdateCategoryModal
            isOpen={updateIsOpen}
            onOpenChange={updateOnOpenChange}
            category={selectedCategory}
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
