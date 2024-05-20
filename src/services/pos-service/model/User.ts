import { Account } from "./Account"

export interface User {
    id: number
    create_at: string
    update_at: string
    delete_at?: string
    name: string
    email: string
    account: Account
}

export interface UpdateUserDto {
    id: number
    name: string
    email: string
    username: string
    account_type: string
    is_active: boolean
}