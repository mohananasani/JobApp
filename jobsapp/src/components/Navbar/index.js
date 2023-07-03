import {Link,withRouter} from"react-router-dom"
import Cookies  from "js-cookie"
import "./index.css"
const Navbar=(props)=>{
    const onLogout=()=>{
        const {history}=props
        Cookies.remove("jwt_token")
        history.replace("/login")


    }
    return(
        <div className="navbar-container">
                 <Link to="/" className="website-logo-container">
                    <h2>JOBS</h2>
                </Link>
            <div className="navigation-buttons-container">
                <div className="navigation-button">
                    <Link to="/" className="link-element" >
                        Home
                    </Link>
                </div>
                <div className="navigation-button">
                    <Link to="/jobs" className="link-element"  >
                        Jobs
                    </Link>
                </div>
            </div>
            <div >
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>
        </div>
    )

}
export default withRouter(Navbar)