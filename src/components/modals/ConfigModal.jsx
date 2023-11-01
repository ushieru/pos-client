import { useState } from "react";
import { useConfigStore } from "@/stores/useConfigStore";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Button,
} from "@nextui-org/react";
import { toast } from "react-toastify";

export const ConfigModal = ({ isOpen, onOpenChange }) => {
    const config = useConfigStore(s => ({ ...s }))
    const [host, setHost] = useState(config.host)
    const [port, setPort] = useState(config.port)

    return <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="dark text-foreground"
    >
        <ModalContent>
            {(onClose) => <>
                <ModalHeader>Config</ModalHeader>
                <ModalBody>
                    <Input value={host} onChange={e => setHost(e.target.value)} />
                    <Input value={port} onChange={e => setPort(e.target.value)} />
                    <Button
                        onPress={() => fetch(`http://${host}:${port}/ping`)
                            .then(r => {
                                if (!r.ok)
                                    toast.error("Error al conectar con el server")
                                toast.success("Conexion correcta")
                            })
                            .catch(_ => toast.error("Error al conectar con el server"))
                        }
                    >Probar conexion</Button>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" variant="flat" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        onPress={() => {
                            config.setHost(host)
                            config.setPort(port)
                            onClose()
                        }}
                    >
                        Guardar
                    </Button>
                </ModalFooter>
            </>
            }
        </ModalContent>
    </Modal>
}
