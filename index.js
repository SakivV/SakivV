const core = require('@actions/core');
const axios = require('axios');
const fs = require('fs');

async function run() {
  try {
    const feedList = core.getInput('feed_list');
    const response = await axios.get(feedList);
    const blogPosts = response.data; // Parse the RSS feed and extract the blog posts

    // Logic to update README file with the latest blog posts
    const readmeContent = `# Latest Blog Posts\n\n${blogPosts}`;
    fs.writeFileSync('README.md', readmeContent);

    core.setOutput('result', 'README updated successfully');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
