import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await fetch(`https://audio-vibe-server.vercel.app/users/admin/${user?.email}`)
            const data = await res.json()
            return data?.admin
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;