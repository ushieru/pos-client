export interface Category {
    id: number
    name: string
    available_from: string
    available_until: string
    available_from_hour: string
    available_until_hour: string
    available_days: number[]
    products: object[]
    create_at: string
    update_at: string
    delete_at?: string
}

export interface UpsertCategoryDTO {
    name: string
    available_from: Date
    available_until: Date
    available_from_hour: string
    available_until_hour: string
    available_days: number[]
}