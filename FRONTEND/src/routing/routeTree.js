import { createRootRoute } from "@tanstack/react-router"
import { homePageRoute } from "./homePage.js"
import { authRoute } from "./auth.route.js"
import { dashboardRoute } from "./dashboard.js"
import { resetPasswordRoute } from "./resetPassword.js"
import RootLayout from "../RootLayout"

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree =rootRoute.addChildren([
    homePageRoute, 
    authRoute, 
    dashboardRoute,
    resetPasswordRoute
])