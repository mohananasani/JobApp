import { Component } from "react";
import Navbar  from "../Navbar";
import Profile from "../Profile"
import noJobs from "../../images/noJobs.jpg"
import {BsSearch,BsBriefcaseFill} from "react-icons/bs"
import Skeleton from '@mui/material/Skeleton'; //npm install @mui/material @emotion/react @emotion/styled
//import Avatar from '@mui/material/Avatar'
//import { blue } from "@mui/material/colors";
import Cookies from "js-cookie";
import {AiFillStar} from "react-icons/ai"
import {MdLocationPin} from "react-icons/md"

import "./index.css"

const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]
  
  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]

class Jobs extends Component{
    state={isLoading:true,selectedEmploymentIdsList:[],selectedSalaryRangeId:"",searchedValue:"",jobsListData:[],showNoJobs:false}
 
    componentDidMount(){
        this.getJobsListData()
    }

    changeCaseOfFetchedData=job=>({
        companyLogoUrl:job.company_logo_url,
        employemntType:job.employment_type,
        id:job.id,
        jobDescription:job.job_description,
        location:job.location,
        packagePerAnnum:job.package_per_annum,
        rating:job.rating,
        title:job.title

    })

    getJobsListData=async()=>{
        const{searchedValue,selectedEmploymentIdsList,selectedSalaryRangeId}=this.state
        console.log("data in jobs list",selectedEmploymentIdsList,selectedSalaryRangeId,searchedValue)
        const jwtToken=Cookies.get("jwt_token")
        const url=`https://apis.ccbp.in/jobs?employment_type=${selectedEmploymentIdsList.join()}&minimum_package=${selectedSalaryRangeId}&search=${searchedValue}`
        const option={
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }
        const response=await fetch(url,option)
        const data=await response.json()
        if(response.ok){
            const updatedFetchedData=data.jobs.map(job=>this.changeCaseOfFetchedData(job))
            const showNoJobs=updatedFetchedData.length===0
            this.setState({jobsListData:updatedFetchedData,isLoading:false,showNoJobs})

        }
    }

    renderJobsListView=()=>{
        const {isLoading,jobsListData,showNoJobs}=this.state
        const data=jobsListData.length!==0 ? jobsListData:Array.apply(null,Array(20))
        if(showNoJobs){
            return(
            <div className="no-jobs-container">
                <img alt="no jobs" src={noJobs}/>
            </div>
            )
        }
        return(
            <ul className="list-items-container">
                {data.map((eachItem,index)=>{
                    
                    return(
                           <li key={index} className="list-item">
                            
                            <div className="list-header margin padding">
                                {isLoading
                                ? <Skeleton variant="rounded" className="company-logo margin"/>
                                :<img alt="company logo" src={eachItem.companyLogoUrl} className="company-logo margin"/>
                                }
                                <div className="jobtitle-rating-container">
                                    {isLoading
                                    ?<Skeleton  className="title margin padding"/>
                                    :<h3 className="title margin padding">{eachItem.title}</h3>}
                                    {isLoading
                                    ? <Skeleton className="rating margin padding"/>
                                    :(<div className="star-rating-container">
                                        <div className="margin">
                                        <AiFillStar className="rating-color"/>
                                        </div>
                                        <p className="">{eachItem.rating}</p>
                                      </div>)
                                    }
                                </div>
                            </div>
                            <div className="type-location-salary-container">
                                    <div className="location-type-container">
                                        {isLoading
                                        ?<Skeleton className="location margin"/>
                                        :(<div className="flex-location-location-component">
                                            <MdLocationPin/>
                                            <p className="margin">{eachItem.location}</p>
                                            </div>)}
                                            {isLoading
                                        ?<Skeleton className="type margin"/>
                                        :(<div className="flex-location-location-component">
                                            <BsBriefcaseFill/>
                                            <p className="margin">{eachItem.employemntType}</p>
                                            </div>)}
                                        
                                    </div>
                                    {isLoading
                                        ?<Skeleton className="salary margin"/>
                                        :<p className="margin">{eachItem.packagePerAnnum}</p>
                                    }
                                    
                            </div>
                            <hr className="hr-element"/>
                            {isLoading
                                        ?<Skeleton className="description margin"/>
                                        :<h3 className="margin">Description</h3>
                                    }
                            
                            {isLoading
                                        ?<Skeleton  className="content margin" variant="rectangle"/>
                                        :
                                        (
                                            <div className="content margin padding" >
                                                <p>{eachItem.jobDescription}</p>
                                            </div>
                                        )
                                    }
                            
                        </li>
                    )
                })}
            </ul>
        )

        
    }

