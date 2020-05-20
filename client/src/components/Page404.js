import React from 'react'
import { Link } from "react-router-dom";

function Page404() {


    return (
        <div>
            <div className="page404">

                <div><h1>The page you are looking for doesn't exist!</h1><Link to="/"> Go Home</Link></div>

                <iframe className="wrong" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1" frameborder="0" allow="autoplay" title="Page not Found"></iframe>

            </div>
        </div>
    )
}

export default Page404
