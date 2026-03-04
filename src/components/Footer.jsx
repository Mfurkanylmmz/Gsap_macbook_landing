import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
    return (
        <footer>
            <div className="info">
                <p>
                    More ways to shop: Find an Apple Store or either retailer near you. Or call 0008000 040 1966.
                </p>
                <img src="/logo.svg" alt="Apple Logo" />
                <hr />

                <div className='links'>
                    <p>Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.</p>

                    <ul>
                        {
                            footerLinks.map(({ label, link }) => (
                                <li key={link}>
                                    <a href={link}>{label} </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </div>
        </footer>
    )
}

export default Footer
