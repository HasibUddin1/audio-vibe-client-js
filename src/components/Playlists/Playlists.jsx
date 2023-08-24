import { Slide } from "react-awesome-reveal";
import './Playlists.css'
import { FaPlus } from "react-icons/fa";
import { useState, useEffect, useContext } from 'react'
import { Button } from "react-bootstrap";
import CreatePlaylistModal from "../CreatePlaylistModal/CreatePlaylistModal";
import { AuthContext } from "../../providers/AuthProviders";
import PlaylistButton from "./PlaylistButton";
import SinglePlaylistMusic from "./SinglePlaylistMusic";
import useTitle from "../../hooks/useTitle";

const Playlists = () => {

    useTitle("Playlists")

    const [modalShow, setModalShow] = useState(false);

    const { user } = useContext(AuthContext)

    const [playlists, setPlaylists] = useState([])

    const [songs, setSongs] = useState([])

    const [playlistId, setPlaylistId] = useState('')

    const [activeButton, setActiveButton] = useState('')

    useEffect(() => {
        fetch(`https://audio-vibe-server.vercel.app/getPlaylistByUser/${user?.email}`)
            .then(res => res.json())
            .then(data => setPlaylists(data))
    }, [user])

    return (
        <div className="overflow-hidden">
            <Slide>
                <h3 className="text-center fw-bold mt-3">Create Your Own Playlist</h3>
                <div className="text-center">
                    <Button variant="warning" className="fw-bold rounded-pill" onClick={() => setModalShow(true)}>
                        Create Your Own Playlist <FaPlus></FaPlus>
                    </Button>

                    <CreatePlaylistModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            </Slide>
            <div className="mx-auto button-container mt-3">
                {
                    playlists.map(playlist => <PlaylistButton
                        key={playlist._id}
                        playlist={playlist}
                        setSongs={setSongs}
                        setPlaylistId={setPlaylistId}
                        activeButton={activeButton}
                        setActiveButton={setActiveButton}
                        playlists={playlists}
                        setPlaylists={setPlaylists}
                    ></PlaylistButton>)
                }
            </div>
            {
                songs.length === 0 ?
                <h3 className="text-center p-5">You can create your own playlist and add songs to that playlist. You can also view your playlist songs by clicking on your playlist</h3>
                :
                    <div className="container-fluid all-music-container mt-5">
                        {
                            songs.map(music => <SinglePlaylistMusic
                                key={music._id}
                                music={music}
                                playlistId={playlistId}
                                songs={songs}
                                setSongs={setSongs}
                            ></SinglePlaylistMusic>)
                        }
                    </div>
            }
        </div>
    );
};

export default Playlists;