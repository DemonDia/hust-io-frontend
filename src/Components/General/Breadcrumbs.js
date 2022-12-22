import React from "react";
import { Link } from "react-router-dom";
function Breadcrumbs({ links }) {
    return (
        <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                {links.map((link, index) => {
                    return (
                        <>
                            {link.linkDest ? (
                                <li>
                                    <Link to={link.linkDest}>{link.text}</Link>
                                </li>
                            ) : (
                                <li>
                                    <Link>{link.text}</Link>
                                </li>
                            )}
                        </>
                    );
                })}

            </ul>
        </nav>
    );
}

export default Breadcrumbs;
