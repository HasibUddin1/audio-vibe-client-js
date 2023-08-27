import { useContext, useEffect } from "react";
import { Slide } from "react-awesome-reveal";

import { AuthContext } from "../../providers/AuthProviders";
import SingleFavoriteMusic from "./SingleFavoriteMusic";
import useTitle from "../../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import getFavoriteMusic from "../../reduxServices/actions/FavoriteMusicAction";



const Favorites = () => {

    useTitle("Favorites")

    const { user } = useContext(AuthContext)

    const { favoriteMusic } = useSelector(state => state.favoriteMusic)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFavoriteMusic(user?.email))
    }, [user, dispatch])

    return (
        <div>
            <Slide>
                <h3 className="text-center fw-bold mt-3">Your Favorite Music</h3>
            </Slide>
            {
                favoriteMusic.length === 0 ?
                    <h2 className="text-center">You did not add any music to your Favorites</h2>
                    :
                    <div className="all-music-container p-2 mt-3 overflow-hidden">
                        {
                            favoriteMusic.map((music) => <SingleFavoriteMusic
                                key={music._id}
                                music={music}
                            >
                            </SingleFavoriteMusic>)
                        }
                    </div>
            }
        </div>
    );
};

export default Favorites;