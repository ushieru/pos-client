import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

export const TicketDetailsModal = ({ isOpen, onOpenChange, ticket }) => {
    return <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        scrollBehavior="inside"
        className="dark text-foreground"
    >
        <ModalContent>
            {(onClose) => <>
                <ModalHeader>Ticket #{ticket.id}</ModalHeader>
                <ModalBody>
                    <Table aria-label="No hay productos">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={ticket.ticket_products}>
                            {(tp) => <TableRow key={tp.id}>
                                {(columnKey) => <TableCell>{getKeyValue(tp, columnKey)}</TableCell>}
                            </TableRow>}
                        </TableBody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" onPress={onClose}>
                        Aceptar
                    </Button>
                </ModalFooter>
            </>}
        </ModalContent>
    </Modal>
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
        key: "price",
        label: "Precio",
    },
    {
        key: 'quantity',
        label: 'Cantidad'
    }
]

