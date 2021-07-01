import Head from "next/head";
import Image from "next/image";
import firebase from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { delBasePath } from "next/dist/next-server/lib/router/router";

export default function Home() {

	const db = firebase.firestore();

	const [user, loading, error] = useAuthState(firebase.auth());

	const [votes, votesLoading, votesError] = useCollection (
		firebase.firestore().collection("votes"), {}
	);

	if (!votesLoading && votes) {
		votes.docs.map((doc) => console.log(doc.data()));
	}

	const addVoteDocument = async (vote) => {
		await db.collection("votes").doc(user.uid).set({
			vote,
		})
	}

  return (
	  <>
		<button style={{ fontSize: 32, marginRight: 8}} onClick={() => addVoteDocument("yes")}>YES</button>
		<button style={{ fontSize:32}} onClick={() => addVoteDocument("no")}>NO</button>

		<h3>Counter</h3>
		<p>Votes for YES</p>
		<span>{votes?.docs?.filter((doc) => doc.data().vote === "yes").length}</span>

		<p>Votes for NO</p>
		<span>{votes?.docs?.filter((doc) => doc.data().vote === "no").length}</span>
	</>
  )
}
