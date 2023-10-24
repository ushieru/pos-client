import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Input,
    Button
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";

export const LoginRoute = () => {
    const navigate = useNavigate();
    const sessionStore = useSessionStore(state => state)

    useEffect(() => {
        switch (sessionStore.session?.user.account.account_type) {
            case "admin": return navigate("/admin/dashboard")
            case "cashier": return navigate("/cashier/dashboard")
            case "waiter": return navigate("/waiter/dashboard")
        }
    }, [sessionStore.session])

    const onSubmit = (event) => {
        event.preventDefault()
        const user = event.target.user.value
        const password = event.target.password.value
        sessionStore.initSession(user, password)
    }

    return <div className="h-screen w-screen grid place-items-center">
        <Card className="w-[500px]">
            <CardHeader>
                Total POS
            </CardHeader>
            <Divider />
            <CardBody>
                <form onSubmit={onSubmit} className="flex flex-col gap-2">
                    <label>
                        <Input name="user" type="text" placeholder="Ingrese su usuario" />
                    </label>
                    <label>
                        <Input name="password" type="password" placeholder="Ingrese su contraseña" />
                    </label>
                    <Button type="submit">Iniciar Sesion</Button>
                </form>
            </CardBody>
        </Card>
    </div>
}
