// import { MY_BACKEND_URL } from "../constants"

// export const getTweets = ({ source, method, body }) => {
//     let url = ""
//     const token = "Bearer " + process.env.REACT_APP_TWTOKEN
//     const options = {
//         headers: { Authorization: token },
//     }

//     if (source === "twitter") {
//         url =
//             "https://api.twitter.com/2/tweets/search/recent?max_results=100&expansions=author_id,geo.place_id&query=%23farina"
//     } else {
//         url = ""
//     }
//     if (method === "POST") {
//         options.body = JSON.stringify(body)
//     }

//     return fetch(url, options).then((response) => {
//         if (!response.ok) {
//             return Promise.reject()
//         }
//         return response.json()
//     })
// }

export const getParsedTweets = (source) => {
    let BACKEND = "http://localhost:3001"

    if (source === "twitter") {
        BACKEND = BACKEND + "/refresh-tweets"
    } else {
        BACKEND = BACKEND + "/db-tweets"
    }

    return fetch(BACKEND).then((response) => {
        if (!response.ok) {
            return Promise.reject()
        }
        return response.json()
    })
}
