import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
const Main = ({ data }) => {
  console.log(data.contentfulContent)
  const { title, description } = data.contentfulContent
  return (
    <Layout>
      <SEO title={title} />
      <div className="blogpost">
        <h1>{title}</h1>
        <p>{description.description}</p>
        <Link to="/">Back to Home</Link>
      </div>
    </Layout>
  )
}

export default Main

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulContent(slug: { eq: $slug }) {
      description {
        description
      }
      title
    }
  }
`
