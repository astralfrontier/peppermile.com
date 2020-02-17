import React from "react"
import { graphql, navigate, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Pagination from "react-bootstrap/Pagination"

// Note: pages start at 1
const paginationFor = (urlPrefix = "", numPages, currentPage) => {
  const onClickFor = page => () =>
    navigate(page > 1 ? `${urlPrefix}/page/${page}` : `${urlPrefix}/`)
  const pageWindow = 3

  let items = []
  items.push(
    <Pagination.First disabled={currentPage === 1} onClick={onClickFor(1)} />
  )
  items.push(
    <Pagination.Prev
      disabled={currentPage === 1}
      onClick={onClickFor(Math.max(1, currentPage - 1))}
    />
  )
  if (currentPage > pageWindow) {
    items.push(<Pagination.Ellipsis key={"early"} />)
  }
  for (
    let page = Math.max(1, currentPage - pageWindow);
    page <= Math.min(numPages, currentPage + pageWindow);
    page++
  ) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={onClickFor(page)}
      >
        {page}
      </Pagination.Item>
    )
  }
  if (currentPage < numPages - pageWindow) {
    items.push(<Pagination.Ellipsis key={"late"} />)
  }
  items.push(
    <Pagination.Next
      disabled={currentPage === numPages}
      onClick={onClickFor(Math.min(numPages, currentPage + 1))}
    />
  )
  items.push(
    <Pagination.Last
      disabled={currentPage === numPages}
      onClick={onClickFor(numPages)}
    />
  )
  return <Pagination>{items}</Pagination>
}

const BlogList = ({
  data: {
    allMarkdownRemark: { edges },
  },
  pageContext: { numPages, currentPage },
}) => (
  <Layout>
    <SEO title={currentPage === 1 ? "Home" : `Page ${currentPage}`} />
    <Container>
      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (<Row key={node.fields.slug}><Col><Link to={node.frontmatter.path}>{title}</Link></Col></Row>)
      })}
      {(numPages > 1) && (
      <Row className="justify-content-md-center">
        <Col md="auto">{paginationFor("", numPages, currentPage)}</Col>
      </Row>
      )}
    </Container>
  </Layout>
)

export default BlogList

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`
