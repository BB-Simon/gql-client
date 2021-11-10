import { Switch, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { ToastContainer } from "react-toastify";
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import firebaseConfig from "./firebase";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import UpdatePassword from "./pages/auth/UpdatePassword";
import Profile from "./pages/auth/Profile";
import Post from "./pages/post/Post.jsx";
import Dhasboard from "./pages/dhasboard/Dhasboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";
import UpdatePost from "./pages/post/UpdatePost";
import SinglePost from "./pages/post/SinglePost";
import SearchResult from "./pages/SearchResult";

function App() {
	const {
		state: { user },
	} = useContext(AuthContext);

	// Initialize Firebase
	initializeApp(firebaseConfig);

	// set auth header for gql
	const authHeader = setContext((_, { headers }) => {
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authtoken: user ? user.token : "",
			},
		};
	});
	const httpLink = createHttpLink({
		uri: process.env.REACT_APP_GRAPHQL_API,
	});
	// setup  apollo client
	const client = new ApolloClient({
		link: authHeader.concat(httpLink),
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={client}>
			<Navbar />
			<ToastContainer />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/users' component={Users} />
				<Route exact path='/user/:username' component={SingleUser} />
				<PublicRoute exact path='/login' component={Login} />
				<PublicRoute exact path='/signup' component={Register} />
				<Route
					exact
					path='/complete-registration'
					component={CompleteRegistration}
				/>
				<Route exact path='/password/forgot' component={ForgotPassword} />
				<PrivateRoute exact path='/dhasboard' component={Dhasboard} />
				<PrivateRoute
					exact
					path='/update-password'
					component={UpdatePassword}
				/>
				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/post/create' component={Post} />
				<PrivateRoute
					exact
					path='/post/update/:postid'
					component={UpdatePost}
				/>
				<Route exact path='/post/:postid' component={SinglePost} />
				<Route exact path='/search/:query' component={SearchResult} />
			</Switch>
		</ApolloProvider>
	);
}

export default App;
