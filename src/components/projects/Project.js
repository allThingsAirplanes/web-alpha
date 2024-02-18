"use client";

import Link from "next/link";

import { formatDate } from "@/utils/dates";

import {
    useState,
    useRef
} from "react"

export default ({post, project}) => {
    const postCommentRef = useRef(null)
    const [showAddComment, setShowAddComment] = useState(false)
    const handleSubmitComment = async () => {
        try {
            const submitData = {
                post, 
                project,
                suggestion: postCommentRef.current.value
            }
            const res = await fetch ("/api/createProjectPostSuggestion", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }, 
                body: JSON.stringify(submitData)
            })
            const resJson = await res.json ()
            console.log("Comment submission response", resJson)
        } catch (error) {
            console.log("Error with handleSubmitCommnet", error)
        }
    }
    const handleShowAddComment = () => {
        setShowAddComment(!showAddComment)
    }

    const renderPostComments = () => {
        return post?.suggestions?.map((suggestion) => {
            return (
                <div>
                    <div>
                        <div>
                            <img src={suggestion.author.picture} />
                        </div>
                        <div>
                            <p>
                                {
                                    suggestion.author.username
                                }
                            </p>
                        </div>
                    </div>
                    <div>
                        <pre>
                            {
                                suggestion.content
                            }
                        </pre>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="posts-container-friends-post">
            <div className="posts-container-friends-post-date">
                <p>
                    {
                        formatDate(post.updatedAt)
                    }
                </p>
            </div>
            <Link href={`/profile/${post?.author?.username}`}>
            <div className="posts-container-friends-post-author">
                <div className="posts-container-friends-post-author-image">
                    <img src={post?.author?.picture || "https://images.unsplash.com/photo-1525406820302-88d59afa0be7?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                </div>
                <div className="posts-container-friends-post-author-username">
                    <p>
                        {
                            post?.author?.username
                            //get back
                        }
                    </p>
                </div>
            </div>
            </Link>
            <div>
                <p>
                    {
                        post?.title
                    }
                </p>
            </div>
            <div>
                <p>
                    {
                        post?.category
                    }
                </p>
            </div>
            <div className="posts-container-friends-post-content">
                <pre>
                    {
                        post.content || "No Post Content"
                    }
                </pre>
            </div>
            {
                post.media_url &&
                <div className="posts-container-friends-post-media">
                    <img src={post.media_url} />
                </div>
            }
            <div className="posts-container-friends-post-buttons">
                <button onClick={handleShowAddComment}>Suggestion</button>
                {/*Just got rid of Share and Like - maybe add share back in idk*/}
                <p>Comming Soon!</p>
            </div>
            {
                showAddComment &&
                <div>
                    <textarea
                        ref={postCommentRef}
                        placeholder="Add your comment"
                    />
                    <button onClick={handleSubmitComment}>
                        Comment
                    </button>
                </div>
            }
            <div>
                {
                    renderPostComments()
                }
            </div>
        </div>
    )
}