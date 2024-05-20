export interface Account {
    id: number
    create_at: string
    update_at: string
    delete_at?: string
    username: string
    is_active: boolean
    account_type: string
    user_id: number
}