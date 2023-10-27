import { useEffect, useState } from "react";
import useSWR from "swr"
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { MdAdd, MdRemove, MdDelete } from 'react-icons/md'
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useSessionStore } from "@/stores/useSessionStore";
import { useTicket } from "@/hooks/useTicket";
import { toast } from "react-toastify";

export const TicketRoute = () => {
  const { ticketId } = useParams()
  const session = useSessionStore(s => s.session)
  const { data: categories } = useSWR("/categories")
  const { data: ticket, mutate: refreshTicket } = useSWR("/tickets/" + ticketId)
  const [currentCategory, setCurrentCategory] = useState(null)
  const { data: products } = useSWR(currentCategory && `/products/categories/${currentCategory.id}`)
  const {
    addProduct,
    deleteProduct,
    payTicket,
  } = useTicket()
  const navigate = useNavigate()


  useEffect(() => {
    if (categories?.length) {
      setCurrentCategory(categories[0])
    }
  }, [categories])

  if (ticket?.code) {
    toast.error(`Ticket #${ticketId} no encontrado`)
    return <Navigate to="/waiter/dashboard" />
  }

  if (ticket?.ticket_status != "open") {
    toast.error(`Ticket #${ticketId} no se encuentra abierto`)
    return <Navigate to="/waiter/dashboard" />
  }

  return <div className="h-screen w-screen flex p-5 gap-5">
    <div className="grow flex flex-col gap-5">
      <Card fullWidth>
        <CardBody className="flex flex-row gap-2">
          {
            categories?.map(c => <Button
              key={c.id}
              color={currentCategory?.id == c.id ? 'primary' : 'default'}
              onPress={() => setCurrentCategory(c)}
            >
              {c.name}
            </Button>)
          }
        </CardBody>
      </Card>
      <Card fullWidth className="grow">
        <CardBody className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 auto-rows-max gap-3" >
          {
            products?.map(p => <Card
              key={p.id}
              isHoverable
              isPressable
              onPress={() => addProduct(ticket.id, p.id).then(_ => refreshTicket())}
            >
              <CardHeader className="capitalize">{p.name}</CardHeader>
              <CardBody className="max-h-16 text-ellipsis overflow-hidden">Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.{p.description}</CardBody>
              <CardFooter className="justify-end">${p.price}</CardFooter>
            </Card>)
          }
        </CardBody>
      </Card>
    </div>
    <Card className="hidden md:flex h-full w-[400px] shrink-0">
      <CardHeader className="text-2xl font-bold">Ticket #{ticket?.id}</CardHeader>
      <CardBody>
        <section id="ticket-products" className="grow space-y-2 overflow-auto">
          {
            ticket?.ticket_products?.map(p => <Card key={p.id} className="overflow-hidden">
              <CardHeader className="justify-between">
                <p>{p.name}</p>
                ${p.price} c/u
              </CardHeader>
              <CardBody className="flex flex-row justify-between items-center overflow-hidden">
                <div className="flex gap-2 items-center">
                  <Button
                    isIconOnly
                    onPress={() => addProduct(ticket.id, p.product_id).then(_ => refreshTicket())}
                  >
                    <MdAdd className="text-xl" />
                  </Button>
                  <p className="text-xl px-2">{p.quantity}</p>
                  <Button
                    color="danger"
                    isIconOnly
                    onPress={() => deleteProduct(ticket.id, p.product_id).then(_ => refreshTicket())}
                  >
                    {
                      p.quantity == 1
                        ? <MdDelete className="text-xl" />
                        : <MdRemove className="text-xl" />
                    }
                  </Button>
                </div>
                ${p.quantity * p.price}
              </CardBody>
            </Card>)
          }
        </section>
        <Divider className="my-3" />
        <section className="grid grid-cols-2 grid-rows-2 gap-2">
          <Button>Cancelar</Button>
          <Button color="primary" onPress={() => navigate("/waiter/dashboard")}>Aceptar</Button>
          {session.user.account.account_type == "cashier" && <div></div>}
          {session.user.account.account_type == "cashier" && <Button
            color="secondary"
            onPress={() => payTicket(ticket?.id)
              .then(r => {
                if (r.code) return
                navigate("/cashier/dashboard")
              })}
          >
            Cobrar
          </Button>}
        </section>
      </CardBody>
    </Card>
  </div>
}
