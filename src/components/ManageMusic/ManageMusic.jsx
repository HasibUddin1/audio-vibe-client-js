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
        fetch(`http://localhost:5000/deleteMusic/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            if(data.deletedCount > 0){
                toast.success("You have successfully deleted this music")
                dispatch(getAllMusic())
            }
        })
    }

    return (
        <div className="p-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Serial</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Year</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allMusic.map((music, index) => <tr
                            key={music._id}
                        >
                            <td>{index + 1}</td>
                            <th scope="row">
                                <img className="table-image" src={music.image} alt="" />
                            </th>
                            <td>{music.title}</td>
                            <td>{music.year}</td>
                            <td>{music.status}</td>
                            <td><button onClick={() => handleDelete(music._id)} className="btn btn-danger">Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageMusic;