


const PlaylistButton = ({ playlist, setSongs }) => {

    

    return (
        <div className="text-center">
            <button onClick={() => setSongs(playlist.songs)} className="btn w-50 btn-success rounded-pill fw-bold col-4">{playlist.playlistName}</button>
        </div>
    );
};

export default PlaylistButton;