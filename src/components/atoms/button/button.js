import { useState } from "react"
import { Link } from "react-router-dom"
import "./button.css"

const Button = ({ tweets, searchTweets, setSearchTweets }) => {
    let tweetsCount = tweets.length
    console.log(searchTweets)

    return (
        <div className="button">
            <button
                className="button-fetch"
                onClick={() => setSearchTweets(true)}
            >
                Buscar últimos tweets con el hastag #farina
            </button>
            {tweetsCount >= 1 ? (
                <Link to="/graphs">
                    <button className="button-save">
                        Analizar {tweetsCount} tweets
                    </button>
                </Link>
            ) : (
                ""
            )}
        </div>
    )
}

export default Button
