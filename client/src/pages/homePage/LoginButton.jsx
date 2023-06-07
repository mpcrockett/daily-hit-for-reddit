import { Box, Button, Card, CardContent, CardActions, Typography } from '@mui/material';

const LoginButton = () => {
  return (
    <>
      <Box sx={{ width: '100%', height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card sx={{ height: 275, width: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} raised={true}>
        <CardContent>
          <Typography variant='h2' sx={{ fontSize: 16, paddingBottom: 2 }} color="text.secondary" gutterBottom>
            Welcome to Daily Hit of Reddit!
          </Typography>
          <Typography variant="body1">
            Your source for the latest posts from <br />
            your favorite subs, and nothing else.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="text" href='/api/auth'>Log in with Reddit to continue</Button>
        </CardActions>
        </Card>
      </Box> 

    
    </>
  
  );
};
 
export default LoginButton;