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
import dayjs from "dayjs";
import { useProduct } from '@/hooks/useProduct'

export const CreateProductModal = ({ isOpen, onOpenChange }) => {
    const { createProduct } = useProduct()

    const onSubmit = (onClose) => (event) => {
        event.preventDefault()
        const name = event.target.name.value
        const description = event.target.description.value
        const price = event.target.price.value
        const availableFrom = event.target.availableFrom.value
        const availableUnti = event.target.availableUntil.value
        createProduct(name, description, +price, dayjs(availableFrom).toISOString(), dayjs(availableUnti).toISOString())
            .then((response) => {
                if (response.code) return toast.error(response.message)
                toast.success("Producto creado")
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
                        <Input
                            type="date"
                            name="availableFrom"
                            placeholder="Disponible desde"
                        />
                        <Input
                            type="date"
                            name="availableUntil"
                            placeholder="Disponible hasta"
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
