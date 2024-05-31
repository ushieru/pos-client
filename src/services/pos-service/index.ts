import { Auth } from "./service/Auth";
import { Category } from "./service/Category";
import { Product } from "./service/Product";
import { Table } from "./service/Table";
import { Ticket } from "./service/Ticket";
import { TicketProduct } from "./service/TicketProcuct";
import { User } from "./service/User";
import { AuthStore } from "./store/AuthStore";
import { AuthStoreLocalStorage } from "./store/AuthStoreLocalStorage";

export class Pos {
    readonly auth: Auth
    readonly category: Category
    readonly product: Product
    readonly table: Table
    readonly ticket: Ticket
    readonly ticketProduct: TicketProduct
    readonly user: User

    constructor(
        readonly host: string,
        private authStore: AuthStore = new AuthStoreLocalStorage(),
    ) {
        this.auth = new Auth(host, authStore)
        this.category = new Category(host, authStore)
        this.product = new Product(host, authStore)
        this.table = new Table(host, authStore)
        this.ticket = new Ticket(host, authStore)
        this.ticketProduct = new TicketProduct(host, authStore)
        this.user = new User(host, authStore)
    }

    async ping(host: string) {
        const response = await fetch(`${host ?? this.host}/ping`)
        return response.ok
    }
}

export class PosSingleton extends Pos {
    private static _instance: PosSingleton;

    constructor(host: string, authStore?: AuthStore) {
        super(host, authStore)
        PosSingleton._instance = this
    }

    static get instance() {
        return this._instance
    }
}
