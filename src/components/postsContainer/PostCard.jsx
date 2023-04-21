import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import TextCard from './TextCard';
import ImageCard from './ImageCard';


export default function PostCard(props) {
  const subreddits = useSelector((state) => state.posts.subreddits);
  const { post } = props;

  const getSubredditIcon = (subId) => {
    const subreddit = subreddits.find((sub) => 't5_' + sub.id === subId);
    return subreddit.iconImg;
  };

  const getDateStamp = (ms) => {
    const date = new Date(ms * 1000);
    return dateFormat(date, "DDDD, mmmm dS, yyyy");
  };
  
  const isImagePost = post.preview !== null || post.gallery_data !== null;
  
  return (
    <>
    {isImagePost ? 
      <ImageCard post={post} timestamp={getDateStamp(post.created)} subredditIcon={getSubredditIcon(post.subreddit_id)}/> :
      <TextCard post={post} timestamp={getDateStamp(post.created)} subredditIcon={getSubredditIcon(post.subreddit_id)}/>  
      
    }
    </>
  )};
