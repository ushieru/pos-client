import { TicketsTable } from "@/components/tables/TicketsTable"
import { Card, CardHeader } from "@nextui-org/react"

export const AdminTicketsRoute = () => {
    return <div>
        <Card className="mb-5">
            <CardHeader className="text-xl font-semibold">Tickets</CardHeader>
        </Card>
        <TicketsTable />
    </div>
}
