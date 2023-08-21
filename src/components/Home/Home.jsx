import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllMusic from "../../reduxServices/actions/allMusicActions";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Fade, Slide } from "react-awesome-reveal";
import { Pagination } from 'swiper/modules';
import bannerImage from '../../assets/images/banner-image-for-audio-hub.jpg'

// swiper css
import 'swiper/css';
import 'swiper/css/pagination';
import SingleMusic from "../SingleMusic/SingleMusic";
import AddToPlaylistModal from "../AddToPlaylistModal/AddToPlaylistModal";



const Home = () => {

    const { allMusic } = useSelector(state => state.allMusic)

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [singleMusic, setSingleMusic] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getSingleMusic = music => {
        setSingleMusic(music)
    }

    useEffect(() => {
        dispatch(getAllMusic())
    }, [dispatch])
    return (
        <div>
            <img className='w-100' src={bannerImage} alt="" />
            <div>
                <Slide>
                    <h3 className="text-center fw-bold mt-3">Featured Music</h3>
                </Slide>
                <Fade delay={1e3} cascade damping={1e-1}>
                    <p className="text-center text-xl">Here you will see the featured music</p>
                </Fade>
                <hr className='border border-4 border-secondary mx-5 rounded' />
                <AddToPlaylistModal
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                    singleMusic={singleMusic}
                 />
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper p-3 mb-5"
                >
                    {
                        allMusic.map(music => <SwiperSlide
                            key={music._id}
                        >
                            <SingleMusic
                                music={music}
                                handleShow={handleShow}
                                getSingleMusic={getSingleMusic}
                            ></SingleMusic>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Home;