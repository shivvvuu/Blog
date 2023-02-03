import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = 'https://api-ap-south-1.hygraph.com/v2/cldn0mb1z1qgg01ul9ax126l9/master';
/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */
const graphqlToken='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzU0MjU5MTgsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsZG4wbWIxejFxZ2cwMXVsOWF4MTI2bDkvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjU1OTRjM2E1LWZjNzMtNGJlMS1iNWM5LTNjMTBmOGY4YzZhOSIsImp0aSI6ImNsZG9oYzBvYTExajgwMXVvaHJ0ZWU1b2YifQ.0_ODDfMgKomqk5UQnstgSYqdjY93VH2biBkSFv5GrDYOeBtSxr9eNY92HFeXnLAQaaYgKRDapW79_UMxFmBFx1pEupiFcU1HvFC3lySCjlSbE7dAJsS-22jV3oLayl3OEbOU0LQOlEC_6zPOFpml4igg-f4Y-fUsFTJyJ-SorElkrb9C_6hSQqja7hr5G_XjXWvVM7yE-bLPy5MikRoLbrIxuExOHk37pWQqner9KeOakzFwTcr4--5eQW0NlFRozEg6RZEM0mMVzehTGz3D_df586Ie3i5rRE7z6Dkd83a3D2nFnu8MUMlb4xnBtqalvKC5MlMCIoCSWmJ3wWOn_w2KqW_dlRBM0cNFG7DvOaz-GciF-rrJhuu86neEDsvy68CK-1-UUyqIqmm75DeRIKkKtky0LwzF2DqtXOlyyB_k4wWj9LPHw-f_JOxXJ_BjVNE2P1TYTI6oL36IgcmxRW59BD-b7pqocWISB3ThREzWe-8vtgu3p3NMBhONnolWO4Fu3wKNaq8q51ZhGsHbG98NUeBBXh8s5fpeUxnnmd4fu4dEbFJgSOMVrD-eG6nO9E9dtdGdTpNFg8i6EaL30fEaUIX5WpJPklamQ3t8Zyyh-cBu2yO-cycTbEfBVkUBnR0iSb1agBH2XC4te6Cl4zCl8mndCJUAJz82l67eLhs'
// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphqlToken}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);}