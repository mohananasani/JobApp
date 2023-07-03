import { Component } from "react";
import Cookies from "js-cookie"
import { Redirect } from "react-router-dom";
import "./index.css"


class Login extends Component{
    state={inputUsername:"",inputPassword:"",showInputUsernameError:false,showInputPasswordError:false,showErrorMsg:false}

    onUsernameChange=event=>{
        this.setState({inputUsername:event.target.value})
    }

    onPasswordChange=event=>{
        this.setState({inputPassword:event.target.value})
    }

    blueUsername=(event)=>{
        if(event.target.value===""){
            
            this.setState({showInputUsernameError:true})
        }
        else{
        this.setState({showInputUsernameError:false})
        }
        
    }

    blurPassword=(event)=>{
        if(event.target.value===""){
          
            this.setState({showInputPasswordError:true})
        }
        else{
            this.setState({showInputPasswordError:false})
        }
        
    }

    checkUsername=username=>{
        return username!==""
    }

    checkPassword=password=>{
        return password!==""
    }

    onSubmitSuccess=jwtToken=>{
        const{history}=this.props
        Cookies.set("jwt_token",jwtToken,{expires:1})
        history.replace("/")
        
    }

    onSubmitFailure=()=>{
        this.setState({showErrorMsg:true,inputUsername:"",inputPassword:""})
    }

    validFormDetails=async()=>{
        const {inputUsername, inputPassword} = this.state
    const userDetails = {username:inputUsername, password:inputPassword}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure()
    }
    }

    onSubmitForm=event=>{
        
        event.preventDefault()
        const {inputUsername,inputPassword}=this.state
        const isUsernameValid=this.checkUsername(inputUsername)
        const isPasswordValid=this.checkPassword(inputPassword)

        if(isUsernameValid && isPasswordValid){
            this.validFormDetails()
        }
        else{
            this.setState({
                showInputUsernameError:!isUsernameValid,
                showInputPasswordError:!isPasswordValid,
                
            })
        }
        
        

    }

    getLoginForm=()=>{
        const{inputUsername,inputPassword,showInputPasswordError,showInputUsernameError,showErrorMsg}=this.state
        const jwtToken=Cookies.get("jwt_token")
        if(jwtToken!==undefined){
            return <Redirect to="/"/>
        }

        return(
        <div  className="login-card-container">
            <form  className="form-container" onSubmit={this.onSubmitForm}>
                <h1 className="form-heading">Login</h1>
                <div>
                <div className="form-control-container">
                    <label htmlFor="username" className="label-element">
                        UserName
                    </label>
                    <br/>
                    <input name="username" 
                           className="user-input-element"
                           placeholder="enter username rahul"
                           value={inputUsername}
                           onChange={this.onUsernameChange}
                           onBlur={this.blueUsername}/>
                    {showInputUsernameError && <p className="fieldsErrorMsg">Enter Username</p>}
                </div>
                <div className="form-control-container">
                    <label htmlFor="password" className="label-element">
                        Password
                    </label>
                    <br/>
                    <input name="password"
                            className="user-input-element"
                            type="password"
                            placeholder="Enter password rahul@2021"
                            value={inputPassword}
                            onChange={this.onPasswordChange}
                            onBlur={this.blurPassword}/>
                    {showInputPasswordError && <p className="fieldsErrorMsg">Enter Password</p>}
                </div>
                </div>
                <div className="submit-button-container">
                    <div>
                        {showErrorMsg && <p className="fieldsErrorMsg">User not found in Database</p>}
                    </div>
                    <div >
                        <button className="submit-button">Submit</button>
                    </div>
                </div>
            </form>

        </div>
        )
    }

    render(){
        
        return(
            <div className="Login-route-container">
                {this.getLoginForm()}
            </div>
        )
    }
}
export default Login