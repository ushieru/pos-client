import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { useCategory } from '@/hooks/useCategory'

export const UpdateCategoryModal = ({ isOpen, onOpenChange, category }) => {
    const { updateCategory } = useCategory()

    const onSubmit = (onClose) => (event) => {
        event.preventDefault()
        const name = event.target.name.value
        updateCategory(category.id, name).then(response => {
            if (response.code) return toast.error(response.message)
            toast.success("Categoria actualizada")
            onClose()
        })
    }

    return <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="dark text-foreground"
    >
        <ModalContent>
            {(onClose) => (
                <form onSubmit={onSubmit(onClose)}>
                    <ModalHeader className="flex flex-col gap-1">Nueva Categoria</ModalHeader>
                    <ModalBody>
                        <Input
                            autoFocus
                            name="name"
                            placeholder="Nombre"
                            defaultValue={category.name}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" variant="flat" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            Crear
                        </Button>
                    </ModalFooter>
                </form>
            )}
        </ModalContent>
    </Modal>;
}
