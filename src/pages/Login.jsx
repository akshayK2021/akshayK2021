import Template from "../components/core/HomePage/Auth/Template";
import logging from "../assests/Images/login.webp"


function Login(){
    return(
        <Template
        title="Welcome Back"
        description1="Build skills for today,tomorrow, and beyond."
        description2="Education to future-proof your carrer."
        image={logging}
        formType="login"/>
    )
}

export default Login;