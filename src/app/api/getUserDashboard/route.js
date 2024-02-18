import {
    NextResponse
} from "next/server"

import { connectMongo } from "@/config/mongo"

import Event from "@/models/Event"

import Club from "@/models/Club"
import Project from "@/models/Project"
import User from "@/models/User"
import Post from "@/models/Post"

import { checkSession } from "@/utils/auth"

export const dynamic = "force-dynamic"

export const revalidate = 0

export async function GET() {
    try {
        const session = await checkSession()
        if (!session) {
            return NextResponse.json({
                success: false,
                error_message: "Could not authenticate",
                data: null
            })
        }
        await connectMongo()

        const userClubs = await Club.find({
            members: session.data.id
            //this should only get the clubs where the user is the member
        }).populate([
            {
                path: "posts.author"
            },
            {
                path: "posts.comments.author"
            }
        ])

        const userProjects = await Project.find({
            "collaborators.user": session.data.id
        }).populate([
            {
                path: "posts.author"
            },
            {
                path: "posts.suggestions.author"
            }
        ])

        const userData = await User.findById(session.data.id).populate({
            path: "interests"
        })

        const userInterests = userData.toObject().interests;
        const userInterestsMap = userInterests.map((interest) => {
            return interest.name
        })

        // console.log("User interests map: ", userInterestsMap)
        const userOwnPosts = await Post.find({
            author: session.data.id
        }).populate([
            {
                path: "author"
            },
            {
                path: "comments.author"
            }
        ]).sort({updatedAt:-1})

        console.log("User own post", userOwnPosts)

        let userInterestedPosts = await Post.find({
            category: {
                $in: userInterestsMap
            }
        }).populate([
            {
                path: "author"
            },
            {
                path: "comments.author"
            }
        ]).sort({ updatedAt: -1 })

        //For now, all of the user's own post are attached to the user interested posts in the algorithm. 
        userInterestedPosts = userInterestedPosts.concat(userOwnPosts)

        console.log("User intered posts: ", userInterestedPosts)



        // POST RANKING ALGORITHM
        // ================================================
        const userClubsPosts = []
        for (let club of userClubs) {
            const clubObj = club.toObject()

            for (let post of clubObj.posts) {
                userClubsPosts.push({
                    ...post,
                    type: "CLUB"
                })
            }
        }

        // console.log("User club posts: ", userClubsPosts)

        const userProjectsPosts = []
        for (let project of userProjects) {
            const projectObj = project.toObject()

            for (let post of projectObj.posts) {
                userProjectsPosts.push({
                    ...post,
                    type: "PROJECT"
                })
            }
        }

        // console.log("User projects posts: ", userProjectsPosts)

        const userInterestedPostsMapped = userInterestedPosts.map((post) => {
            return {
                ...post.toObject(),
                type: "INTEREST_POST"
            }
        })

        const allPostsLen = userClubsPosts.length + userProjectsPosts.length + userInterestedPosts.length

        const sortedPosts = [];

        while (sortedPosts.length < allPostsLen) {
            const randNum = Math.random() * 100;

            // Push club post
            if (randNum <= 50) {
                const nextRemainingPost = userClubsPosts.findIndex((post) => {
                    return post?.type === "CLUB"
                })

                if (nextRemainingPost > -1) {
                    sortedPosts.push(userClubsPosts[nextRemainingPost])

                    userClubsPosts[nextRemainingPost] = null
                }
                // Push project post
            } else if (randNum <= 80) {
                const nextRemainingPost = userProjectsPosts.findIndex((post) => {
                    return post?.type === "PROJECT"
                })

                if (nextRemainingPost > -1) {
                    sortedPosts.push(userProjectsPosts[nextRemainingPost])

                    userProjectsPosts[nextRemainingPost] = null
                } else {
                    const nextRemainingPost = userInterestedPostsMapped.findIndex((post) => {
                        return post?.type === "INTEREST_POST"
                    })

                    if (nextRemainingPost > -1) {
                        sortedPosts.push(userInterestedPostsMapped[nextRemainingPost])
                    }

                    userInterestedPostsMapped[nextRemainingPost] = null
                }
                // Push other posts
            }

            // console.log("Num of sorted posts", sortedPosts.length)
        }
        // END POST RANKING ALGORITHM
        // ============================================================


        // console.log("Sorted posts: ", sortedPosts)
        //straightforward implementation of event reccomendations
        //If a category matches a user interest, then we are going to rec the event

        const reccomendedEvents = await Event.find ({
            category: {
                $in: userInterestsMap
            }
        })
        const reccomendedProjects = await Project.find ({
            category: {
                $in: userInterestsMap
            }
        })


        const resData = {
            clubs: userClubs,
            projects: userProjects,
            reccomendedEvents: reccomendedEvents,
            reccomendedProjects: reccomendedProjects,
            userInterests: userInterests,
            posts: sortedPosts
        }

        return NextResponse.json(resData)
    } catch (error) {
        console.log("Error with getting user dashboard", error)
        const errorData = {
            success: false,
            error_code: 500,
            error_message: "Could not get user dashboard"
        }
        return NextResponse.json(errorData, {
            status: 500
        })
    }
}