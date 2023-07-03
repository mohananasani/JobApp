import Cookies from "js-cookie";
import { Component } from "react";
import {ThreeDots} from 'react-loader-spinner'
import profileBackgroundImage from "../../images/profileBackgroundImage.jpg"
import { ProfileContainer } from "./styledComponents";
import {BiRefresh} from "react-icons/bi"
import "./index.css"

const apiStatus={
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:'SUCCESS',
    failure:'FAILURE'
}

class Profile extends Component{
    state={profileApiStatus:apiStatus.initial,profileDetails:""}

    componentDidMount(){
        this.getProfileData()
    }

    getProfileData=async()=>{
        this.setState({profileApiStatus:apiStatus.inProgress})
        const url="https://apis.ccbp.in/profile"
        const jwtToken=Cookies.get("jwt_token")
        const options={
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }
        const response=await fetch(url,options)
        
        if(response.ok){
            const data=await response.json()
            const profileData=data.profile_details
            const updatedProfileData={
                name:profileData.name,
                profileImageUrl:profileData.profile_image_url,
                shortBio:profileData.short_bio
                }
            this.setState({profileDetails:updatedProfileData,profileApiStatus:apiStatus.success})
        }
        else{
            this.setState({profileApiStatus:apiStatus.failure})
        }
        
    }

    displayInProgressView=()=>(
        <div className="products-loader-container">
      <ThreeDots  color="#0b69ff" height="50" width="50" />
    </div>
    )

    displaySuccessView=()=>{
        const {profileDetails}=this.state
        const {name,profileImageUrl,shortBio}=profileDetails
        return(
            <ProfileContainer backgroundImage={profileBackgroundImage} >
                <div>
                    <img className="profile-img" alt="profile" src={profileImageUrl}/>
                    <h2>{name}</h2>
                </div>
                <div>
                    <p>{shortBio}</p>
                </div>
            </ProfileContainer>
        )
    }

    displayFailureView=()=>(
        <div className="retry-button-container">
            <button onClick={this.getProfileData} className="retry-button"><BiRefresh size={30}/></button>
        </div>
    )

    renderProfile=()=>{
        const {profileApiStatus}=this.state
        switch(profileApiStatus){
            case apiStatus.inProgress:
                return this.displayInProgressView()
            case apiStatus.success:
                return this.displaySuccessView()
            case apiStatus.failure:
                return this.displayFailureView()
            default:
                return null
        }
    }

    render(){
        return(
            <div>
                {this.renderProfile()}
            </div>
            
        )
    }

}
export default Profile