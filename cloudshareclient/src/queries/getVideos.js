import gql from 'graphql-tag'

export default gql `
    query QueryVideos($username: String!) {
        queryVideos(username: $username) {
            id
            size
            url
        }
    }

`