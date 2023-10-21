import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";
import { useCategory } from '@/hooks/useCategory'

export const CreateCategoryModal = ({ isOpen, onOpenChange }) => {
    const { createCategory } = useCategory()

    const onSubmit = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        createCategory(name)
    }

    return <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="dark text-foreground"
    >
        <ModalContent>
            {(onClose) => (
                <form onSubmit={onSubmit}>
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
                        <Button type="submit" color="primary" onPress={onClose}>
                            Crear
                        </Button>
                    </ModalFooter>
                </form>
            )}
        </ModalContent>
    </Modal>;
}
