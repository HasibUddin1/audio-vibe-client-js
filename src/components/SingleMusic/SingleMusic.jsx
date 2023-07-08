import './SingleMusic.css'
import { MdFavorite, MdPlaylistAddCircle } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SingleMusic = ({ music }) => {

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleAddToFavorite = () => {

        const favoriteMusicInfo = {
            title: music.title,
            artist: music.artist,
            duration: music.duration,
            year: music.year,
            image: music.image,
            audio: music.audio,
            status: music.status,
            userName: user?.displayName,
            userEmail: user?.email
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
                        Swal.fire({
                            title: 'Success',
                            text: 'This music has been added to your favorites',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }

                    if (data.message) {
                        Swal.fire({
                            title: '',
                            text: data.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        })
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
        <div className="card mb-3 hover-effect">
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
                    <div className='d-flex align-items-center justify-content-end'>
                        <a className='fs-3' href={music.audio} target='blank'><FaPlayCircle></FaPlayCircle></a>
                        <button className='border-0 bg-transparent fs-2 text-secondary'><MdPlaylistAddCircle></MdPlaylistAddCircle></button>
                        <button onClick={handleAddToFavorite} className='border-0 bg-transparent fs-2 text-danger'><MdFavorite></MdFavorite></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMusic;