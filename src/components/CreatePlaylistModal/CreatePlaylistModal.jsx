import { Modal } from "react-bootstrap";
import { useRef } from 'react'
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";


const CreatePlaylistModal = (props) => {

    const playlistRef = useRef()

    const [error, setError] = useState('')

    const { user } = useContext(AuthContext)

    const handleCreatePlaylist = (event) => {
        event.preventDefault()

        const playlistName = playlistRef.current.value

        if(!playlistName){
            setError('Playlist name field cannot be submitted empty')
            return
        }

        setError('')
        const newPlaylistInfo = {
            playlistName: playlistName,
            userName: user?.displayName,
            userEmail: user?.email
        }

        fetch('https://audio-vibe-server.vercel.app/createAPlaylist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newPlaylistInfo)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setError('')
            if(data.insertedId){
                Swal.fire({
                    title: '',
                    text: 'Your playlist has been created',
                    icon: 'success',
                })
                window.location.reload()
            }
        })
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Your Playlist
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onClick={handleCreatePlaylist}>
                        <input type="text" ref={playlistRef} className="rounded-2 form-control" name="playlistName" placeholder="Your Playlist Name" id="" />
                        <div className="text-end mt-3">
                            <input className="btn btn-warning fw-bold" type="submit" value="Add to Playlist" />
                        </div>
                        {error && <p className="text-danger">{error}</p>}
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreatePlaylistModal;