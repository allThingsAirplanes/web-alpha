"use client"
import Link from "next/link"
import {
    useEffect,
    useState,
    useContext
} from "react"
import { userContext } from "@/context"
import Logout from "./logout"
import Signup from "../signup/Signup"
import Searchbar from "./Searchbar"

export default () => {
    const { user, setUser } = useContext(userContext)
    //everything react in front of it, for the most part, will start with the word use. These are called react hooks. (Anything that starts with a use)
    console.log("contextUser", user)
    const renderUserProfile = () => {
        if (
            user
        ) {
            return (
                <div className="header-right-nav-inner">
                    {/* <div>
                        <Link href="/">
                            Dashboard
                        </Link>
                    </div> */}
                    {/* <div>
                        <Link href="/profile">
                            Profile
                        </Link>
                    </div> */}
                    {/* <div>
                        <Link href="/clubs">
                            Clubs
                        </Link>
                    </div> */}
                    <div>
                        <Logout />
                    </div>
                    <div>
                        <Link href="/">
                            Virtual Hangar
                        </Link>
                    </div>
                    <div>
                        <Link href="/friends">
                            Friends
                        </Link>
                    </div>
                    <div className="header-right-nav-inner-user">
                        <div className="header-right-nav-inner-user-pic">
                            <img src={user.picture} />
                        </div>
                        {/* <p>
                            username: {
                                user.username
                            }
                        </p> */}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="header-right-nav-inner">
                    <div>
                        <Link href="/signup">
                            Signup
                        </Link>
                    </div>
                    <div>
                        <Link href="/login">
                            Login
                        </Link>
                    </div>
                </div>
            )
        }
    }
    //there is an order to how to write your react compoenent - the state always goes first
    //then the use effect comes next, and finally any functions afterwards.  
    return (
        <header className="header">
            <div className="header-left">
                <div className="header-left-logo">
                    <img src="/ataLogo.svg" />
                </div>
                <div className="header-left-actions">
                    <div className="header-left-actions-home header-left-actions-icon">
                        <Link href="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                            </svg>

                        </Link>
                    </div>
                    <div className="header-left-actions-moon header-left-actions-icon">
                        <Link href="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>


                        </Link>
                    </div>
                    <div>
                        <Searchbar />
                    </div>
                </div>
            </div>
            <div className="header-right">
                <nav className="header-right-nav">
                    {
                        renderUserProfile()
                        //the header was accessing the user profile and that was causing the error
                    }
                </nav>
            </div>
        </header>
        //This is known as nesting - and this is done best through sass. 
    )
}