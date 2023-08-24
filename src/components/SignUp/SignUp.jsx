import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import useTitle from "../../hooks/useTitle";


const SignUp = () => {

    useTitle("Sign Up")

    const { createUser, updateUsersProfile } = useContext(AuthContext)

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSignUp = (event) => {
        event.preventDefault()

        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value

        if (!name) {
            setError('Name field is required')
            return
        }

        if (!email) {
            setError('Email field is required')
            return
        }

        if (!password) {
            setError('Password field is required')
            return
        }

        setError('')

        createUser(email, password)
            .then((result) => {
                const registeredUser = result.user
                updateUsersProfile(registeredUser, name)
                    .then(() => {
                        Swal.fire({
                            title: 'Success',
                            text: 'You have successfully created an account',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        setError('')
                        navigate('/')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="px-5 mt-5">
            <form onSubmit={handleSignUp}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                    <input type="name" name="name" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Your Password" />
                    <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to='/login'>Already have an account?</Link>
                </div>
                <input className="btn btn-primary" type="submit" value="Sign Up" />
                {error && <p className="text-danger fw-bold">{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;