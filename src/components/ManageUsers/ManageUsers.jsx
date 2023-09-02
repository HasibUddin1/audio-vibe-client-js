import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllUsers from "../../reduxServices/actions/allUsersActions";
import { toast } from "react-hot-toast";


const ManageUsers = () => {

    const dispatch = useDispatch()

    const { allUsers } = useSelector(state => state.allUsers)

    const handleDelete = id => {
        fetch(`https://audio-vibe-server.vercel.app/deleteUser/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("You have successfully deleted this user")
                    dispatch(getAllUsers())
                }
            })
    }

    const handleMakeAdmin = id => {
        fetch(`https://audio-vibe-server.vercel.app/makeAdmin/${id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                toast.success("You have successfully made this user Admin")
                dispatch(getAllUsers())
            }
        })
    }
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className="p-lg-5">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center" scope="col">Name</th>
                        <th className="text-center" scope="col">Email</th>
                        <th className="text-center" scope="col">Role</th>
                        <th className="text-center" scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((user) => <tr
                            key={user._id}
                        >
                            <td className="text-center">{user.name}</td>
                            <td className="text-center">{user.email}</td>
                            <td>
                                {
                                    user?.role === 'admin' ?
                                        <p className="text-center">Admin</p> :
                                        <div className="text-center">
                                            <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-warning fw-semibold">Make Admin</button>
                                        </div>
                                }
                            </td>
                            <td className="text-center"><button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;