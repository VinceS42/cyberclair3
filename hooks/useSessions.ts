import { supabase } from "@/utils/supabase/client";
import { useEffect } from "react";

const useSession = () => {
    
    const getSession = async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        console.log(session);
    };

    useEffect(() => {
        getSession();
    }, []);


}