"use client";

import Link from "next/link";

import {
    useState,
    useRef
} from "react"

import { userContext } from "@/context";

export default ({post}) => {
    const postCommentRef = useRef(null)
    const [showAddComment, setShowAddComment] = useState(false)
    const handleSubmitComment = async () => {
        try {
            const submitData = {
                post, 
                comment: postCommentRef.current.value
            }
            const res = await fetch ("/api/createPostComment", {
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
        return post?.comments?.map((comment) => {
            return (
                <div className="posts-comments-container-comment" >
                    <div className="posts-comments-container-comment-header">
                        <div className="posts-comments-container-comment-header-image">
                            <img src={comment.author.picture} />
                        </div>
                        <div className="posts-comments-container-comment-header-author">
                            <p>
                                {
                                    comment.author.username
                                }
                            </p>
                        </div>
                    </div>
                    <div className="posts-cotainer-friends-post-comments-container-comment-content">
                        <pre>
                            {
                                comment.content
                            }
                        </pre>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="posts-container-friends-post" key={post._id}>
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
                <button>Like</button>
                <button onClick={handleShowAddComment}>Comment</button>
                <button>Share</button>
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
            <div className="posts-comments-container">
                {
                    renderPostComments()
                }
            </div>
        </div>
    )
}