import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import { useTicket } from "@/hooks/useTicket"

export const TicketProductsButtons = ({ products = [], ticket, onAction }) => {
  const { addProduct } = useTicket()
  return <>
    {
      products?.map(p => <Card
        key={p.id}
        isHoverable
        isPressable
        onPress={() => addProduct(ticket.id, p.id).then(_ => onAction())}
      >
        <CardHeader className="capitalize">{p.name}</CardHeader>
        <CardBody className="max-h-16 text-ellipsis overflow-hidden">{p.description}</CardBody>
        <CardFooter className="justify-end">${p.price}</CardFooter>
      </Card>)
    }
  </>
}
