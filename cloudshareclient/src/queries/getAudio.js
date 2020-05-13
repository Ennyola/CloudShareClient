import gql from 'graphql-tag'

export default gql `
query QueryMusic($username: String!) {
  queryMusic(username: $username) {
    id
    size
    url
  }
}

`