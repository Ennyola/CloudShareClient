import gql from 'graphql-tag'

export default gql `
mutation DeleteAudio($url: String!) {
  deleteAudio(url: $url) {
    url
    id
    size
  }
}
`