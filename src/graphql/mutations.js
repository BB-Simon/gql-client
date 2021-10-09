import {gql} from '@apollo/client';
import {USER_INFO} from './fragments';

export const UPDATE_PROFILE = gql`
    mutation updateUser($input: UserUpdateInput){
        updateUser(input: $input){
            ...userInfo
        }
    }
    ${USER_INFO}
`