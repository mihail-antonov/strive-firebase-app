import firebase from "../firebase/clientApp";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


const uiConfig = {
	signInSuccessUrl: "/",

	signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
}

function SignInScreen() {
	return (
		<div>
			<h1>Email LOGIN</h1>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</div>
	)
}

export default SignInScreen;