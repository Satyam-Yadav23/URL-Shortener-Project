import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import ResetPassword from "../pages/resetPassword.jsx"

export const resetPasswordRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/reset-password/$token',
    component: ResetPasswordPage,
})

function ResetPasswordPage() {
  return ResetPassword;
}