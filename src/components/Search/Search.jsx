import { useEffect, useState } from "react";
import './Search.css'
import { Slide } from "react-awesome-reveal";
import SingleSearchMusic from "./SingleSearchMusic";


const Search = () => {

    // const { allMusic } = useSelector(state => state)
    // console.log(allMusic)

    const [searchText, setSearchText] = useState('')
    const [allMusic, setAllMusic] = useState([])

    // console.log(searchText)

    // const handleSearch = () => {
    //     // implement searching
    //     fetch(`http://localhost:5000/getMusicByTitle/${searchText}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    // }

    useEffect(() => {
        if (searchText) {
            fetch(`http://localhost:5000/getMusicByTitle/${searchText}`)
                .then(res => res.json())
                .then(data => setAllMusic(data))
        }
        else {
            fetch('http://localhost:5000/allMusicOnSearchDefault')
                .then(res => res.json())
                .then(data => setAllMusic(data))
        }
    }, [searchText])
    // console.log(showMusic)

    const handleShowMore = () => {
        // load all music
        fetch('http://localhost:5000/allMusic')
            .then(res => res.json())
            .then(data => setAllMusic(data))

        const showMoreButton = document.getElementById("show-more-btn")
        showMoreButton?.classList.add("d-none")
    }

    return (
        <div>
            <Slide>
                <h3 className="text-center fw-bold mt-3">Search Your Favorite Music</h3>
            </Slide>
            <div className="d-flex mt-3 justify-content-center mx-auto">
                <input onChange={(event) => setSearchText(event.target.value)} className="form-control w-75" type="search" placeholder="Search" aria-label="Search" />
            </div>
            <div className="all-music-container p-2 mt-5 overflow-hidden">
                {
                    allMusic.map(music => <SingleSearchMusic
                        key={music._id}
                        music={music}
                    ></SingleSearchMusic>)
                }
            </div>
            <div className="text-center">
                <button id="show-more-btn" onClick={handleShowMore} className="btn btn-primary">Show More</button>
            </div>
        </div>
    );
};

export default Search;