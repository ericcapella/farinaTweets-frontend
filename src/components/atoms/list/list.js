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
                                                    </p>{" "}
                                                    <p className="date-rt">
                                                        {
                                                            eachTweet.created_at
                                                                .split("-")[2]
                                                                .split("T")[0]
                                                        }
                                                        /
                                                        {
                                                            eachTweet.created_at.split(
                                                                "-"
                                                            )[1]
                                                        }
                                                        /
                                                        {
                                                            eachTweet.created_at.split(
                                                                "-"
                                                            )[0]
                                                        }
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="date-no-rt">
                                                    {
                                                        eachTweet.created_at
                                                            .split("-")[2]
                                                            .split("T")[0]
                                                    }
                                                    /
                                                    {
                                                        eachTweet.created_at.split(
                                                            "-"
                                                        )[1]
                                                    }
                                                    /
                                                    {
                                                        eachTweet.created_at.split(
                                                            "-"
                                                        )[0]
                                                    }
                                                </p>
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

                                            <p className="tweet-text">
                                                {eachTweet.text}
                                            </p>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    ) : (
                        <div>
                            {/* Inicio tabla */}
                            <div className="table">
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
                                                        @
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
                <div className="prior-to-click">
                    <div className="below-button">
                        <img src="https://farmaleaderstalento.com/wp-content/uploads/2021/05/flecha.gif"></img>
                        <h1>¡Haz clic en buscar!</h1>
                    </div>
                    <div className="additional-info">
                        <p>
                            <br />
                            Hola,
                            <br /> Farina Tweets es una aplicación web que te
                            permite ver y analizar los últimos 100 tweets con el
                            hastag{" "}
                            <a
                                href="https://twitter.com/search?q=%23farina"
                                target="_blank"
                            >
                                #farina
                            </a>{" "}
                            de esta semana. <br />
                            Puedes empezar haciendo clic en el botón de arriba.
                            😎👍 <br />
                            Esta app es de código abierto y se pueden ver los
                            repositorios en GitHub:
                        </p>
                        <ul>
                            <li>
                                <a
                                    href="https://github.com/ericcapella/farinaTweets-frontend"
                                    target="_blank"
                                >
                                    Frontend
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/ericcapella/farinaTweets-backend"
                                    target="_blank"
                                >
                                    Backend
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default List
