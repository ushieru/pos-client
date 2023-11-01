import { useSessionStore } from "@/stores/useSessionStore"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({ children, accountType }) => {
  const session = useSessionStore(s => s.session)

  if (!session?.token)
    return <Navigate to="/" />

  const userAccountType = session.user.account.account_type

  if (accountType != userAccountType && userAccountType == "admin")
    return <Navigate to="/admin/dashboard" replace />

  if (accountType != userAccountType && userAccountType == "cashier")
    return <Navigate to="/cashier/dashboard" replace />

  if (accountType != userAccountType && userAccountType == "waiter")
    return <Navigate to="/waiter/dashboard" replace />

  return <>{children}</>
}
