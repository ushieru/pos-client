import {
  Card,
  CardBody,
  CardHeader,
  Button
} from "@nextui-org/react";
import { useTicket } from "@/hooks/useTicket"
import { MdAdd, MdRemove, MdDelete } from 'react-icons/md'

export const TicketTicketProducts = ({ ticket, onAction }) => {
  const { addProduct, deleteProduct } = useTicket()

  return <>
    {ticket?.ticket_products?.map(p => <Card key={p.id} className="overflow-hidden">
      <CardHeader className="justify-between">
        <p>{p.name}</p>
        ${p.price} c/u
      </CardHeader>
      <CardBody className="flex flex-row justify-between items-center overflow-hidden">
        <div className="flex gap-2 items-center">
          <Button
            isIconOnly
            onPress={() => addProduct(ticket.id, p.product_id).then(_ => onAction())}
          >
            <MdAdd className="text-xl" />
          </Button>
          <p className="text-xl px-2">{p.quantity}</p>
          <Button
            color="danger"
            isIconOnly
            onPress={() => deleteProduct(ticket.id, p.product_id).then(_ => onAction())}
          >
            {
              p.quantity == 1
                ? <MdDelete className="text-xl" />
                : <MdRemove className="text-xl" />
            }
          </Button>
        </div>
        <p className="font-bold">${p.quantity * p.price}</p>
      </CardBody>
    </Card>)}
  </>
}
