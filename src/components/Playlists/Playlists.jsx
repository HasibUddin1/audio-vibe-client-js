import { Slide } from "react-awesome-reveal";


const Playlists = () => {
    return (
        <div>
            <Slide>
                <h3 className="text-center text-3xl font-bold mt-3">Create Your Own Playlist</h3>
                <div className="text-center">
                    <button className="btn" onClick={() => window.my_modal_3.showModal()}>open modal</button>
                </div>
            </Slide>
            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </form>
            </dialog>
        </div>
    );
};

export default Playlists;