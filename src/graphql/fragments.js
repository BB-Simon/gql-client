import {gql} from '@apollo/client';

export const USER_INFO = gql`
    fragment userInfo on User {
        _id
        about
        username
        name
        email
        images {
            url
            public_id
        }
        createdAt
        updatedAt
    }
`