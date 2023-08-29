import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import useTitle from "../../hooks/useTitle";
import loginImage from '../../assets/images/login-image.jpg'
import { FcGoogle } from "react-icons/fc";
import './Login.css'


const Login = () => {

    useTitle("Login")

    const { signIn, googleLogin } = useContext(AuthContext)

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value

        setError('')
        signIn(email, password)
            .then(() => {
                Swal.fire({
                    title: 'Success',
                    text: 'You have successfully logged in',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                if (error.message) {
                    setError('Your credentials do not match')
                }
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const loggedUser = result.user
                Swal.fire({
                    title: 'Success',
                    text: 'You have successfully logged in',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                const createdUser = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    role: 'regular'
                }
                console.log(createdUser)
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(createdUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.insertedId){
                            // added user information to the database
                        }
                    })
                    .catch(error => {
                        if(error){
                            // error on adding user information on database
                        }
                    })

                navigate('/')
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
    }

    return (
        <div className="d-lg-flex gap-5 align-items-center justify-content-between w-75 mx-auto mt-5 background-color-login">
            <div className="w-100 w-lg-50">
                <img className="w-100 h-100 login-image" src={loginImage} alt="" />
            </div>
            <div className="mt-5 w-100 w-lg-50 px-5">
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Your Password" />
                        <Link className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to='/signUp'>New to this site?</Link>
                    </div>
                    <div className="text-center">
                        <input className="btn btn-primary w-50" type="submit" value="Login" />
                    </div>
                </form>
                <hr />
                <div className="text-center">
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="btn btn-secondary mx-auto w-50"
                    >
                        <FcGoogle className="text-3xl mr-3" /> Continue with google
                    </button>
                </div>
                {error && <p className="text-danger text-center fw-bold">{error}</p>}
            </div>
        </div>
    );
};

export default Login;