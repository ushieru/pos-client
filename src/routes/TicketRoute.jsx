import { useEffect, useState } from "react";
import useSWR from "swr"
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import { useSessionStore } from "@/stores/useSessionStore";
import { useTicket } from "@/hooks/useTicket";
import { toast } from "react-toastify";
import { TicketProductsButtons } from "@/components/TicketProductButtons";
import { TicketTicketProducts } from "@/components/TicketTicketProducts";
import { YesNoModal } from "@/components/modals/YesNoModal";
import { FilterBuilder } from "@/utils/filterBuilder";

export const TicketRoute = () => {
  const { ticketId } = useParams()
  const session = useSessionStore(s => s.session)
  const { data: categories } = useSWR("/categories")
  const { data: ticket, mutate: refreshTicket } = useSWR("/tickets/" + ticketId)
  const [currentCategory, setCurrentCategory] = useState(null)
  const filters = new FilterBuilder()
    .addFilter("Date('now')", ">=", "Date(available_from)")
    .addFilter("Date('now')", "<=", "Date(available_until)")
    .build()
  const { data: products } = useSWR(currentCategory && `/products/categories/${currentCategory.id}?${filters}`)
  const { isOpen, onOpenChange, onOpen } = useDisclosure()
  const {
    payTicket,
    deleteTicket
  } = useTicket()
  const navigate = useNavigate()
  const [showTicket, setShowTicket] = useState(false)

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
      <Card>
        <CardBody>
          <Button onPress={() => setShowTicket(true)}>Ticket</Button>
        </CardBody>
      </Card>
    </div>
    <Card className={`${showTicket ? 'absolute top-0 left-0 w-screen z-20' : 'hiddden'} md:relative md:flex h-full md:w-[400px] md:shrink-0`}>
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
          {session.user.account.account_type == "cashier" && <Button
            isDisabled={ticket?.ticket_products?.length == 0}
            color="secondary"
            onPress={() => onOpen()}
          >
            Cobrar
          </Button>}
          <Button className="md:hidden" onPress={() => setShowTicket(false)}>
            Minimizar
          </Button>
        </section>
      </CardBody>
    </Card>
    <YesNoModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Cobrar"
      onAccept={() => payTicket(ticket?.id)
        .then(r => {
          if (r.code) return
          navigate("/cashier/dashboard")
        })}
    >
      {
        (() => {
          const [exchange, setExchange] = useState(0)
          return <>
            <p>Total a pagar <span className="font-bold">${ticket?.total}</span></p>
            <label>Paga con:
              <Input
                type="number"
                onKeyDown={e => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                onChange={(e) => setExchange(e.target.value - ticket?.total)}
              />
            </label>
            <p>Cambio: <span className="font-bold">${exchange}</span></p>
          </>
        })()
      }
    </YesNoModal>
  </div>
}
