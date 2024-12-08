import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import '../css/main.css'
import './Auth.css'

function Auth() {
    return (
    
        <div className="container d-flex justify-content-center align-items-center">
            <LoginForm></LoginForm>
        </div>
        
    
    )
}

export default Auth;