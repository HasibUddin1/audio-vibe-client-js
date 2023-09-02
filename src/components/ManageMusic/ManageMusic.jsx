import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllMusic from "../../reduxServices/actions/allMusicActions";
import './ManageMusic.css'
import { toast } from "react-hot-toast";


const ManageMusic = () => {

    const { allMusic } = useSelector(state => state.allMusic)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllMusic())
    }, [dispatch])

    const handleDelete = id => {
        fetch(`https://audio-vibe-server.vercel.app/deleteMusic/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.deletedCount > 0) {
                    toast.success("You have successfully deleted this music")
                    dispatch(getAllMusic())
                }
            })
    }

    const handleMakeRegular = id => {
        fetch(`http://localhost:5000/makeRegular/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.modifiedCount > 0){
                    toast.success("You made this music a regular music")
                    dispatch(getAllMusic())
                }
            })
    }

    const handleMakeFeatured = id => {
        fetch(`http://localhost:5000/makeFeatured/${id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                toast.success("You made this music a featured music")
                dispatch(getAllMusic())
            }
        })
    }

    return (
        <div className="p-lg-5 container-fluid">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th className="text-center" scope="col">Action</th>
                        <th className="text-center" scope="col">Action</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allMusic.map((music) => <tr
                            key={music._id}
                        >
                            <th scope="row">
                                <img className="table-image" src={music.image} alt="" />
                            </th>
                            <td>{music.title}</td>
                            <td className="text-center">
                                <button onClick={() => handleMakeRegular(music._id)} disabled={music.status === 'regular'} className="btn btn-warning fw-semibold">Make Regular</button>
                            </td>
                            <td className="text-center">
                                <button onClick={() => handleMakeFeatured(music._id)} disabled={music.status === 'featured'} className="btn btn-warning fw-semibold">Make Featured</button>
                            </td>
                            <td><button onClick={() => handleDelete(music._id)} className="btn btn-danger">Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageMusic;