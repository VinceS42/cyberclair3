import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const path = url.pathname;

    const publicUrls = ["/reset"];

    if (publicUrls.includes(path)) {
        return NextResponse.next();
    }

    if (path.startsWith("/dashboard")) {
        const { supabase } = createClient(request);
        const { data } = await supabase.auth.getSession();

        if (!data.session) {
            // Utilise l'URL de base pour construire une URL absolue
            const loginUrl = new URL("/login", url.origin).toString();
            return NextResponse.redirect(loginUrl);
        }
        // Si data.session est no null et le path est /login, alors je redirige vers le dashboard

        return NextResponse.next();
    }

    if (path === "/login") {
        const { supabase } = createClient(request);
        const { data } = await supabase.auth.getSession();

        if (data.session) {
            const dashboardUrl = new URL("/dashboard", url.origin).toString();
            return NextResponse.redirect(dashboardUrl);
        }
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
