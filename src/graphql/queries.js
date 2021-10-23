import { gql } from "@apollo/client";
import { USER_INFO, POST_DATA } from "./fragments";

export const PROFILE = gql`
	query {
		profile {
			...userInfo
		}
	}
	${USER_INFO}
`;
export const ALL_POSTS = gql`
	query allPosts($page: Int) {
		allPosts(page: $page) {
			...postData
		}
	}
	${POST_DATA}
`;
export const SINGLE_POST = gql`
	query singlePost($postId: String!) {
		singlePost(postId: $postId) {
			...postData
		}
	}
	${POST_DATA}
`;

export const POSTS_BY_USER = gql`
	query {
		postsByUser {
			...postData
		}
	}
	${POST_DATA}
`;

export const ALL_USERS = gql`
	query {
		allUsers {
			...userInfo
		}
	}
	${USER_INFO}
`;
export const SINGLE_USER = gql`
	query publicProfile($username: String!) {
		publicProfile(username: $username) {
			...userInfo
		}
	}
	${USER_INFO}
`;

export const TOTAL_POSTS = gql`
	query {
		totalPosts
	}
`