import gql from 'graphql-tag'

export default gql `
mutation DeleteVideo($url: String!) {
  deleteVideo(url: $url) {
    id
    size
    url
  }
}

`