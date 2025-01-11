import '../../css/main.css'
import '../../css/chat.css'

function UserMessage(props){
    return(
        <>
                <span className="badge bg-light p-3  fs-6 rounded-3 text-dark">{props.message}</span>
        </>
    )
}

export default UserMessage;