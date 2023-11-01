import { useEffect, useState } from "react";
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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { orderTables } from "@/utils/tableUtils";

export const CashierDashboardRoute = () => {
  const navigate = useNavigate();
  const closeSession = useSessionStore(s => s.closeSession)
  const session = useSessionStore(s => s.session)
  const filters = new FilterBuilder()
    .addFilter('account_id', '=', session.user.account.id)
    .addFilter('ticket_status', '=', '"open"')
    .build()
  const { data: openTickets } = useSWR(`/tickets?${filters}`)
  const { data: rawTables } = useSWR('/tables')
  const [tables, setTables] = useState([])
  const isMobile = useMediaQuery("only screen and (max-width : 640px)")
  const { createTicket } = useTicket()

  useEffect(() => {
    if (rawTables) {
      const t = orderTables(rawTables, isMobile)
      setTables(t)
    }
  }, [rawTables, isMobile])

  return <div className="h-screen w-screen p-5 overflow-auto">
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
    <Card className="mb-5">
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
    <Card>
      <CardBody className={`grid gap-1 ${isMobile ? "grid-cols-5" : "grid-cols-10"}`}>
        {
          tables.map((table, i) => {
            if (!table)
              return <div
                key={i}
                className="aspect-square bg-default-500"
              />
            if (!table.ticket_id)
              return <div
                key={i}
                className="aspect-square rounded-medium bg-blue-500 grid place-items-center"
              >{table.name}</div>
            return <Button
              key={i}
              onPress={() => navigate('/tickets/' + table.id)}
              color="secondary"
              className="h-full min-w-0"
            >
              {table.name}
            </Button>
          })
        }
      </CardBody>
    </Card>
  </div>
}
