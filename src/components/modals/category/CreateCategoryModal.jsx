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

export const CreateCategoryModal = ({ isOpen, onOpenChange }) => {
    const { createCategory } = useCategory()

    const onSubmit = (onClose) => (event) => {
        event.preventDefault()
        const name = event.target.name.value
        createCategory(name).then(response => {
            if (response.code) return toast.error(response.message)
            toast.success("Categoria creada")
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
