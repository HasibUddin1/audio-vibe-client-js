


const PlaylistButton = ({ playlist, setSongs, setPlaylistId }) => {



    return (
        <div className="text-center">
            <button onClick={() => {
                setSongs(playlist.songs)
                setPlaylistId(playlist._id)
            }} className="btn w-50 btn-success rounded-pill fw-bold col-4">{playlist.playlistName}</button>
        </div>
    );
};

export default PlaylistButton;