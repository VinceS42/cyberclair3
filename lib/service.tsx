"use server";

import { cookies, headers } from "next/headers";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

//**************************/ SIGN UP USER /***************************//

export const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { first_name: first_name, last_name: last_name },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
};

//**************************/ SIGN IN USER /***************************//

export const signInUser = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect(
            "/login?message=Ce compte n'existe pas, veuillez vous inscrire ou réessayer."
        );
    }

    return redirect("/dashboard");
};

//**************************/ SIGN IN USER FOR UPDATE /***************************//

// Service pour authentifier l'utilisateur avant de mettre à jour son email ou son mot de passe //
// Je suis obligé de créer cette fonction car Supabase ne permet pas de mettre à jour l'email ou le mot de passe d'un utilisateur sans le réauthentifier. //
//Mon autre fonction signIn redirige vers le dashboard tandis que celle la me renvoie la data //

export const signInUserForUpdate = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createSupabaseServerClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect(
            "/login?message=Ce compte n'existe pas, veuillez vous inscrire ou réessayer."
        );
    }

    return data;
};

//**************************/ UPDATE USER EMAIL /***************************//
// Service pour mettre à jour l'email d'un utilisateur

export const updateUserEmail = async (
    newEmail: string,
    { email, password }: { email: string; password: string }
) => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        const cookieStore = cookies();
        const supabase = createSupabaseServerClient(cookieStore);

        // Authentifiez d'abord l'utilisateur avec l'email et le mot de passe actuels
        await signInUserForUpdate(formData);

        // Mise à jour de l'email avec Supabase
        const { data, error } = await supabase.auth.updateUser({
            email: newEmail,
        });
        if (error) {
            throw error;
        }
        console.log("Email mis à jour avec succès:", data);
        return data;
    } catch (error) {
        console.error("Erreur de mise à jour de l'email:", error);
        throw error;
    }
};

//**************************/ UPDATE USER PASSWORD /***************************//
// Service pour mettre à jour le password d'un utilisateur

export const updateUserPassword = async (
    newPassword: string,
    {
        email,
        password,
    }: {
        email: string;
        password: string;
    }
) => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        const cookieStore = cookies();
        const supabase = createSupabaseServerClient(cookieStore);

        // Authentifiez d'abord l'utilisateur avec l'email et le mot de passe actuels
        await signInUserForUpdate(formData);

        // Mise à jour de l'email avec Supabase
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
};

//**************************/ EMAIL FOR RESET PASSWORD USER /***************************//
// Service d'envoi d'email pour reset le mot de passe d'un utilisateur

export const sendResetPassword = async (email: string) => {
    try {
        const origin = headers().get("origin");
        const { data, error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${origin}/reset`,
            }
        );
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw error;
    }
};

//**************************/ CONFIRM RESET PASSWORD USER /***************************//
// Servic pour reset le mot de passe d'un utilisateur

export const confirmResetPassword = async (newPassword: string) => {
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (data) console.log("Mot de passe mis à jour avec succès:", data);
        if (error) console.log("Erreur de mise à jour du mot de passe:", error);
    } catch (error) {
        throw error;
    }
};


//**************************/ 2MFA /***************************//
// Servic pour activer l'authentification à deux facteurs

async function startMfaEnrollment() {
    const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
    });

    if (error) {
        console.error("Erreur lors de l’enrôlement MFA:", error);
        return;
    }

    // `data` contient le QR code et le secret que vous devez montrer à l'utilisateur
    console.log("QR Code pour l’enrôlement MFA:", data.totp.qr_code);
}
