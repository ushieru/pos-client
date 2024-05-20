export interface Category {
    id: number;
    create_at: string;
    update_at: string;
    delete_at?: string;
    name: string;
    products: object[];
}