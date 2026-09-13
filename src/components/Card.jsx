import { Link } from "react-router-dom";

function Card(props) {

    return (
        <div className="card">
            <Link to={`/posts/${props.id}`}><h5 className="card-title">{props.title}</h5></Link>
            <p className="card-footer">{props.createdAt}</p>
        </div>
    )
}

export default Card;