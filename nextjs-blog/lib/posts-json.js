import fs from 'fs'; // Node.js filesystem module for reading files
import path from 'path'; // Node.js path module for handling file paths

const dataDir = path.join(process.cwd(), 'data'); // Absolute path to the project's `data` directory

export function getSortedPostsData() { // Exported function to return sorted post data
    const filePath = path.join(dataDir, 'posts.json'); // Path to the posts JSON file
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Read file contents synchronously as UTF-8
    const jsonObj = JSON.parse(jsonString); // Parse the JSON string into an array/object

    
    jsonObj.sort(function (a, b) { // Sort in-place using a comparator
        return a.title.localeCompare(b.title); // Compare titles with locale-aware comparison
    });

    
    return jsonObj.map(item => { // Transform each raw post into a normalized object
        return { // Return the normalized post object
          id: item.id.toString(), // Ensure id is a string
          title: item.title, // Post title
          date: item.date, // Post date
          author: item.author, // Post author
          contentHtml: item.contentHtml // HTML content of the post
        } // End returned object
      }); // End map and return the resulting array
} // End getSortedPostsData

export function getAllPostIds() { // Exported function to return post ids for Next.js paths
    const filePath = path.join(dataDir, 'posts.json'); // Path to the posts JSON file
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Read file contents synchronously
    const jsonObj = JSON.parse(jsonString); // Parse JSON into array/object

    
    console.log(jsonObj); // Log the parsed posts (development-only)

    return jsonObj.map(item => { // Map posts into the shape required by getStaticPaths
        return { // Return the params wrapper for each post id
          params: { // params object expected by Next.js
            id: item.id.toString() // Ensure id is a string for route params
          } // End params
        } // End returned object
      }); // End map and return array
} // End getAllPostIds


export function getPostData(id) { // Exported function to get a single post by id
    const filePath = path.join(dataDir, 'posts.json'); // Path to the posts JSON file
    const jsonString = fs.readFileSync(filePath, 'utf8'); // Read file contents synchronously
    const jsonObj = JSON.parse(jsonString); // Parse JSON into array/object
    
    const objReturned = jsonObj.filter(obj => obj.id.toString() === id); // Find posts with matching id
      if (objReturned.length === 0) { // If no match found
        return { // Return a placeholder "Not found" object
          id: id, // Echo the requested id
          title: 'Not found', // Placeholder title
          date: '', // Empty date
          contentHtml: 'Not found', // Placeholder content
          author:'' // Empty author
        } // End placeholder object
      } else { // If at least one match found
        
        return objReturned[0]; // Return the first matching post object
      } // End if/else
} // End getPostData