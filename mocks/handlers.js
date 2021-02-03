import { graphql } from "msw";

const github = graphql.link("https://api.github.com/graphql");

export const handlers = [
  github.query("UserQuery", (req, res, ctx) => {
    return res(
      ctx.data({
        user: {
          name: "Juhana Jauhiainen",
          bio: "Working on web stuff. ",
        },
      })
    );
  }),
];
