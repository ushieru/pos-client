import { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Input,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { MdSettings, MdInfo } from 'react-icons/md'
import { useSessionStore } from "@/stores/useSessionStore";
import { ConfigModal } from "@/components/modals/ConfigModal";
import { InfoModal } from "@/components/modals/InfoModal";

export const LoginRoute = () => {
    const navigate = useNavigate();
    const sessionStore = useSessionStore(s => ({ ...s }))
    const {
        isOpen: isOpenConfigModal,
        onOpenChange: onOpenChangeConfigModal,
        onOpen: onOpenConfigModal
    } = useDisclosure()
    const {
        isOpen: isOpenInfoModal,
        onOpenChange: onOpenChangeInfoModal,
        onOpen: onOpenInfoModal
    } = useDisclosure()


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
        <Card className="max-w-[500px]">
            <CardHeader className="justify-between">
                <span>Total POS</span>
                <div className="space-x-1">
                    <Button isIconOnly onPress={() => onOpenConfigModal()}>
                        <MdSettings className="text-2xl" />
                    </Button>
                    <Button isIconOnly onPress={() => onOpenInfoModal()}>
                        <MdInfo className="text-2xl" />
                    </Button>
                </div>
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
        <ConfigModal isOpen={isOpenConfigModal} onOpenChange={onOpenChangeConfigModal} />
        <InfoModal isOpen={isOpenInfoModal} onOpenChange={onOpenChangeInfoModal} />
    </div>
}
