import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import useAdmin from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";


const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin()

    if (loading || isAdminLoading) {
        return <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    }

    if (user && isAdmin) {
        return children
    }


    return (
        <Navigate to='/' replace>

        </Navigate>
    );
};

export default AdminRoute;