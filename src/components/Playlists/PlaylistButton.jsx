import { RxCross2 } from "react-icons/rx";
import './Playlists.css'
import { toast } from "react-hot-toast";


const PlaylistButton = ({ playlist, setSongs, setPlaylistId, activeButton, setActiveButton, playlists, setPlaylists }) => {

    const handleDeletePlaylist = id => {
        fetch(`https://audio-vibe-server.vercel.app/deletePlaylist/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                toast.success("Playlist has been deleted successfully")
                const remaining = playlists.filter(playlist => playlist._id !== id)
                setPlaylists(remaining)
            }
        })
    }

    return (
        <div className="text-center">
            <button onClick={() => {
                setSongs(playlist.songs)
                setPlaylistId(playlist._id)
                setActiveButton(playlist.playlistName)
            }} className={
                activeButton === playlist.playlistName ?
                    "btn w-50 btn-info rounded-pill fw-bold col-4" :
                    "btn w-50 btn-success rounded-pill fw-bold col-4"
            }>{playlist.playlistName}<span onClick={() => handleDeletePlaylist(playlist._id)} className="ms-3 bg-transparent button-border text-white fw-bold"><RxCross2></RxCross2></span></button>
        </div>
    );
};

export default PlaylistButton;