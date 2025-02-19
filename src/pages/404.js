import React from 'react'

import BG from '../components/bg'
import SEO from '../components/seo'
import Layout from '../layouts'

const NotFoundPage = props => (
  <Layout path={props.location.pathname}>
    <BG />
    <SEO title="404: Not found" path={props.location.pathname} />
    <div style={{ maxWidth: 1440, padding: 32, margin: 'auto' }}>
      <h1>Missing information.</h1>
      <p>The page you were looking for could not be found. It might have been removed, renamed, or dit not exist.</p>
    </div>
  </Layout>
)

export default NotFoundPage
