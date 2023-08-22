


const PlaylistButton = ({ playlist, setSongs, setPlaylistId,activeButton, setActiveButton }) => {

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
            }>{playlist.playlistName}</button>
        </div>
    );
};

export default PlaylistButton;