import '../../css/main.css';
import '../../css/chat.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser } from "react-icons/fa";

function MembersList({ members }) {
    return (
        <>
            <ul className="list-group fw-bold">
                {members.map((member, index) => (
                    <li key={index} className="list-group-item bg-primary">
                        <FaUser className="text-light me-3" />
                        {typeof member === "string" ? member : member.username || "Unknown"} {/* Adjust for string or object */}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default MembersList;