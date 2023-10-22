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
import { useProduct } from '@/hooks/useProduct'

export const CreateProductModal = ({ isOpen, onOpenChange }) => {
    const { createProduct } = useProduct()

    const onSubmit = (onClose) => (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const description = event.target.description.value
        const price = event.target.price.value
        createProduct(name, description, +price).then((response) => {
            if (response.code) return toast.error(response.message)
            toast.success("Producto creado")
            onClose()
        })
    }

    return <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="dark text-foreground"
    >
        <ModalContent>
            {(onClose) => (
                <form onSubmit={onSubmit(onClose)}>
                    <ModalHeader className="flex flex-col gap-1">Nuev Producto</ModalHeader>
                    <ModalBody>
                        <Input
                            autoFocus
                            name="name"
                            placeholder="Nombre"
                        />
                        <Input
                            name="description"
                            placeholder="Descripcion"
                        />
                        <Input
                            type="number"
                            name="price"
                            placeholder="Precio"
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
