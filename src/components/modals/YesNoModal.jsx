import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

export const YesNoModal = ({ isOpen, onOpenChange, title, body, onAccept, children }) => {
    return <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="dark text-foreground"
    >
        <ModalContent>
            {(onClose) => <>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    {body || children}
                </ModalBody>
                <ModalFooter>
                    <Button type="button" variant="flat" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" color="primary" onPress={() => {
                        onAccept()
                        onClose()
                    }}>
                        Aceptar
                    </Button>
                </ModalFooter>
            </>
            }
        </ModalContent>
    </Modal>
}
