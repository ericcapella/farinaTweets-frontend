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
    ResponsiveContainer,
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
    const [dataG3, setDataG3] = useState([])

    const loadTweets = () => {
        getParsedTweets().then((tweets) => {
            setDbTweets(tweets)
            getDataForG1(tweets)
            getDataForG2(tweets)
            getDataForG3(tweets)
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
            return tweet.created_at.split("T")[1].split(":")[0] + " h"
            // return tweet.created_at.split("T")[0]
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

    const getDataForG3 = (tweets) => {
        const splitTimeG3 = tweets.map((tweet) => {
            // return tweet.created_at.split("T")[1].split(":")[0] + " H"
            return tweet.created_at.split("T")[0]
        })

        let obj3 = {}
        splitTimeG3.forEach((date) => {
            if (obj3[date]) {
                obj3[date]++
            } else {
                obj3[date] = 1
            }
        })

        const deObjaArray3 = Object.entries(obj3).map(([key, value]) => {
            return { date: key, tweets: value }
        })

        setDataG3(deObjaArray3.sort((a, b) => (a.date > b.date ? 1 : -1)))
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

    const COLORS = ["#fe5d00", "#fea500"]

    return (
        <div className="page">
            <Link to="/">
                <Logo></Logo>
            </Link>
            <div className="title-graphs">
                <div>
                    <h1>Gráficos de análisis de los tweets de #farina</h1>
                </div>
                <div>
                    <Link to="/">
                        <button>Volver al inicio</button>
                    </Link>
                </div>
            </div>
            <div className="charts-layout">
                <br />
                {/* Graph 1 */}
                <h3>Tweets según la hora del día</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={dataG1}>
                        <Line
                            type="monotone"
                            dataKey="tweets"
                            stroke="#fea500"
                        />
                        <Tooltip />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="date" />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
                <br />
                {/* Graph 3 */}
                <h3>Tweets diarios</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={dataG3}>
                        <Bar type="monotone" dataKey="tweets" fill="#fea500" />
                        <Tooltip />
                        <XAxis dataKey="date" />
                        <YAxis />
                    </BarChart>
                </ResponsiveContainer>
                <br />
                {/* Graph 2 */}
                <h3>Proporción de tweets y retweets</h3>
                <ResponsiveContainer width="100%" height={600}>
                    <PieChart>
                        <Pie
                            data={dataG2}
                            labelLine={false}
                            outerRadius="100%"
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
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Graphs
