import { Category } from "./Category"

export interface Product {
    id: number
    create_at: string
    update_at: string
    delete_at?: string
    name: string
    description: string
    price: number
    available_from: string
    available_until: string
    available_days: string
    available_from_hour: string
    available_until_hour: string
    categories: Category[]
}
