import { gql } from 'apollo-boost'

export default gql`
    {
        user{
            id
            username
            email
        }
    }
`

