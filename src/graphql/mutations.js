import { gql } from "@apollo/client";
import { USER_INFO, POST_DATA } from "./fragments";

export const UPDATE_PROFILE = gql`
	mutation updateUser($input: UserUpdateInput) {
		updateUser(input: $input) {
			...userInfo
		}
	}
	${USER_INFO}
`;
export const CREATE_POST = gql`
	mutation createPost($input: CreatePostInput!) {
		createPost(input: $input) {
			...postData
		}
	}
	${POST_DATA}
`;
