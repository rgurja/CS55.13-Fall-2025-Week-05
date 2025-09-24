// `Head` lets us modify the HTML document head (title, meta tags)
import Head from 'next/head';
// `Layout` provides consistent page framing (header/footer). `siteTitle` is a shared title constant.
import Layout, { siteTitle } from '../components/layout';
// Shared utility CSS classes for typography and spacing
import utilStyles from '../styles/utils.module.css';
 
// Data helper: reads markdown posts and returns them sorted by date
import { getSortedPostsData } from '../lib/posts-json';
// `Link` for client-side route transitions
import Link from 'next/link';
// Small date formatting component used across the site
import Date from '../components/date'; 

export async function getStaticProps() {
  // Runs at build time. Fetches all posts (from `posts/` markdown files)
  // and passes them as props to the page component for static generation.
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Main content container for the home page */}
   <main className="page-container">
      {/* Intro / author info section */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <div className="info-card"> {/* Div styled as an info card */}
         <p>
           Hello, I'm Rahel. I'm currently learning web development and building
           this site using Next.js. I follow the official tutorial at
           <a href="https://nextjs.org/learn"> Next.js tutorial</a> to learn more.
         </p>
         {/* Brief list of topics the author is exploring */}
         <h4 className="page-title">Some Topics I find here</h4>
        <ul>
            <li>Learning basics of Next.js</li>
            <li>Exploring the Pages Router</li>
            <li>Applying CSS styling</li>
          </ul>
        </div>
        {/* Blog list section: maps `allPostsData` to links and formatted dates */}
         <div className="info-card">
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        </div>
      </section>
    </main>
    </Layout>
   
  );
}