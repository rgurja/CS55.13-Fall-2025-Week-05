import fs from 'fs';
import path from 'path';

// Directory where the JSON data file is stored. Uses the current
// working directory (project root) and the `data` folder.
const dataDir = path.join(process.cwd(), 'data');

/**
 * Read `data/posts.json`, sort posts by title, and return an array
 * of simplified post objects suitable for listing pages.
 *
 * Returns: Array of objects with keys: `id` (string), `title`, `date`,
 * `author`, `contentHtml`.
 *
 * Note: This function performs synchronous file I/O which is acceptable
 * for simple static-site generation but should be changed to async I/O
 * in a production server environment.
 */
export function getSortedPostsData() {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);

    // Sort posts alphabetically by title using localeCompare for
    // proper string comparison (handles different character sets).
    jsonObj.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });

    // Map to a normalized shape. Ensure `id` is a string because Next.js
    // params are typically strings.
    return jsonObj.map(item => {
        return {
          id: item.id.toString(),
          title: item.title,
          date: item.date,
          author: item.author,
          contentHtml: item.contentHtml
        }
      });
}

/**
 * Return an array of objects with the shape required by Next.js
 * `getStaticPaths` — i.e. [{ params: { id: '...' } }, ...].
 *
 * This reads `data/posts.json` and returns the `id` values as strings.
 */
export function getAllPostIds() {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);

    // The console.log can be helpful during development but will print all
    // posts on every call; remove or guard it in production if noisy.
    console.log(jsonObj);

    return jsonObj.map(item => {
        return {
          params: {
            id: item.id.toString()
          }
        }
      });
}

/**
 * Find a single post by `id` (string or number). If no matching post
 * is found, return a simple "Not found" placeholder object.
 *
 * Input: `id` should be the string form used in route params.
 * Returns: the matching post object from `posts.json` (unmodified),
 * or a placeholder object when not found.
 */
export function getPostData(id) {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);

    // Filter for the matching id. Convert stored ids to string to match
    // route param types.
    const objReturned = jsonObj.filter(obj => obj.id.toString() === id);
      if (objReturned.length === 0) {
        return {
          id: id,
          title: 'Not found',
          date: '',
          contentHtml: 'Not found',
          author:''
        }
      } else {
        
        return objReturned[0];
      }
}