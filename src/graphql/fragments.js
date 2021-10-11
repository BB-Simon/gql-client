import { gql } from "@apollo/client";

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
`;

export const POST_DATA = gql`
	fragment postData on Post {
		_id
		content
		image {
			url
			public_id
		}
		postedBy {
			_id
			username
		}
	}
`;
