import gql from 'graphql-tag'

export default gql `
mutation AddFile($file: Upload!, $username: String!) {
    uploadFile(file: $file, username: $username) {
      id
      size
      url
    }
  }

`