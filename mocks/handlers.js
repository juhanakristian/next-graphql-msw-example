import { graphql } from "msw";

const github = graphql.link("https://api.github.com/graphql");

export const handlers = [
  github.query("RepositoryQuery", (req, res, ctx) => {
    return res(
      ctx.data({
        repository: {
          id: "MDEwOlJlcG9zaXRvcnkzMzU0MTc5Mjc=",
          stargazerCount: 1,
          forkCount: 0,
          name: "next-graphql-msw-example",
          description:
            "A example of using MSW to mock GraphQL API in a NextJS app",
        },
      })
    );
  }),
  github.mutation("AddStarMutation", (req, res, ctx) => {
    return res(
      ctx.data({
        addStar: {
          clientMutationId: null,
          starrable: {
            id: "MDEwOlJlcG9zaXRvcnkzMzU0MTc5Mjc=",
            stargazerCount: 2,
          },
        },
      })
    );
  }),
];
