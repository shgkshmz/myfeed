import Card from "../components/Card"
import FeaturedCard from "./FeaturedCard";

function CardList(props) {

    function formatDate(timestamp) {
        if (timestamp) return new Date(timestamp).toLocaleString() 
        return "Published date unknown";
    }

    return (
        <>
        {
            props.posts.map((row, index) => {
                if (index == 0) {
                    return <FeaturedCard key={row.id} id={row.id} title={row.title} body={row.body} createdAt={formatDate(row.createdAt)}></FeaturedCard>
                } else {
                    return <Card key={row.id} id={row.id} title={row.title} body={row.body} createdAt={formatDate(row.createdAt)}></Card>

                }
            })
        }
        </>
    )
}

export default CardList;