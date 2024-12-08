import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

function LoginForm(){
    return(
        <>
            <form className="bg-primary p-5 rounded-5 w-50 ">
                <h1 className="text-light  text-center">Login</h1>
                <div className="mb-3">
                    <label htmlFor="loginUsername" className="form-label text-light">Username</label>
                    <input type="username" className="form-control" id="loginUsername"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label text-light">Password</label>
                    <input type="password" className="form-control" id="loginPassword"/>
                </div>
                <button type="submit" className="btn btn-primary w-100 ">Submit</button>
            </form>
        </>


    );
}

export default LoginForm;