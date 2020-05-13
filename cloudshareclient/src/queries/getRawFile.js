import gql from 'graphql-tag';

export default gql `
query GetRawFiles($username: String!) {
    getRawFiles(username: $username) {
        id
        size
        url
    }
}

`