import gql from 'graphql-tag'
export default gql `
query getImages($username:String!){
    getfiles(username:$username){
      id
      size
      url
    }
    
  }
`