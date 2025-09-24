// Layout component provides the page wrapper (header/footer and layout styles)
import Layout from '../../components/layout';
// Helper functions to read post data and generate post paths from the `posts` folder
import { getAllPostIds, getPostData } from '../../lib/posts-json';
// `Head` allows modifying the document head (title, meta tags) for this page
import Head from 'next/head';
// Small component that formats dates consistently across the site
import Date from '../../components/date';
// Shared utility CSS classes used for typography and spacing
import utilStyles from '../../styles/utils.module.css';

// Page component for a single blog post. Receives `postData` as props
// which includes `title`, `date`, and pre-rendered `contentHtml`.
export default function Post({ postData }) {
  return (
    <Layout>
      {/* Set the HTML document title for this post */}
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        {/* Post title */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>

        {/* Post date formatted by the `Date` component */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>

        {/*
          Render HTML content produced by a Markdown -> HTML converter.
          `dangerouslySetInnerHTML` is required to insert raw HTML into React.
          Make sure `contentHtml` is sanitized or generated from trusted source.
        */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

 
export async function getStaticPaths() {
  // `getAllPostIds` returns an array of path params for all posts,
  // e.g. [{ params: { id: 'first-post' } }, ...]
  const paths = getAllPostIds();
  return {
    // Pre-render these paths at build time
    paths,
    // Any paths not returned by `getAllPostIds` will result in 404
    fallback: false,
  };
}

 
export async function getStaticProps({ params }) {
  // Fetch the post content for the given `id` param at build time.
  // `getPostData` typically reads the markdown file and converts it to HTML.
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}