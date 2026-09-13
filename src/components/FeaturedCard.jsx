import { Link } from "react-router-dom";

function FeaturedCard(props) {
    return (
        <div className="featured-card">
            {/* <p className="start-quote">"</p> */}
            <Link to={`/posts/${props.id}`}><h4 className="featured-card-title">{props.title}</h4></Link>
            <h6 className="featured-card-body" dangerouslySetInnerHTML={{ __html: props.body}}></h6>
            <p className="featured-card-footer">{props.createdAt}</p>
            {/* <p className="end-quote">"</p> */}
        </div>
    )
}

export default FeaturedCard;