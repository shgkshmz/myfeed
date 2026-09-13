import { useEffect, useState } from "react";
import CardList from "../components/CardList"
import Card from "../components/Card"
import { db } from "../firebase.js"
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
import { ScaleLoader } from "react-spinners";

function Home(props){

    const [posts, setPosts] = useState([]);
    const [lastPost, setLastPost] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const [areMorePostsLoading, setareMorePostsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const PAGE_MAX_ITEMS = 3;

    useEffect(() => {
        async function loadPosts() {
            const q = query(
                collection(db, "posts"),
                orderBy("createdAt", "desc"),
                limit(PAGE_MAX_ITEMS + 1) // Get +1 more to check if there are more to load
            );

            const postArr = []
            const snapshot = await getDocs(q);
            let docs = snapshot.docs;
            if (snapshot.docs.length > PAGE_MAX_ITEMS) {
                docs = snapshot.docs.slice(0, PAGE_MAX_ITEMS); // Slice data up to max number to be displayed
                setHasMore(true); // More data to load later
            }
            docs.map((doc) => {
                postArr.push({
                    id: doc.id,
                    createdAt: doc.get("createdAt") ? doc.get("createdAt").seconds * 1000 : { seconds: 0, nanoseconds: 0},
                    title: doc.get("title") ? doc.get("title") : "Quick post",
                    body: doc.get("body") ? doc.get("body") : ""
                    //...doc.data()
               })
            })
            setLastPost(docs[docs.length - 1]);
            setPosts(postArr)
            setIsPageLoading(false);
        }

        loadPosts();
    }, [])

    async function loadMorePosts() {
        setareMorePostsLoading(true);
        const q = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc"),
            limit(PAGE_MAX_ITEMS + 1),
            startAfter(lastPost)
        );

        const postArr = [];
        const nextSnapshot = await getDocs(q);
        let nextDocs = nextSnapshot.docs;
        if (nextSnapshot.docs.length > PAGE_MAX_ITEMS) {
            nextDocs = nextSnapshot.docs.slice(0, PAGE_MAX_ITEMS); // Slice data up to max number to be displayed
            setHasMore(true); // More data to load later
        } else setHasMore(false);
        nextDocs.map((doc) => {
            postArr.push({
                id: doc.id,
                createdAt: doc.get("createdAt") ? doc.get("createdAt").seconds * 1000 : { seconds: 0, nanoseconds: 0},
                title: doc.get("title") ? doc.get("title") : "Quick post",
                body: doc.get("body") ? doc.get("body") : ""
                //...doc.data()
            })
        })
        setLastPost(nextDocs[nextDocs.length - 1]);
        setPosts((prev) => {
            const existingIds = new Set(prev.map(post => post.id));
            // remove duplicates
            const uniqueNewPosts = postArr.filter(post => !existingIds.has(post.id));
            return [...prev, ...uniqueNewPosts];
        });
        setareMorePostsLoading(false);
    }

    return(
        <>
        <h1 style={{margin: '5rem 0'}}>Author's Feed</h1>
        {
            isPageLoading ? <div className="flex-center-justify"><ScaleLoader color="#1EAEDB"></ScaleLoader></div> : <CardList posts={posts}></CardList>
        }
        <div className="flex-center-justify">
        {
            hasMore ? <button className={areMorePostsLoading ? "invisible" : "button-primary" } onClick={loadMorePosts}>Load More</button> : null            
        }
        {
            areMorePostsLoading ? <ScaleLoader color="#1EAEDB"></ScaleLoader> : null
        }
        </div>
        </>
    );
}

export default Home;