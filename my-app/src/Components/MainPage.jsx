import React from 'react';
import { Link } from 'react-router-dom';
function MainPage(){
    return(
        <div>
            <div class="hero">
            </div>
            <div className = "written_content">
                <Link to="/register" style={
                    {
                        textDecoration: 'none',
                        color: 'black'
                    }
                }>
                    <h1>Register Now</h1>
                </Link>
                <p>Win a free trip to Caribbean Islands!</p>
            </div>
        </div>
    )
}
export default MainPage;