import "./App.css";
import Login from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Auth from "./components/Auth";
function App() {
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>

      <Auth></Auth>

    </div>

  );
}

export default App;
