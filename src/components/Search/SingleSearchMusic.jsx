import { FaPlayCircle } from "react-icons/fa";


const SingleSearchMusic = ({music}) => {
    return (
        <div className="card mb-3 hover-effect pe-3">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleSearchMusic;