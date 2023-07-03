import {Link} from"react-router-dom"
import Navbar from "../Navbar/index"
import careerImage from "../../images/careers-training-develoment.png"
import {BgContainer} from "./styledComponent"
import "./index.css"

const Home=()=>{
    return(
        < div className="homepage">
            <div className="homepage-header">
                <Navbar/>
            </div>
            <div className="homepage-body">
            <h1>Find Your Suitable Jobs Here</h1>
            <BgContainer backgroundImage={careerImage}>
                <div className="button-content-container">
                    
                    <div className="content-container">
                        <p>Job exploration is the process of actively seeking out and researching various career options to gain a better understanding of potential job roles, industries, and opportunities. It involves investigating different professions, learning about their requirements and responsibilities, and assessing how well they align with your skills, interests, and goals. Job exploration allows individuals to expand their knowledge about various industries, discover new possibilities, and make informed decisions about their career paths. By exploring different job options, you can gain insights into the qualifications needed, salary expectations, growth potential, and job market trends, enabling you to make more informed choices about your professional future.</p>
                    </div >
                    
                    <Link to="/jobs" className="link-element">
                    <button  className="find-jobs-button">Find Jobs</button>
                    </Link>
                </div>
            </BgContainer>
            </div>
        </div>
    )
}
export default Home