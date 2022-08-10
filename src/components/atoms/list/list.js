import { useEffect, useState } from "react"
import { getParsedTweets, getTweets } from "../../../utils/apiCalls"
import "./list.css"

const List = ({ tweets, setTweets, searchTweets }) => {
    const loadTweets = () => {
        getParsedTweets("twitter").then((tweets) => {
            setTweets(tweets)
        })
    }

    useEffect(() => {
        if (searchTweets) {
            loadTweets()
        }
    }, [searchTweets])

    let tweetsCount = tweets.length

    const [tableView, setTableView] = useState(true)

    return (
        <div>
            {searchTweets ? (
                <>
                    <div className="title">
                        <h1>
                            {tweetsCount} tweets con "#farina" en la última
                            semana:
                        </h1>
                        <div class="view-selector">
                            {tableView ? (
                                <button onClick={() => setTableView(false)}>
                                    Ver como tabla
                                </button>
                            ) : (
                                <button onClick={() => setTableView(true)}>
                                    📋 Ver como lista
                                </button>
                            )}
                        </div>
                    </div>

                    {tableView ? (
                        <div className="tweets">
                            {tweets.map((eachTweet) => {
                                return (
                                    <a
                                        href={`https://twitter.com/eric/status/${eachTweet.id}`}
                                        target="_blank"
                                    >
                                        <div className="tweet-box">
                                            {eachTweet.text.startsWith("RT") ? (
                                                <div className="rt">
                                                    <p>
                                                        🔁 @
                                                        {
                                                            eachTweet.author
                                                                .username
                                                        }{" "}
                                                        retweeted a tweet
                                                    </p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className="user">
                                                <img
                                                    className="user-image"
                                                    src={
                                                        eachTweet.author
                                                            .profile_image_url
                                                    }
                                                ></img>

                                                <div className="user-info">
                                                    <div className="name-username">
                                                        <p className="user-name">
                                                            {
                                                                eachTweet.author
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className="user-username">
                                                            @
                                                            {
                                                                eachTweet.author
                                                                    .username
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="user-metrics">
                                                        <p>
                                                            {
                                                                eachTweet.author
                                                                    .public_metrics
                                                                    .followers_count
                                                            }{" "}
                                                            seguidores
                                                        </p>
                                                        <p>
                                                            {
                                                                eachTweet.author
                                                                    .public_metrics
                                                                    .following_count
                                                            }{" "}
                                                            siguiendo
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <p>{eachTweet.text}</p>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    ) : (
                        <div>
                            {/* Inicio tabla */}
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Tweet</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tweets.map((eachTweet) => {
                                            return (
                                                <tr key={eachTweet.id}>
                                                    <td>
                                                        {eachTweet.author.name}
                                                    </td>
                                                    <td>
                                                        {
                                                            eachTweet.author
                                                                .username
                                                        }
                                                    </td>
                                                    <td>{eachTweet.text}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* FIn tabla */}
                        </div>
                    )}
                </>
            ) : (
                <h1>Dale a buscar bro</h1>
            )}
        </div>
    )
}

export default List
