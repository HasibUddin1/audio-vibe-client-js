import { useContext, useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";

import { AuthContext } from "../../providers/AuthProviders";
import SingleFavoriteMusic from "./SingleFavoriteMusic";



const Favorites = () => {

    const { user } = useContext(AuthContext)

    const [allMusic, setAllMusic] = useState([])

    useEffect(() => {
        fetch(`https://audio-vibe-server.vercel.app/favoriteMusicByUser/${user?.email}`)
            .then(res => res.json())
            .then(data => setAllMusic(data))
    }, [user])

    return (
        <div>
            <Slide>
                <h3 className="text-center fw-bold mt-3">Your Favorite Music</h3>
            </Slide>
            {
                allMusic.length === 0 ?
                    <h2 className="text-center">Your did not add any music to your Favorites</h2>
                    :
                    <div className="all-music-container p-2 mt-3 overflow-hidden">
                        {
                            allMusic.map((music) => <SingleFavoriteMusic
                                key={music._id}
                                music={music}
                                allMusic={allMusic}
                                setAllMusic={setAllMusic}
                            >

                            </SingleFavoriteMusic>)
                        }
                    </div>
            }
        </div>
    );
};

export default Favorites;