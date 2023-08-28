import './SingleMusic.css'
import { MdFavorite, MdPlaylistAddCircle, MdFavoriteBorder } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import getFavoriteMusic from '../../reduxServices/actions/FavoriteMusicAction';
import getAllMusic from '../../reduxServices/actions/allMusicActions';



const SingleMusic = ({ music, handleShow, getSingleMusic, favoriteMusic }) => {

    const { user } = useContext(AuthContext)

    const dispatch = useDispatch()

    const isFavorite = favoriteMusic.some(favMusic => favMusic.musicId === music._id && favMusic.userEmail === user?.email)

    const navigate = useNavigate()

    const handleAddToFavorite = (music) => {

        const favoriteMusicInfo = {
            musicId: music._id,
            title: music.title,
            artist: music.artist,
            duration: music.duration,
            year: music.year,
            image: music.image,
            audio: music.audio,
            status: music.status,
            userName: user?.displayName,
            userEmail: user?.email,
            likes: music.likes
        }

        if (user) {
            fetch("https://audio-vibe-server.vercel.app/favoriteMusic", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(favoriteMusicInfo)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.insertedId) {
                        toast.success("Successfully added to favorites")
                        dispatch(getFavoriteMusic(user?.email))
                        fetch(`https://audio-vibe-server.vercel.app/addingFavoriteCount/${music._id}`, {
                            method: 'PUT',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(music)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.modifiedCount > 0) {
                                    dispatch(getAllMusic())
                                }
                            })
                    }

                    if (data.message) {
                        toast.error(data.message)
                    }
                })
        }
        else {
            Swal.fire({
                title: '',
                text: "You must be logged in to add to favorite",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })
        }
    }


    return (
        <div className="card mb-3 hover-effect pe-1">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={music.image} className="img-fluid rounded-start h-100" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{music.title}</h5>
                        <p className="card-text">Singer: {music.artist}</p>
                        <p className="card-text"><small className="text-body-secondary">Released Year: {music.year}</small></p>
                    </div>
                    <div className='buttons-container'>
                        <a className='width-fit-content fs-2 text-center padding-top border-0' href={music.audio} target='blank'><FaPlayCircle></FaPlayCircle></a>
                        <button onClick={() => {
                            handleShow(music)
                            getSingleMusic(music)
                        }} className='bg-transparent text-secondary width-fit-content fs-2 border-0'><MdPlaylistAddCircle></MdPlaylistAddCircle></button>
                        <button onClick={() => {
                            handleAddToFavorite(music)
                        }} className='bg-transparent text-danger width-fit-content fs-2 border-0'>{
                                isFavorite ?
                                    <MdFavorite></MdFavorite> :
                                    <MdFavoriteBorder></MdFavoriteBorder>
                            }</button>
                        <p className='fw-bold width-fit-content fs-5'>{music.likes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMusic;