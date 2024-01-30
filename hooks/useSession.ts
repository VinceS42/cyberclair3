import { supabase } from "@/utils/supabase/client";
import { AuthError, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useSession = () => {
    const [users, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AuthError | null>(null);

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
                }
                setUser(session?.user || null);
                setLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSession();
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
            }
            setUser(session?.user || null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { users, loading, error, refreshSession  };
};
