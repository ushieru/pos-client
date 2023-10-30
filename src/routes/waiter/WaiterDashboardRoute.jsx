import {
  Card,
  CardHeader,
  Button,
} from "@nextui-org/react";
import { MdExitToApp } from 'react-icons/md'
import { useSessionStore } from "@/stores/useSessionStore"

export const WaiterDashboardRoute = () => {
  const closeSession = useSessionStore(s => s.closeSession)

  return <div className="h-screen w-screen p-5">
    <Card className="mb-5">
      <CardHeader className="justify-between">
        Mesero
        <Button onPress={closeSession}>
          Cerrar Sesion
          <MdExitToApp className="text-lg" />
        </Button>
      </CardHeader>
    </Card>
  </div>
}
