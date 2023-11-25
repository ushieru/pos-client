import { useEffect, useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Dropdown, DropdownMenu, DropdownTrigger, DropdownItem,
  Button, Input, Checkbox,
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { useUser } from "@/hooks/useUser";

export const UpdateUserModal = ({ isOpen, onOpenChange, user }) => {
  const [rol, setRol] = useState()
  const { updateUser } = useUser()

  useEffect(() => {
    if (!user) return
    const rol = user.account.account_type == "admin" ? "Administrador" : user.account.account_type == "cashier" ? "Cajero" : "Mesero"
    setRol(rol)
  }, [user])

  const onSubmit = (onClose) => (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const username = event.target.username.value
    const rawRol = event.target.rol.value
    const rol = rawRol == "Administrador" ? "admin" : rawRol == "Cajero" ? "cashier" : "waiter"
    const isActive = event.target.is_active.checked
    updateUser(user.id, name, email, username, rol, isActive)
      .then(r => {
        if (r.code) return toast.error(r.message)
        toast.success("Usuario actualizado")
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
          <ModalHeader className="flex flex-col gap-1">Actualizar Usuario</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              name="name"
              placeholder="Nombre"
              defaultValue={user.name}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={user.email}
            />
            <Input
              name="username"
              placeholder="Nombre de Usuario"
              defaultValue={user.account.username}
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
            <Checkbox value="active" name="is_active" defaultSelected={user.account.is_active}>Activo</Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="flat" onPress={onClose}>
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Actualizar
            </Button>
          </ModalFooter>
        </form>
      )}
    </ModalContent>
  </Modal>;
}
