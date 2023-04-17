import { Box, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, ArrowForwardIos } from '@mui/icons-material';
import { useState } from 'react';
import _ from 'lodash';


function ImageCard(props) {
  const { post, timestamp, subredditIcon } = props;

  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <Card sx={{ width: 345, height: 500, margin: 2, boxShadow: 2 }}>
      <CardHeader 
        avatar={<Avatar alt={post.subreddit} src={subredditIcon} />}
        title={'Posted by ' + post.author + ' in r/' + post.subreddit}
        subheader={timestamp}
        sx={{ height: '65px'}}
      />
      { !post.gallery_data && (
        <CardMedia
          component="img"
          height="290"
          image={_.unescape(post.preview?.images[0].resolutions[2].url || post.url)}
          alt="Post image"
          onClick={()=> window.open('http://www.reddit.com' + post.permalink)}
        />)
      }
      { post.gallery_data && (
        <Box sx={{ position: "relative"}}>
          <CardMedia
            component="img"
            height="290"
            image={_.unescape(post.media_metadata[post.gallery_data.items[galleryIndex].media_id].p[2].u)}
            alt="Post image"
            onClick={()=> window.open('http://www.reddit.com' + post.permalink)}
          />
        <CardContent sx={{ position: "absolute", bottom: '0px', right: '0px'}} >
          <ArrowForwardIos fontSize='medium' onClick={() => setGalleryIndex((galleryIndex + 1) % post.gallery_data.items.length)} />
        </CardContent>
        </Box>)
      }
      <CardContent sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", height: '90px', overflow: "auto"}}>
        <Typography variant='h5'>{post.title}</Typography>
        <Typography variant='body2'>{post.selftext}</Typography>
      </CardContent>
      <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <CardActions>
            <KeyboardArrowUp fontSize='large' />
            <KeyboardArrowDown fontSize='large' />
          </CardActions>
        <Typography 
          sx={{ fontSize: '10px', textDecoration: 'underline', color: 'blue', padding: "8px" }}
          onClick={()=> window.open('http://www.reddit.com' + post.permalink)}
        >
          View on Reddit
        </Typography>
        </Box>
    </Card>
  )
}

export default ImageCard