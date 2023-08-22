import { useContext, useEffect, useState } from "react";
import './Search.css'
import { Slide } from "react-awesome-reveal";
import AddToPlaylistModal from "../AddToPlaylistModal/AddToPlaylistModal";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import SingleMusic from "../SingleMusic/SingleMusic";


const Search = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [singleMusic, setSingleMusic] = useState(null)
    const [allMusic, setAllMusic] = useState([])
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (user) {
            setShow(true)
        }
        else {
            Swal.fire({
                title: '',
                text: "You must be logged in to add to playlist",
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
    };

    const getSingleMusic = music => {
        setSingleMusic(music)
    }

    useEffect(() => {
        if (searchText) {
            fetch(`http://localhost:5000/getMusicByTitle/${searchText}`)
                .then(res => res.json())
                .then(data => setAllMusic(data))
        }
        else {
            fetch('http://localhost:5000/allMusicOnSearchDefault')
                .then(res => res.json())
                .then(data => setAllMusic(data))
        }
    }, [searchText])
    // console.log(showMusic)

    const handleShowMore = () => {
        // load all music
        fetch('http://localhost:5000/allMusic')
            .then(res => res.json())
            .then(data => setAllMusic(data))

        const showMoreButton = document.getElementById("show-more-btn")
        showMoreButton?.classList.add("d-none")
    }

    return (
        <div>
            <Slide>
                <h3 className="text-center fw-bold mt-3">Search Your Favorite Music</h3>
            </Slide>
            <div className="d-flex mt-3 justify-content-center mx-auto">
                <input onChange={(event) => setSearchText(event.target.value)} className="form-control w-75" type="search" placeholder="Search" aria-label="Search" />
            </div>
            <AddToPlaylistModal
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                singleMusic={singleMusic}
            />
            <div className="all-music-container p-2 mt-5 overflow-hidden">
                {
                    allMusic.map(music => <SingleMusic
                        key={music._id}
                        music={music}
                        handleShow={handleShow}
                        getSingleMusic={getSingleMusic}
                    ></SingleMusic>)
                }
            </div>
            <div className="text-center">
                <button id="show-more-btn" onClick={handleShowMore} className="btn btn-primary">Show More</button>
            </div>
        </div>
    );
};

export default Search;