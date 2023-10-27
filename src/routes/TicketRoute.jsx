import { useEffect, useState } from "react";
import useSWR from "swr"
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
} from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import { useSessionStore } from "@/stores/useSessionStore";
import { useTicket } from "@/hooks/useTicket";
import { toast } from "react-toastify";
import { TicketProductsButtons } from "@/components/TicketProductButtons";
import { TicketTicketProducts } from "@/components/TicketTicketProducts";

export const TicketRoute = () => {
  const { ticketId } = useParams()
  const session = useSessionStore(s => s.session)
  const { data: categories } = useSWR("/categories")
  const { data: ticket, mutate: refreshTicket } = useSWR("/tickets/" + ticketId)
  const [currentCategory, setCurrentCategory] = useState(null)
  const { data: products } = useSWR(currentCategory && `/products/categories/${currentCategory.id}`)
  const {
    payTicket,
    deleteTicket
  } = useTicket()
  const navigate = useNavigate()

  useEffect(() => {
    if (categories?.length) {
      setCurrentCategory(categories[0])
    }
  }, [categories])

  useEffect(() => {
    if (!ticket) return
    if (ticket?.code) {
      toast.error(`Ticket #${ticketId} no encontrado`)
      return navigate("/waiter/dashboard")
    }
    if (ticket?.ticket_status != "open") {
      toast.error(`Ticket #${ticketId} no se encuentra abierto`)
      return navigate("/waiter/dashboard")
    }
  }, [ticket])

  return <div className="h-screen w-screen flex p-5 gap-5">
    <div className="grow flex flex-col gap-5">
      <Card className="">
        <CardBody className="flex-row gap-2 overflow-x-auto w-[calc(100vw-40px)] md:w-[calc(100vw-460px)]">
          {
            categories?.map(c => <Button
              key={c.id}
              className="shrink-0"
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
          <TicketProductsButtons ticket={ticket} products={products} onAction={refreshTicket} />
        </CardBody>
      </Card>
    </div>
    <Card className="hidden md:flex h-full w-[400px] shrink-0">
      <CardHeader className="text-2xl font-bold">Ticket #{ticket?.id}</CardHeader>
      <CardBody>
        <section id="ticket-products" className="grow space-y-2 overflow-auto">
          <TicketTicketProducts ticket={ticket} onAction={refreshTicket} />
        </section>
        <Divider className="my-3" />
        <section className="grid grid-cols-2 gap-2">
          <Button
            isDisabled={ticket?.ticket_products?.length != 0}
            onPress={() => deleteTicket(ticket?.id).then(r => {
              if (r.code) return
              navigate("/waiter/dashboard")
            })}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onPress={() => navigate("/waiter/dashboard")}
          >
            Aceptar
          </Button>
          {session.user.account.account_type == "cashier" && <div></div>}
          {session.user.account.account_type == "cashier" && <Button
            isDisabled={ticket?.ticket_products?.length == 0}
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
