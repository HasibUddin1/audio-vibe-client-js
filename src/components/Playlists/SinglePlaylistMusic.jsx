import { toast } from "react-hot-toast";
import { FaPlayCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";


const SinglePlaylistMusic = ({ music, playlistId, songs, setSongs }) => {

    const handleDelete = musicId => {
        console.log(playlistId, musicId)
        fetch('https://audio-vibe-server.vercel.app/deleteFromPlaylist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: playlistId,
                musicId
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Successfully removed from the playlist")
                    const remaining = songs.filter(song => song._id !== musicId)
                    setSongs(remaining)
                }

                if(data.message){
                    toast.error(data.message)
                }
            })
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
                    <div className='d-flex justify-content-end align-items-center gap-1 favorite-button-container'>
                        <div>
                            <a className='fs-3' href={music.audio} target='blank'><FaPlayCircle></FaPlayCircle></a>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(music._id)} className='btn text-danger fs-2'><TiDelete></TiDelete></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePlaylistMusic;