import useSWR from "swr"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@nextui-org/react";
import { MdExitToApp, MdAttachMoney } from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/stores/useSessionStore";
import { useTicket } from "@/hooks/useTicket";
import { FilterBuilder } from "@/utils/filterBuilder";

export const CashierDashboardRoute = () => {
  const navigate = useNavigate();
  const closeSession = useSessionStore(s => s.closeSession)
  const session = useSessionStore(s => s.session)
  const filters = new FilterBuilder()
    .addFilter('account_id', '=', session.user.account.id)
    .addFilter('ticket_status', '=', '"open"')
    .build()
  const { data: openTickets } = useSWR(`/tickets?${filters}`)
  const { createTicket } = useTicket()

  return <div className="h-screen w-screen p-5">
    <Card className="mb-5">
      <CardHeader className="justify-between">
        Cajero
        <Button onPress={closeSession}>
          Cerrar Sesion
          <MdExitToApp className="text-lg" />
        </Button>
      </CardHeader>
    </Card>
    <Card className="mb-5">
      <CardHeader>
        <Button onPress={() => createTicket().then(t => navigate('/tickets/' + t.id))}>
          Venta Rapida
          <MdAttachMoney className="text-lg" />
        </Button>
      </CardHeader>
    </Card>
    <Card>
      <CardHeader>Tickets Abiertos</CardHeader>
      <CardBody className="grid grid-cols-5 gap-3">
        {
          openTickets?.map(t => <Card
            key={t.id}
            onPress={() => navigate('/tickets/' + t.id)}
            isHoverable
            isPressable
          >
            <CardHeader>Ticket #{t.id}</CardHeader>
          </Card>)
        }
      </CardBody>
    </Card>
  </div>
}
