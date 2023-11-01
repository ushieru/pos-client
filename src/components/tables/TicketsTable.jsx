import { useCallback, useState } from "react"
import useSWR from "swr"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    useDisclosure,
} from "@nextui-org/react"
import { MdOutlineReceiptLong } from 'react-icons/md'
import { FilterBuilder } from "@/utils/filterBuilder"
import { TicketDetailsModal } from "../modals/TicketDetailsModal"

export const TicketsTable = () => {
    const filters = new FilterBuilder().addFilter('ticket_status', '<>', '"open"').build()
    const { data: tickets } = useSWR(`/tickets?${filters}`)
    const [currentTicket, setCurrentTicket] = useState()
    const { isOpen, onOpenChange, onOpen } = useDisclosure()


    const cellBuilder = useCallback((ticket, key) => {
        switch (key) {
            case 'total': return `$${ticket.total}`
            case 'actions': return <>
                <Button
                    isIconOnly
                    onPress={() => { setCurrentTicket(ticket); onOpen() }}
                >
                    <MdOutlineReceiptLong className="text-xl" />
                </Button>
            </>
            default: return ticket[key]
        }
    }, [])

    return <>
        <Table aria-label="No hay tickets">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={tickets || []}>
                {(ticket) => <TableRow key={ticket.id}>
                    {(columnKey) => <TableCell>{cellBuilder(ticket, columnKey)}</TableCell>}
                </TableRow>}
            </TableBody>
        </Table>
        <TicketDetailsModal isOpen={isOpen} onOpenChange={onOpenChange} ticket={currentTicket} />
    </>
}

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "ticket_status",
        label: "Estado",
    },
    {
        key: "total",
        label: "Total",
    },
    {
        key: 'actions',
        label: 'Acciones'
    }
];
