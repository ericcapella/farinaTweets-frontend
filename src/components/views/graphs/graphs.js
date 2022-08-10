import React, { PureComponent, useEffect, useState } from "react"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts"
import { Link } from "react-router-dom"
import Logo from "../../atoms/logo/logo"
import "./graphs.css"
import data from "../../../assets/data.json"
import { getParsedTweets } from "../../../utils/apiCalls"

const Graphs = () => {
    const [dbTweets, setDbTweets] = useState([])

    const [dataG1, setDataG1] = useState([])
    const [dataG2, setDataG2] = useState([])

    const loadTweets = () => {
        getParsedTweets().then((tweets) => {
            setDbTweets(tweets)
            getDataForG1(tweets)
            getDataForG2(tweets)
        })
    }

    const getDataForG1 = (tweets) => {
        let amountOfFollowers = 0
        let maxFollowers = 0
        let leastFollowers

        const splitTime = tweets.map((tweet) => {
            const followers = tweet.author.public_metrics.followers_count
            amountOfFollowers += followers
            if (followers > maxFollowers) {
                maxFollowers = followers
            }
            if (leastFollowers === undefined) {
                leastFollowers = followers
            }
            if (followers < leastFollowers) {
                leastFollowers = followers
            }
            return tweet.created_at.split("T")[1].split(":")[0] + " H"
            // return tweet.created_at.split('T')[0]
        })

        console.log({
            maxFollowers,
            leastFollowers,
            average: amountOfFollowers / 100,
            total: amountOfFollowers,
        })

        let obj = {}
        //Mira si existe la key en obj (vacio) y suma 1 o la crea.
        splitTime.forEach((date) => {
            if (obj[date]) {
                obj[date]++
            } else {
                obj[date] = 1
            }
        })
        //Lo pasamos de obj a array y después con el map de array de arrays a array de objetos
        const deObjaArray = Object.entries(obj).map(([key, value]) => {
            return { date: key, tweets: value }
        })
        //Ordena para que la fecha más antigua sea la primera
        setDataG1(deObjaArray.sort((a, b) => (a.date > b.date ? 1 : -1)))
    }

    const getDataForG2 = (tweets) => {
        const onlyText = tweets.map((tweet) => {
            return tweet.text
        })

        const rtOrTw = {
            retweet: 0,
            tweet: 0,
        }

        onlyText.forEach((text) => {
            if (text.startsWith("RT")) {
                rtOrTw.retweet++
            } else {
                rtOrTw.tweet++
            }
        })

        const deObjaArray = Object.entries(rtOrTw).map(([key, value]) => {
            return { name: key, ammount: value }
        })

        setDataG2(deObjaArray)
        console.log(deObjaArray)
    }
    useEffect(() => {
        loadTweets()
    }, [])

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

    return (
        <div className="page">
            <Link to="/">
                <Logo></Logo>
            </Link>
            <p>Graphs</p>
            {/* Graph 1 */}
            <p>Tweets diarios</p>
            <BarChart width={1000} height={400} data={dataG1}>
                <Bar type="monotone" dataKey="tweets" fill="#fea500" />
                <Tooltip />
                <XAxis dataKey="date" />
                <YAxis />
            </BarChart>

            {/* Graph 2 */}
            <p>Número de RT y tweets normales</p>
            <PieChart width={1000} height={500}>
                <Pie
                    data={dataG2}
                    labelLine={false}
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="ammount"
                >
                    {dataG2.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>

            {/* Graph 3 */}
            <p>Followers de los usuarios que tweetean </p>
            <LineChart width={1000} height={400} data={dataG1}>
                <Line type="monotone" dataKey="tweets" stroke="#fea500" />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </div>
    )
}

export default Graphs
