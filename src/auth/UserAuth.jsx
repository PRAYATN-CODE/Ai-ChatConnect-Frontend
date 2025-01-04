import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserAuth = ({ children }) => {
    // const { user } = useContext(UserContext)
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setLoading(false)
        }

        if (!token || !user) {
            console.log('user', user, 'token', token)
            navigate('/login')
        }
    }, [])

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserAuth
