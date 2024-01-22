import { NextResponse, NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

export async function middleware(request: NextRequest) {
    const url = new URL(request.url)
    const path = url.pathname

    if (path.startsWith("/dashboard")) {
        const { supabase } = createClient(request)
        const { data } = await supabase.auth.getSession()

        if (!data.session) {
            // Utilise l'URL de base pour construire une URL absolue
            const loginUrl = new URL("/login", url.origin).toString()
            return NextResponse.redirect(loginUrl)
        }

        // if data.session is not null and path is /login, redirect to /dashboard

        return NextResponse.next()
    }

    if (path === "/login") {
        const { supabase } = createClient(request)
        const { data } = await supabase.auth.getSession()

        if (data.session) {
            const dashboardUrl = new URL("/dashboard", url.origin).toString()
            return NextResponse.redirect(dashboardUrl)
        }
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
}
