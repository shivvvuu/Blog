import { graphqlSync } from "graphql";
import { gql, request } from "graphql-request";
import Categories from './../components/Categories';

const graphqlAPI = process.env.NEXT_PBULIC_GRAPHCMS_ENDPOINT;

export const getPost = async() =>{
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges;
}



export const getSimilarPosts = async() => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories:[String!]){
      posts(
        where:{slug_not: $slug, AND:{categories_some:{slug_in:$categories}}}
        last:3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
  }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.posts;
}
export const getRecentPosts = async() => {
  const query = gql`
        query GetPostDetails(){
          posts(
            orderBy: createdAt_ASC
            last:3
            ){
              title
              featuredImage{
                url
              }
              createdAt
              slug
            }
        }

  `
  const result = await request('https://api-ap-south-1.hygraph.com/v2/cldn0mb1z1qgg01ul9ax126l9/master', query)

  return result.posts;
}

export const getCategories = async() => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result = await request('https://api-ap-south-1.hygraph.com/v2/cldn0mb1z1qgg01ul9ax126l9/master', query)
   return result.Categories  

}