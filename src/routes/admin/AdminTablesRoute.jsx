import { useEffect, useState } from "react"
import {
    Card,
    CardHeader,
    CardBody
} from "@nextui-org/react"
import useSWR from "swr"

export const AdminTablesRoute = () => {
    const { data } = useSWR('/tables')
    const [tables, setTables] = useState([])

    useEffect(() => {
        if (data) orderTables(data)
    }, [data])

    const orderTables = (tables) => {
        const tables2d = Array.from({ length: 5 }, () => Array.from({ length: 10 }, () => undefined))
        for (const table of tables) {
            tables2d[table.pos_y - 1][table.pos_x - 1] = table
        }
        const tablesOrdered = []
        for (const row of tables2d) {
            for (const t of row) {
                tablesOrdered.push(t)
            }
        }
        setTables(tablesOrdered)
    }

    return <div>
        <Card className="mb-5">
            <CardHeader className="text-xl font-semibold">Mesas</CardHeader>
        </Card>
        <Card>
            <CardBody className="grid gap-1 grid-cols-10">
                {
                    tables.map((table, i) => {
                        if (!table)
                            return <div key={i} className="aspect-square bg-default-500"></div>
                        return <div key={i} className="aspect-square bg-blue-500 grid place-items-center">{table.name}</div>
                    })
                }
            </CardBody>
        </Card>
    </div>
}
