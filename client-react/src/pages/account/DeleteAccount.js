import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'

const DeleteAccount = (props) => {//user={userId, username} setUser={}
    const userId = props.user.userId
    console.log("props.user.userID at Delete account", props.user.userId)
    const [userDeleted, setUserDeleted] = useState(false)

    const userIdParam = useParams().id

    useEffect(() => {
        if (userId === userIdParam) {
            axios.put(`/api/user/${userId}`, { status: "Inactive" })
                .then((response) => {
                    console.log("deactivated user")
                    localStorage.clear()
                    setTimeout(() => {
                        setUserDeleted(true)
                        props.setUser({ username: "" })
                    }, 2000)
                })
                .catch((error) => {
                    console.log('error', error)
                })
        }
    }, [])

    if (userDeleted) {
        return <Redirect to={"/"} />
    }

    return (
        <>
            {userId === userIdParam ?
                <p> We are deleting your account. You will be redirected once done.</p>
                :
                <Redirect to={'/restricted'} />}
        </>
    )
}

export default DeleteAccount