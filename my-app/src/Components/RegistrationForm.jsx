import React from 'react';
import { useState ,useEffect } from 'react';
import { useNavigate } from "react-router";

function RegistrationForm(){

    const initialValues = { fullname: "", email: "",password : ""};
    const[formValues,setFormValues] = useState(initialValues);
    const[errorValues,setFormErrors] = useState({});
    const[isSubmit,setIsSubmit] = useState(false);
    const[successMsg,setSuccessMsg] = useState({});

    const handleChange = (e) =>{
        const{name,value} = e.target;
        setFormValues({...formValues, [name] : value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setFormErrors(handleError(formValues));
        setIsSubmit(true);

        const newPerson = { ...formValues };
        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        
        setFormValues({ fullname: "", email: "", password: "" });
        // console.log("Data Submitted");
        // const allErrors = JSON.stringify(errorValues);
        // console.log(allErrors);
        // console.log(JSON.stringify(formValues));
    }

    const handleSuccess = () => {
        const msgSuccess={};
        msgSuccess.message="Registered Successfully";
        return msgSuccess;
    }
    useEffect(() => {
        console.log(errorValues);
        if(Object.keys(errorValues).length === 0 && isSubmit){
            console.log(JSON.stringify(formValues));
            setSuccessMsg(handleSuccess()); 
        }
    },[errorValues]);

    const handleError = (values) => {
        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
        const errors={};
        if(!values.fullname){
            errors.fullname="Full name is required";
        }
        if(!values.email){
            errors.email="Email is required";
        }else if(!regex.test(values.email)){
            errors.email="Enter a valid email id";
        }
        if(!values.password){
            errors.password="Password is required";
        }else if(values.password.length < 4){
            errors.password="Password must be at least 4 characters long";
        }else if(values.password.length > 10){
            errors.password="Password must not exceed 10 characters";
        }
        return errors;
    }


    return(
        <div>
            <div className="hero">

            </div>
            <form className = "regForm" onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type = "text" 
                    name="fullname" 
                    placeholder="Enter your name"
                    value={formValues.fullname}
                    onChange={handleChange}
                />
                <p>{errorValues.fullname}</p>
                <label>Email:</label>
                <input 
                    type = "email" 
                    name="email" 
                    placeholder="Enter your email id"
                    value={formValues.email}
                    onChange={handleChange}
                />
                <p>{errorValues.email}</p>
                <label>Password:</label>
                <input 
                    type = "password" 
                    name="password" 
                    placeholder="Enter your password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                <p>{errorValues.password}</p>
                <button type="submit" >Submit</button>
                <p 
                    className="successMsg"
                    style={{
                        color:"green"
                    }}
                >{successMsg.message}</p>
            </form>
        </div>
    )
}
export default RegistrationForm;
