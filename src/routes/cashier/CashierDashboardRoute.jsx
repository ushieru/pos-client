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

export const CashierDashboardRoute = () => {
  const navigate = useNavigate();
  const closeSession = useSessionStore(s => s.closeSession)
  const session = useSessionStore(s => s.session)
  const { data: openTickets } = useSWR(`/tickets?filters[0][field]=account_id&filters[0][operator]=%3D&filters[0][value]=${session.user.account.id}&filters[1][field]=ticket_status&filters[1][operator]=%3D&filters[1][value]=%22open%22`)
  const { createTicket } = useTicket()

  return <div className="h-screen w-screen p-5">
    <Card className="mb-5">
      <CardHeader className="justify-between">
        Cashier
        <Button onPress={closeSession}>
          Cerrar Sesion
          <MdExitToApp className="text-lg" />
        </Button>
      </CardHeader>
    </Card>
    <Card className="mb-5">
      <CardHeader>
        <Button onPress={() => createTicket().then(t => navigate('/ticket/' + t.id))}>
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
            onPress={() => navigate('/ticket/' + t.id)}
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
