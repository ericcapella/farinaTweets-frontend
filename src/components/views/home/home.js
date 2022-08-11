import List from "../../atoms/list/list"
import "./home.css"
import Logo from "../../atoms/logo/logo"
import Button from "../../atoms/button/button"
import { useState } from "react"

const Home = () => {
    const [tweets, setTweets] = useState([])

    const [searchTweets, setSearchTweets] = useState(false)

    return (
        <div className="home">
            <Logo></Logo>
            <Button
                tweets={tweets}
                setTweets={setTweets}
                searchTweets={searchTweets}
                setSearchTweets={setSearchTweets}
            ></Button>
            <List
                tweets={tweets}
                setTweets={setTweets}
                onClick={(e) => setSearchTweets(e)}
                searchTweets={searchTweets}
            ></List>
        </div>
    )
}

export default Home
