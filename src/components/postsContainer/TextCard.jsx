import { Box, Card, CardHeader, CardContent, CardActions, Avatar, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'


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
      <CardContent sx={{display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column"}}>
        <Typography variant='h4' sx={{ marginBottom: '10px'}}>{post.title}</Typography>
        <Typography variant='body1' sx={{ height: '265px', overflow: "scroll"}}>{post.selftext}</Typography>
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

export default TextCard