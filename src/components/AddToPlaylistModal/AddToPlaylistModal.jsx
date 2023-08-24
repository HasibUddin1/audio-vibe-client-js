import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProviders";
import { toast } from "react-hot-toast";


const AddToPlaylistModal = ({ show, handleClose, singleMusic }) => {

    const { user } = useContext(AuthContext)

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        fetch(`https://audio-vibe-server.vercel.app/getPlaylistByUser/${user?.email}`)
            .then(res => res.json())
            .then(data => setPlaylists(data))
    }, [user])

    const handleAddToPlaylist = (id) => {
        fetch('https://audio-vibe-server.vercel.app/addToPlaylist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id, music: singleMusic })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Successfully added to playlist")
                }

                if (data.message) {
                    toast.error(data.message)
                }
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {
                        playlists.length === 0 ?
                        <h1>You must create playlist</h1>
                        :
                            playlists.map(playlist => <button
                                onClick={() => handleAddToPlaylist(playlist._id)}
                                key={playlist._id}
                                className="btn w-50 btn-success rounded-pill fw-bold col-4 m-2"
                            >{playlist.playlistName}</button>)
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddToPlaylistModal;