"use client"; 
import {
    useEffect,
    useState
} from "react"
export default () => {
    const [posts, setPosts] = useState (null) //this is the inital value of the state
    //a piece of state is something that you can read and write from
    //whenever you write to a piece of state, the application changes
    useEffect (
        () => {
            const getPostsData = async () => {
                const res = await fetch ("/api/posts")
                const data = await res.json ()
                console.log(data)
                // show us what data we get back - to the developer console

                setPosts (data) 
                //get the data from the server, then set the posts profile to whatever the data is
            }
            getPostsData()
            //calling the fuction
        }, []
    )
    
    const renderFriendsAndClubPosts = (posts) => {
        return posts.map ((post) => {
            return (
                <div>
                    <img src={post.media_url} /> 
                    <p>
                    
                        {/* anything between curly braces is javascipt that gets filled in to the html */}
                    </p>
                    <div>
                        <p>
                            post author: {
                                post?.author?.username
                                //get back
                            }
                        </p>
                    </div>
                    <div>
                        <p>
                            {
                                post.content
                            }
                        </p>
                    </div>
                </div>
            )
        })
    }
    const renderOtherPosts = (posts) => {
        return posts.map ((post) => {
            return (
                <div>
                    <img src={post.picture} /> 
                    <p>
                        post: {
                            post.posttitle
                        } 
                        {/* anything between curly braces is javascipt that gets filled in to the html */}
                    </p>
                    <div>
                        <p>
                            post author: {
                                post.author.username
                            }
                        </p>
                    </div>
                </div>
            )
        })
    }
    const renderPosts = () => {
        if (
            posts
        ) {
            //posts is an array of objects, each object represents one single post 
            //the map method loops over an array and returns html for every single item in that array
            //post singular represents every single post, while posts is the array of post
        //    const friendsAndClubsPosts = posts.filter((post) => {
        //     return post.reccomendation_type === "FRIENDS" || post.reccomendation_type === "CLUB" || post.reccomendation_type === "INTEREST"
        //    })
        //    const otherPosts = posts.filter((post) => {
        //     return post.reccomendation_type === "OTHER"
        //    })

           return (
            <div>
                 <div>
                <h3>
                    Friends and Clubs Posts
                </h3>
                {
                    renderFriendsAndClubPosts (posts)
                }
            </div>
            {/* <div>
                <h3>
                    Other Posts
                </h3>
                {
                    renderOtherPosts (otherPosts)
                }
            </div> */}
            </div>
           )
        }
    }
    return (
        <div>
            <h1>
                Posts
            </h1>
            <div>
                {
                    renderPosts ()
                }
            </div>
        </div>
    )
}