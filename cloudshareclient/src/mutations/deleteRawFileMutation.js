import gql from 'graphql-tag';

export default gql `
mutation ($url: String!) {
    deleteRawFiles(url: $url) {
      id
      size
      url
    }
  }
  

`