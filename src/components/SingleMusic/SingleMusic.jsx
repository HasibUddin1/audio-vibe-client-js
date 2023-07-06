import { MdFavorite, MdPlaylistAddCircle } from "react-icons/md";

const SingleMusic = ({ music }) => {
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
                    <div className='text-end'>
                        <button className='btn fs-2 text-secondary'><MdPlaylistAddCircle></MdPlaylistAddCircle></button>
                        <button className='btn fs-2 text-danger'><MdFavorite></MdFavorite></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleMusic;