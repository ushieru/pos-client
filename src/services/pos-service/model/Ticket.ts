import { Account } from "./Account"

export interface Ticket {
    id: number
    create_at: string
    update_at: string
    delete_at: any
    ticket_status: string
    total: number
    account_id: number
    account: Account
    ticket_products: TicketProduct[]
}


export interface TicketProduct {
    id: number
    create_at: string
    update_at: string
    delete_at: any
    name: string
    description: string
    price: number
    available_from: string
    available_until: string
    available_days: string
    available_from_hour: string
    available_until_hour: string
    categories: any
    product_id: number
    quantity: number
    ticket_id: number
}
