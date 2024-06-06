import { Account } from "./Account"
import { Category } from "./Category"

export interface ProductionCenter {
    id: number
    name: string
    accounts: Account[]
    categories: Category[]
    create_at: string
    update_at: string
    delete_at?: string
}