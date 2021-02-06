import Head from "next/head";
import { StarIcon } from "../components/icons";
import styles from "../styles/Home.module.css";

import { gql, useQuery } from "@apollo/client";

const GET_REPOSITORY = gql`
  query RepositoryQuery($repository: String!, $owner: String!) {
    repository(name: $repository, owner: $owner) {
      id
      name
      description
      forkCount
      stargazerCount
    }
  }
`;

const ADD_STAR = gql`
  mutation AddStarMutation($starrable: AddStarInput!) {
    addStar(input: $starrable) {
      clientMutationId
      starrable {
        id
        stargazerCount
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    pollInterval: 1000,
    variables: {
      owner: "juhanakristian",
      repository: "next-graphql-msw-example",
    },
  });

  return (
    <div className={styles.container}>
      {loading || !data ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>{data.repository.name}</h3>
          <p>{data.repository.description}</p>
          <div className={styles.star}>
            <span>
              <StarIcon /> Star
            </span>
            <div>{data.repository.stargazerCount}</div>
          </div>
        </div>
      )}
    </div>
  );
}
