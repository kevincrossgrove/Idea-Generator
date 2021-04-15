import React from 'react'
import MainNavbar from '../MainNavbar'

const MyStuffLanding = () => {
    return (
        <>
            <MainNavbar logo={false}/>
            <div className="content">
                <div className="myStuffLanding">
                    <h1> Welcome to your dashboard!</h1>
                </div>
            </div>
        </>
    )
}

export default MyStuffLanding;
