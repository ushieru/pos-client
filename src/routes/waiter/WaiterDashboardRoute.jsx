import { useEffect, useState } from "react"
import useSWR from "swr"
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@nextui-org/react";
import { MdExitToApp } from 'react-icons/md'
import { useSessionStore } from "@/stores/useSessionStore"
import { orderTables } from "@/utils/tableUtils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTable } from "@/hooks/useTable";
import { useNavigate } from "react-router-dom";

export const WaiterDashboardRoute = () => {
  const closeSession = useSessionStore(s => s.closeSession)
  const { data } = useSWR('/tables')
  const [tables, setTables] = useState([])
  const isMobile = useMediaQuery("only screen and (max-width : 640px)")
  const { createTicket } = useTable()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      const t = orderTables(data, isMobile)
      setTables(t)
    }
  }, [data, isMobile])

  const onClickTable = (table) => {
    if (!table.ticket_id) {
      createTicket(table.id).then(r => {
        if (r.ticket_id)
          navigate(`/tickets/${r?.ticket_id}`)
      })
      return
    }
    navigate(`/tickets/${table.ticket_id}`)
  }

  return <div className="h-screen w-screen p-5 overflow-auto">
    <Card className="mb-5">
      <CardHeader className="justify-between">
        Mesero
        <Button onPress={closeSession}>
          Cerrar Sesion
          <MdExitToApp className="text-lg" />
        </Button>
      </CardHeader>
    </Card>
    <Card className="">
      <CardBody className={`grid gap-1 ${isMobile ? "grid-cols-5" : "grid-cols-10"}`}>
        {
          tables.map((table, i) => {
            if (!table)
              return <div
                key={i}
                className="aspect-square bg-default-500"
              />
            return <Button
              key={i}
              onPress={() => onClickTable(table)}
              color={table.ticket_id ? "secondary" : "primary"}
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
