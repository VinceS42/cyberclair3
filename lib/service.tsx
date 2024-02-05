"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export const signInUser = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
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

// Service pour mettre à jour l'email d'un utilisateur
// export const updateUserEmail = async (
//     email: string,
//     newEmail: string,
//     password: string
//   ) => {
//     try {
//       // Authentifiez d'abord l'utilisateur avec l'email et le mot de passe actuels
//       await signInUser({ email, password });
  
//       // Mise à jour de l'email avec Supabase
//       const { data, error } = await supabase.auth.updateUser({ email: newEmail });
  
//       if (error) {
//         throw error;
//       }
  
//       return data;
//     } catch (error) {
//       console.error("Erreur de mise à jour de l'email:", error);
//       throw error;
//     }
//   };

// export const updateUserPassword = async (newPassword?: string {email, password}: {email: string, password: string}) => {
//     try {
//         // Préparation de l'objet de mise à jour en incluant uniquement les champs fournis
//         const updates: { email?: string; password?: string } = {};
//         // if (newEmail) updates.email = newEmail;
//         if (newPassword) updates.password = newPassword;

//         // Mise à jour de l'utilisateur avec les champs fournis
//         const { data, error } = await supabase.auth.updateUser(updates);

//         if (error) {
//             throw error; // Lance une exception si une erreur survient
//         }

//         // Retourne la donnée mise à jour si l'opération réussit sans erreur
//         return { data, error: null };
//     } catch (error) {
//         console.error(error); // Affiche l'erreur dans la console
//         return { error }; // Retourne l'erreur pour un traitement ultérieur
//     }
// };