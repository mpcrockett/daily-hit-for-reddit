const _ = require('lodash');

const compileAllPosts = (response) => {
  let combinedPosts = [];
  for(let i=0; i < response.length; i++) {
    for(let j=0; j < response[i].data.data.children.length; j++) {
      const post = response[i].data.data.children[j];
      combinedPosts.push(
        {
        id: post.data.id,
        permalink: post.data.permalink,
        subreddit: post.data.subreddit,
        subreddit_id: post.data.subreddit_id,
        gallery_data: post.data.gallery_data || null,
        preview: post.data.preview || null,
        media_metadata: post.data.media_metadata || null,
        title: post.data.title,
        author: post.data.author,
        flair : post.data.flair_text,
        thumbnail: post.data.thumbnail,
        selftext: post.data.selftext,
        fullname: post.data.name,
        url: post.data.url,
        created: post.data.created,
      }
      )
    }
  };
  const shuffledArray = _.shuffle(combinedPosts);
  return shuffledArray.length > 50 ? shuffledArray.slice(0, 50) : shuffledArray;
};

const compileSubPosts = (response) => {
  return response.map((post) => { 
    return {
      id: post.data.id,
      permalink: post.data.permalink,
      subreddit: post.data.subreddit,
      subreddit_id: post.data.subreddit_id,
      gallery_data: post.data.gallery_data || null,
      preview: post.data.preview || null,
      media_metadata: post.data.media_metadata || null,
      title: post.data.title,
      author: post.data.author,
      flair : post.data.flair_text,
      thumbnail: post.data.thumbnail,
      selftext: post.data.selftext,
      fullname: post.data.name,
      url: post.data.url,
      created: post.data.created,
      upvoted: false,
      downvoted: false
    }
  })
};

module.exports = { compileAllPosts, compileSubPosts };