import { useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Dropdown, DropdownMenu, DropdownTrigger, DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { useUser } from "@/hooks/useUser";

export const CreateUserModal = ({ isOpen, onOpenChange }) => {
  const [rol, setRol] = useState("")
  const { createUser } = useUser()

  const onSubmit = (onClose) => (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const username = event.target.username.value
    const rawRol = event.target.rol.value
    const rol = rawRol == "Administrador" ? "admin" : rawRol == "Cajero" ? "cashier" : "waiter"
    const password = event.target.password.value

    createUser(name, email, username, rol, password)
      .then(r => {
        if (r.code) return toast.error(r.message)
        toast.success("Usuario creado")
        setRol("")
        onClose()
      })
  }

  return <Modal
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    placement="center"
    className="dark text-foreground"
  >
    <ModalContent>
      {(onClose) => (
        <form onSubmit={onSubmit(onClose)}>
          <ModalHeader className="flex flex-col gap-1">Nuevo Usuario</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              name="name"
              placeholder="Nombre"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              name="username"
              placeholder="Nombre de Usuario"
            />
            <Dropdown>
              <DropdownTrigger>
                <Input
                  name="rol"
                  placeholder="Rol"
                  value={rol}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Rol"
                onAction={setRol}
              >
                <DropdownItem key="Administrador">Administrador</DropdownItem>
                <DropdownItem key="Cajero">Cajero</DropdownItem>
                <DropdownItem key="Mesero">Mesero</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
            />
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="flat" onPress={onClose}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Crear
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  </Modal>;
}
