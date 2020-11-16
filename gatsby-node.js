const path = require(`path`)
const slash = require(`slash`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // we use the provided allContentfulBlogPost query to fetch the data from Contentful
  return graphql(
    `
      {
        allContentfulContent {
          edges {
            node {
              slug
              title
            }
          }
        }
        allContentfulPost {
          edges {
            node {
              slug
              title
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data", result.errors)
      }
      // Resolve the paths to our template
      const blogPostTemplate = path.resolve("./src/templates/blogpost.js")
      const mainPageTemplate = path.resolve("./src/templates/main.js")
      // Then for each result we create a page.
      result.data.allContentfulPost.edges.forEach(edge => {
        console.log({ edge })
        createPage({
          path: `/blogposts/${edge.node.slug}/`,
          component: slash(blogPostTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        })
      })
      result.data.allContentfulContent.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}/`,
          component: slash(mainPageTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
          },
        })
      })
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error)
    })
}
