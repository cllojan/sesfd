"use client"
import Header from "@/components/Header";
import { useSession } from "next-auth/react"
function ProfilePage(){
    const {data, status} = useSession();
    
    return <>
        <Header/>
        <div>Profile</div>
    </>
}

export default ProfilePage