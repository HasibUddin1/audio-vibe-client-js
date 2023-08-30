import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllMusic from "../../reduxServices/actions/allMusicActions";
import './ManageMusic.css'


const ManageMusic = () => {

    const { allMusic } = useSelector(state => state.allMusic)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllMusic())
    }, [dispatch])

    return (
        <div className="p-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Year</th>
                        <th scope="col">Status</th>
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
                            <td>{music.year}</td>
                            <td>{music.status}</td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageMusic;