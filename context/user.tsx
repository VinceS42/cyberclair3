"use client";

import { supabase } from "@/utils/supabase/client";
import React, {
    createContext,
    useState,
    useMemo,
    useContext,
    useEffect,
} from "react";

// Définis un type plus spécifique pour les données utilisateur si possible
type User = {
    id: string;
    first_name: string;
    last_name: string;
    newEmail: string;
    email: string;
    role: string;
    avatar_url: string;
    password: string;
    stripe_customer_id: string;
    subscription_status: boolean;
} | null;

type UserContextProps = {
    user: User | any;
    setUser: (user: User) => void;
    loading: boolean;
    error: Error | null;
    refreshSession: () => void;
    signInWithOAuth: (provider: "linkedin" | "google") => void;
};

const UserContext = createContext<UserContextProps>({
    user: null,
    error: null,
    loading: true,
    setUser: () => {},
    refreshSession: () => {},
    signInWithOAuth: () => {},
});

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    function normalizeUserData(user: any): User {
        if (!user) {
            console.error("L'objet utilisateur est undefined.");
            return null; // ou retourner une valeur par défaut / gérer l'erreur différemment
        }
        let id = user.id;
        let first_name = user.first_name || "";
        let last_name = user.last_name || "";
        let avatar_url = user.avatar_url || "";
        let email = user.email;
        let newEmail = user.newEmail;
        let role = user.role;
        let password = user.password;
        let stripe_customer_id = "";
        let subscription_status = user.subscription_status;

        if (user.user_metadata) {
            if (user.user_metadata.full_name) {
                const names = user.user_metadata.full_name.split(" ");
                first_name = names[0];
                last_name = names.slice(1).join(" ");
                avatar_url = user.user_metadata.picture;
            } else {
                first_name = user.user_metadata.first_name || "";
                last_name = user.user_metadata.last_name || "";
            }
        }

        return {
            id,
            first_name,
            last_name,
            email,
            newEmail,
            role,
            avatar_url,
            password,
            stripe_customer_id,
            subscription_status,
        };
    }

    const signInWithOAuth = async (provider: "linkedin" | "google") => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
                redirectTo: `https://projet-bts.vercel.app/auth/callback`,
            },
        });

        if (error) {
            console.error("Error during sign in:", error);
            return;
        }

        console.log("Raw user data:", user);
    };

    useEffect(() => {
        const fetchSession = async () => {
            setLoading(true);
            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();
                if (error) {
                    setError(error);
                } else {
                    const user = session?.user;

                    if (user) {
                        // Requête supplémentaire pour récupérer l'avatar_url depuis la table de profiles
                        const { data: profileData, error: profileError } =
                            await supabase
                                .from("profiles")
                                .select("avatar_url, subscription_status")
                                .eq("id", user.id)
                                .single(); // Utilisation de .single() pour obtenir un seul enregistrement

                        if (profileError) {
                            console.error(
                                "Erreur lors de la récupération de l'avatar:",
                                profileError
                            );
                        }
                        // Mise à jour de user avec avatar_url récupéré
                        const updatedUser = {
                            ...session.user,
                            avatar_url: profileData?.avatar_url,
                            subscription_status:
                                profileData?.subscription_status, // Ajoutez cette ligne
                        };

                        const normalizedUser = normalizeUserData(updatedUser);
                     
                        setUser(normalizedUser);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();

        supabase.auth.onAuthStateChange((event, session) => {
            setLoading(true);
            if (
                event === "SIGNED_IN" ||
                event === "USER_UPDATED" ||
                event === "PASSWORD_RECOVERY"
            ) {
                const user = session?.user;
                const normalizedUser = session?.user
                    ? normalizeUserData(user)
                    : null;
                setUser(normalizedUser);
            }
            setLoading(false);
        });
    }, []);

    const refreshSession = async () => {
        setLoading(true);
        try {
            const {
                data: { session },
                error,
            } = await supabase.auth.refreshSession();
            if (error) {
                setError(error);
            } else {
                const user = session?.user;
                const normalizedUser = normalizeUserData(user);
                setUser(normalizedUser);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const contextValue = useMemo(
        () => ({
            user,
            setUser,
            loading,
            error,
            refreshSession,
            signInWithOAuth,
            normalizeUserData,
        }),
        [user, loading, error]
    );
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export function useSession() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
