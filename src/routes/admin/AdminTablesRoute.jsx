import { useEffect, useState } from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
} from "@nextui-org/react"
import useSWR from "swr"
import { useTable } from "@/hooks/useTable"

export const AdminTablesRoute = () => {
    const { data, mutate } = useSWR('/tables')
    const { createTable, updateTable, deleteTable } = useTable()
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

    const onSubmit = (event) => {
        event.preventDefault()
        const name = event.target.name.value
        createTable(name).then(r => {
            if (r.code) return
            event.target.name.value = ''
            mutate()
        })
    }

    const onDrag = (table) => (e) => {
        e.dataTransfer.setData("table", JSON.stringify(table))
    }

    const onDrop = (x, y) => (e) => {
        e.preventDefault()
        const table = JSON.parse(e.dataTransfer.getData("table"))
        updateTable(table.id, { name: table.name, pos_x: x, pos_y: y })
            .then(_ => mutate())
    }

    const onDropDelete = (e) => {
        e.preventDefault()
        const table = JSON.parse(e.dataTransfer.getData("table"))
        deleteTable(table.id).then(_ => mutate())
    }

    return <div>
        <Card className="mb-5">
            <CardHeader className="text-xl font-semibold">Mesas</CardHeader>
        </Card>
        <Card className="mb-5">
            <CardHeader className="justify-between">
                <form className="flex gap-2" onSubmit={onSubmit}>
                    <Input name="name" />
                    <Button type="submit">Nueva mesa</Button>
                </form>
                <div
                    className="border border-dashed bg-red-500 px-2 py-1"
                    onDrop={onDropDelete}
                    onDragOver={(e) => e.preventDefault()}
                >
                    Suelte aqui para eliminar
                </div>
            </CardHeader>
        </Card>
        <Card>
            <CardBody className="grid gap-1 grid-cols-10">
                {
                    tables.map((table, i) => {
                        const x = i % 10
                        const y = Math.floor(i / 10)
                        if (!table)
                            return <div
                                key={i}
                                onDrop={onDrop(x + 1, y + 1)}
                                onDragOver={(e) => e.preventDefault()}
                                className="aspect-square bg-default-500"
                            />
                        return <div
                            key={i}
                            draggable={true}
                            onDragStart={onDrag(table)}
                            className="aspect-square bg-blue-500 grid place-items-center"
                        >
                            {table.name}
                        </div>
                    })
                }
            </CardBody>
        </Card>
    </div>
}

