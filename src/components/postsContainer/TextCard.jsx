import { Box, Button, Card, CardHeader, CardContent, Avatar, Typography } from '@mui/material';
import VoteButtons from './VoteButtons';


function TextCard(props) {
  const { post, timestamp, subredditIcon } = props;

  return (
    <Card sx={{ width: 345, height: 500, margin: 2, boxShadow: 2 }}>
      <CardHeader 
        avatar={<Avatar alt={post.subreddit} src={subredditIcon} />}
        title={'Posted by ' + post.author + ' in r/' + post.subreddit}
        subheader={timestamp}
        sx={{ height: '65px'}}
      />
      <CardContent sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", height: '380px'}}>
        <Typography variant='h4' sx={{ marginBottom: '10px'}}>{post.title}</Typography>
        <Typography variant='body1' sx={{ height: '265px', overflow: "scroll", maxWidth: '100%'}}>{post.selftext}</Typography>
      </CardContent>
      <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
        <VoteButtons fullname={post.fullname} />
        <Button size='small' color='primary' sx={{ margin: '4px'}} onClick={()=> window.open('http://www.reddit.com' + post.permalink)}>View on Reddit</Button>
      </Box>
    </Card>
  )
}

export default TextCard