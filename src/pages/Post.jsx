import { useEffect, useState } from "react";
import { db } from "../firebase.js"
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";


function Post(props) {
    
   const { id } = useParams();
   const [post, setPost] = useState(null);
   const [timeToRead, setTimeToRead] = useState(0)
   const wpm = 220; // Reading wpm

    useEffect(() => {
        async function loadPost() {
            const snapshot = await getDoc(doc(db, "posts", id));

            if (snapshot.exists()) {
                setPost({
          id: snapshot.id,
          ...snapshot.data(),
        });
                console.log(post)
                console.log(snapshot.data())
            }
        }
        loadPost();
    }, [id]);

    const timeToReadCallback = (element) => {
        if (!element) return;

        const text = element.innerText || "";
        const words = text.trim().split(/\s/).filter(Boolean).length;
        const totalSeconds = (words / wpm) * 60;

        const images = element.querySelectorAll('img').length;
        let imageTimeSeconds = 0;
        let currentImageBonus = 12; //seconds taken per image

          for (let i = 0; i < images; i++) {
            imageTimeSeconds += currentImageBonus;
            if (currentImageBonus > 3) {
                currentImageBonus--; // Reduce penalty down to 3s minimum
            }
        }

        const totalMinutes = Math.ceil((totalSeconds + imageTimeSeconds) / 60);
        setTimeToRead(totalMinutes);
    }

    if (!post) return <div className="flex-center-justify post-page" ><ScaleLoader color="#1EAEDB"></ScaleLoader></div>

    return(
        <div ref={timeToReadCallback} className="post-page"> 
            <h3 className="flex-center-justify">{post.title}</h3>
            <h6>{timeToRead} min read</h6>
            <p  dangerouslySetInnerHTML={{ __html: post.body}}></p>

            <h6 className="flex-center-justify">{new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</h6>     
        </div>
    )
}

export default Post;