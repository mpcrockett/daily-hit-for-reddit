import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import TextCard from './TextCard';
import ImageCard from './ImageCard';


export default function PostCard(props) {
  const { subreddits } = useSelector((state) => state.posts);
  const { post } = props;

  const getSubredditIcon = (subId) => {
    const subreddit = subreddits.find((sub) => 't5_' + sub.id === subId);
    return subreddit.iconImg;
  };

  const getDateStamp = (ms) => {
    const date = new Date(ms * 1000);
    return dateFormat(date, "DDDD, mmmm dS, yyyy");
  };

  return (
    <>
    {post.thumbnail === "self" ? 
      <TextCard post={post} timestamp={getDateStamp(post.created)} subredditIcon={getSubredditIcon(post.subreddit_id)}/> : 
      <ImageCard post={post} timestamp={getDateStamp(post.created)} subredditIcon={getSubredditIcon(post.subreddit_id)}/>
    }
    </>
  )};
