import Head from "next/head";
import styles from "../styles/Home.module.css";

import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query UserQuery($login: String!) {
    user(login: $login) {
      name
      bio
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_USER, {
    pollInterval: 1000,
    variables: { login: "juhanakristian" },
  });

  if (loading || !data) return <p>Loading...</p>;

  console.log(data);

  return (
    <div className={styles.container}>
      <h3>{data.user.name}</h3>
      <p>{data.user.bio}</p>
    </div>
  );
}
