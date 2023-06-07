import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
  const navigate = useNavigate();
  
  return (
    <Person sx={{ fontSize: "25px" }} onClick={() => navigate("/profile")} />
  )
}

export default ProfileButton