import React from "react";
import Head from "next/head";
import { EmptyStarIcon, FilledStarIcon } from "../components/icons";
import styles from "../styles/Home.module.css";

import { gql, useQuery, useMutation } from "@apollo/client";

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
  const [starred, setStarred] = React.useState(false);

  const { loading, error, data: queryData } = useQuery(GET_REPOSITORY, {
    pollInterval: 10000,
    variables: {
      owner: "juhanakristian",
      repository: "next-graphql-msw-example",
    },
  });

  const [addStar] = useMutation(ADD_STAR);

  function handleAddStar(e) {
    e.preventDefault();
    addStar({ starrable: queryData.repository.id });
    setStarred(true);
  }

  return (
    <div className={styles.container}>
      {loading || !queryData ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>{queryData.repository.name}</h3>
          <p>{queryData.repository.description}</p>
          <div className={styles.star}>
            <button onClick={handleAddStar}>
              {starred ? <FilledStarIcon /> : <EmptyStarIcon />}
              <span>Star</span>
            </button>
            <a href="https://github.com/juhanakristian/next-graphql-msw-example/stargazers">
              {starred
                ? queryData.repository.stargazerCount + 1
                : queryData.repository.stargazerCount}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
