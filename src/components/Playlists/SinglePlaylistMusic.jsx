import { FaPlayCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";


const SinglePlaylistMusic = ({music, playlistId}) => {

    const handleDelete = () => {
        console.log(playlistId)
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
                            <button onClick={handleDelete} className='btn text-danger fs-2'><TiDelete></TiDelete></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePlaylistMusic;