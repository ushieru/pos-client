import { useEffect, useState } from "react";
import { useConfigStore } from "@/stores/useConfigStore";
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button,
} from "@nextui-org/react";

export const InfoModal = ({ isOpen, onOpenChange }) => {
    const config = useConfigStore(s => ({ ...s }))
    const [info, setInfo] = useState({})

    useEffect(() => {
        fetch(`http://${config.host}:${config.port}/info`)
            .then(r => r.json())
            .then(r => setInfo(r))
    }, [])

    return <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="dark text-foreground"
    >
        <ModalContent>
            {(onClose) => <>
                <ModalHeader>Sever Info</ModalHeader>
                <ModalBody>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>IP</TableColumn>
                            <TableColumn>Port</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>{info.ip}</TableCell>
                                <TableCell>{info.port}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={() => onClose()}>
                        Aceptar
                    </Button>
                </ModalFooter>
            </>
            }
        </ModalContent>
    </Modal>
}
