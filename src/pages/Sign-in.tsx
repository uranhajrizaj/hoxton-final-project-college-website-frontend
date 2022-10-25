import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../State/Store";
import "../pagesStyle/signIn.css"


export function SignIn() {
    const signInUser = useStore(state => state.signInUser)
    const navigate = useNavigate()
    const signInErrors = useStore(state => state.signInErrors)
    useEffect(() => {
        if (localStorage.token) {
            fetch('http://localhost:4455/validate', {
                headers: {
                    Authorization: localStorage.token
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.error) {
                        alert(data.error)
                    } else {
                        signInUser(data, navigate)
                    }
                })
        }
    }, [])
    return (
        <div className="countainer">
            <header>
                <Link to="/home">Home</Link>
                <Link to="/#aboutUs">About us</Link>
                <Link to="/home"><img src="https://thumbs.dreamstime.com/b/education-badge-logo-design-university-high-school-emblem-laurel-wreath-education-badge-logo-design-university-high-school-emblem-181155667.jpg" /></Link>
                <Link to="/#contactUs" >Contact Us</Link>
                <Link to="/sign-in">Sign In</Link>

            </header>
            <form autoComplete="off" onSubmit={(e) => {
                e.preventDefault()
                const formData = {
                    //@ts-ignore
                    email: e.target.email.value,
                    //@ts-ignore
                    password: e.target.password.value
                }
                signInUser(formData, navigate)
            }}
            >
                <h2>Sign in</h2>
                <input placeholder="Email" type="email" name="email" required />
                <input placeholder="Passwaord" type="password" name="password" required />
                {signInErrors ? signInErrors.map(message => <p className="error">*{message}*</p>) : null}
                <button >Sign In</button>
            </form>

        </div>
    )
}