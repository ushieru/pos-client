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
import { MdDelete } from 'react-icons/md'
import { YesNoModal } from "@/components/modals/YesNoModal"
import { useCategory } from '@/hooks/useCategory'

export const CategoriesTable = () => {
    const { data, mutate } = useSWR('/categories')
    const { deleteCategory } = useCategory()
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    const [selectedCategory, setSelectedCategory] = useState()
    const [searchText, setSearchText] = useState("")

    const cellBuilder = useCallback((category, columnKey) => {
        switch (columnKey) {
            case 'id': return category.id
            case 'name': return category.name
            case 'actions': return <>
                <Button
                    color="danger"
                    isIconOnly
                    onPress={() => { setSelectedCategory(category); onOpen() }}>
                    <MdDelete className="text-xl" />
                </Button>
            </>
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
