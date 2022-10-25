import { Link } from "react-router-dom";

export function Header(){

    return( <header>
        <Link to="/home">Home</Link>
        <a href="#aboutUs">About us</a>
        <Link to="/home"><img src="https://thumbs.dreamstime.com/b/education-badge-logo-design-university-high-school-emblem-laurel-wreath-education-badge-logo-design-university-high-school-emblem-181155667.jpg" /></Link>
        <a href="#contactUs">Contact Us</a>
        <Link to="/sign-in">Sign In</Link>
        
    </header>)
}

