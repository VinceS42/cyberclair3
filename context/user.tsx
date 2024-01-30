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
    email: string;
    first_name: string;
    last_name: string;
};

type UserContextProps = {
    user: any | null;
    setUser: (user: User) => void;
    loading: boolean;
    error: Error | null;
    refreshSession: () => void;
    signInWithOAuth: (provider: "linkedin" | "google") => void;
};

const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
    refreshSession: () => {},
    loading: true,
    error: null,
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

    function normalizeUserData(user: any) {
        let id = user.id;
        let first_name = "";
        let last_name = "";
        let avatar = "";
        let email = user.email;

        if (user.user_metadata) {
            if (user.user_metadata.full_name) {
                const names = user.user_metadata.full_name.split(" ");
                first_name = names[0];
                last_name = names.slice(1).join(" ");
                avatar = user.user_metadata.avatar_url;
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
            avatar,
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
                redirectTo: `${origin}/auth/callback`,
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

                    // ce console.log est utile pour voir les données brutes de l'utilisateur
                    // console.log("Raw user data from onAuthStateChange:", user);

                    const normalizedUser = normalizeUserData(user);
                    setUser(normalizedUser);
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
            if (event === "SIGNED_IN" || event === "USER_UPDATED") {
                const user = session?.user;
                const normalizedUser = normalizeUserData(user);
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
        [
            user,
            setUser,
            loading,
            error,
            refreshSession,
            signInWithOAuth,
            normalizeUserData,
        ]
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
