import { createRouter, createWebHashHistory } from 'vue-router'
import { PosSingleton } from './services/pos-service'
import Login from './routes/login.vue'
import Logout from './routes/logout.vue'
import AdminLayout from './layouts/AdminLayout.vue'
import Dashboard from './routes/admin/dashboard.vue'
import Users from './routes/admin/users/index.vue'
import NewUser from './routes/admin/users/new.vue'
import EditUser from './routes/admin/users/[id]/edit.vue'
import Categories from './routes/admin/categories/index.vue'
import NewCategory from './routes/admin/categories/new.vue'
import EditCategory from './routes/admin/categories/[id]/edit.vue'
import Products from './routes/admin/products/index.vue'
import NewProduct from './routes/admin/products/new.vue'
import EditProduct from './routes/admin/products/[id]/edit.vue'
import ProductCategories from './routes/admin/products/[id]/categories/index.vue'
import Tables from './routes/admin/tables/index.vue'
import CashierLayout from './layouts/CashierLayout.vue'
import Cashier from './routes/cashier/index.vue'
import CashierTickets from './routes/cashier/tickets/index.vue'
import CashierNewTicket from './routes/cashier/tickets/new.vue'
import CashierTicketId from './routes/cashier/tickets/[id]/index.vue'
import WaiterLayout from './layouts/WaiterLayout.vue'
import WaiterTables from './routes/waiter/index.vue'
import WaiterTicketId from './routes/waiter/tickets/[id]/index.vue'
import Config from './routes/config.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/config', component: Config },
    { path: '/logout', component: Logout },
    {
        path: '/admin', component: AdminLayout, children: [
            { path: '', component: Dashboard },
            {
                path: 'users', children: [
                    { path: '', component: Users },
                    { path: 'new', component: NewUser },
                    { path: ':id/edit', component: EditUser },
                ]
            },
            {
                path: 'categories', children: [
                    { path: '', component: Categories },
                    { path: 'new', component: NewCategory },
                    { path: ':id/edit', component: EditCategory },
                ]
            },
            {
                path: 'products', children: [
                    { path: '', component: Products },
                    { path: 'new', component: NewProduct },
                    { path: ':id/edit', component: EditProduct },
                    { path: ':id/categories', component: ProductCategories },
                ]
            },
            { path: 'tables', component: Tables },
        ]
    },
    {
        path: '/cashier', component: CashierLayout, children: [
            { path: '', component: Cashier },
            { path: 'tickets', component: CashierTickets },
            { path: 'tickets/:id', component: CashierTicketId },
            { path: 'new', component: CashierNewTicket },
        ]
    },
    {
        path: '/waiter', component: WaiterLayout, children: [
            { path: '', component: WaiterTables },
            { path: 'tickets/:id', component: WaiterTicketId },
        ]
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, _, next) => {
    const pos = PosSingleton.instance
    const session = pos.auth.session
    if (session) {
        const account_type = session.user.account.account_type
        if (to.path == '/' && account_type == 'admin') return next({ path: '/admin' })
        if (to.path == '/' && account_type == 'cashier') return next({ path: '/cashier' })
        if (to.path == '/' && account_type == 'waiter') return next({ path: '/waiter' })
    }
    if (to.path == '/config') return next()
    if (to.path != '/' && !session) return next({ path: '/' })
    next()
})