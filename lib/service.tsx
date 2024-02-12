"use server";

import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
