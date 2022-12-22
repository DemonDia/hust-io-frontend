import React from "react";

function Banner(props) {
    return (
        <div className="column is-three-fifths-desktop">
            <div className="container is-max-desktop banner">
                <h1 className="title is-1 bannerTitle">Hustl.io</h1>
                <p className="subtitle is-3 bannerSlogan">
                    A place where you get to achieve balance in school and out
                    of school. Balance your welfare and school life with us today!
                </p>
            </div>
        </div>
    );
}

export default Banner;
