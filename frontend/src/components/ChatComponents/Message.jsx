import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css'
import '../../css/chat.css'

function Message(props){
    return(
        <>
            <div className="d-flex justify-content-center  flex-row align-items-center">
                <span className="badge bg-dark p-3  fs-6 rounded-5 me-2">{props.sender}</span>
                {/*<p className="text-light mb-0 me-2">{props.sender}</p>*/}
                <span className="badge bg-dark p-3  fs-6 rounded-3">{props.message}</span>
            </div>
        </>
    )
}

export default Message;


