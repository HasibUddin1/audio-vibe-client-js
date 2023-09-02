import { toast } from "react-hot-toast";


const AddMusic = () => {

    const imageHostingToken = import.meta.env.VITE_Image_Token_Key

    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imageHostingToken}`

    const handleAddMusic = event => {
        event.preventDefault()

        const form = event.target
        const title = form.title.value
        const artist = form.artist.value
        const audio = form.audio.value
        const year = form.year.value
        const status = form.status.value
        const imgFile = form.image.files[0]

        // uploading image to ImgBB
        const formData = new FormData()
        formData.append("image", imgFile)

        fetch(imageHostingURL, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageResponse => {
            const imageURL = imageResponse.data.display_url

            const musicData = {
                title,
                artist,
                audio,
                year,
                status,
                image: imageURL,
                likes: 0
            }
            fetch('https://audio-vibe-server.vercel.app/addMusic', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(musicData)
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if(data.insertedId){
                    toast.success("You have successfully added this music")
                }
            })
        })
    }

    return (
        <div className="p-5">
            <form onSubmit={handleAddMusic} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputTitle4" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" id="inputTitle4" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputArtist4" className="form-label">Artist Name</label>
                    <input type="text" name="artist" className="form-control" id="inputArtist4" />
                </div>
                <div className="col-12">
                    <label htmlFor="inputAudio" className="form-label">Youtube URL</label>
                    <input type="text" name="audio" className="form-control" id="inputAudio" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputYear" className="form-label">Release Year</label>
                    <input type="number" name="year" className="form-control" id="inputYear" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputStatus" className="form-label">Status</label>
                    <select id="inputStatus" name="status" className="form-select">
                        <option defaultChecked>Status</option>
                        <option value="featured">Featured</option>
                        <option value="regular">Regular</option>
                    </select>
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="formFile" className="form-label">Choose Image</label>
                    <input className="form-control" name="image" type="file" id="formFile" />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Add Music</button>
                </div>
            </form>
        </div>
    );
};

export default AddMusic;