    getEmploymentItem=employmentItem=>{
        const {selectedEmploymentIdsList}=this.state
        const {label,employmentTypeId}=employmentItem
        const clickedOnCheckbox=event=>{
            if(event.target.checked){
                const checkboxId=event.target.id
               this.setState(prevState=>(
                {selectedEmploymentIdsList:[...prevState.selectedEmploymentIdsList,checkboxId]}
                ),this.getJobsListData)
            }
            else{
                const newSelectedList=selectedEmploymentIdsList.filter(eachId=>eachId!==event.target.id)
                this.setState({selectedEmploymentIdsList:newSelectedList},this.getJobsListData)
            }
        }

        return(
            <li  key={employmentTypeId} className="employment-list-item">
                <input onClick={clickedOnCheckbox}  className="checkbox-element" id={employmentTypeId} type="checkbox"/>
                <label className="label-element" htmlFor={employmentTypeId}>{label}</label>
            </li>
        )
    }

    displayEmploymentFilters=()=>(
        <>
            <h3>Type of Employement</h3>
            <ul  className="list-of-employment-filters">
                {employmentTypesList.map(item=>this.getEmploymentItem(item))}
            </ul>
        </>
    )


    getSalaryRangeItem=salaryRangeItem=>{
        const{label,salaryRangeId}=salaryRangeItem
        const clickOnRadioButton=event=>{
         this.setState({selectedSalaryRangeId:event.target.id},this.getJobsListData)
        }

        return(
            <li key={salaryRangeId} className="salary-range-item">
                <input onClick={clickOnRadioButton} name="salary" id={salaryRangeId} type="radio" className="salary-item-radio"/>
                <label htmlFor={salaryRangeId} className="salary-item-label">{label}</label>
            </li>
        )

    }

    displaySalaryRangeFilters=()=>(
        <>
            <h3>Salary Range</h3>
            <ul className="list-of-salary-range-filters">
                {salaryRangesList.map(item=>this.getSalaryRangeItem(item))}
            </ul>
        </>
    )


    displaySearchAndJobsList=()=>{
        const onSearchInputChange=event=>{
        this.setState({
            searchedValue:event.target.value
        },this.getJobsListData)
    }
    return(
        <> 
        <div className="searchBar-and-searchComponent-container">
            <input 
                   placeholder="Search Jobs"
                   className="search-input-element"
                   onChange={onSearchInputChange}
                   />
            <BsSearch/>
            
        </div>
        {
            this.renderJobsListView()
        }
        </>
    )
    }

    renderJobsView=()=>(
        <div className="jobs-container">
            <div className="profile-filters-container">
                <div className="profile-container">
                    <Profile/>
                </div>
                <div className="employement-filters-container">
                    {this.displayEmploymentFilters()}
                </div>
                <div className="salary-range-filters-container">
                    {this.displaySalaryRangeFilters()}
                </div>
            </div>
            <div className="search-and-jobsList-container">
                {this.displaySearchAndJobsList()}
            </div>
        </div>
    )

    render(){
        return(
            <div  className="jobs-page">
                <Navbar/>
                {this.renderJobsView()}

            </div>
        )
    }

}
export default Jobs