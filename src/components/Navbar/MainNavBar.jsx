import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab(props) {
  return (
    <Tab
      sx={{color: 'white'}}
      {...props}
    />
  );
}


// Navbar CSS
const NavBarStyled = styled(Box)({
  backgroundColor: '#202020',
  height: 52,
});


export default function NavBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <NavBarStyled>
      <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile value={value} onChange={handleChange} aria-label="nav tabs">
        <LinkTab component={Link} label="Home" to="/" />
        <LinkTab component={Link} label="Cart" to="/cart" />
        <LinkTab component={Link} label="Account" to="/account" />
      </Tabs>
    </NavBarStyled>
  );
}