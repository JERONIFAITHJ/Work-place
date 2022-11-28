import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../Assets/mainLogo2.png'
import Switch from '@mui/material/Switch';
import { NavLink, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../Context/DarkModeContext';

const pages = [{ label: 'Home', path: '/' }, { label: 'Find Jobs', path: 'candidate/auth' }, { label: 'Find Candidates', path: 'employer/auth' }];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const activeClass = { backgroundColor: 'lavender' }

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [mode, setMode] = React.useContext(DarkModeContext);
  console.log(mode);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log('from open user');
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    console.log(e.target.id);
    navigate(e.target.id);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    console.log('close user');
  };

  const handleChildNavMenu = (e) => {
    navigate(e.target.id);
  }

  return (
    <AppBar sx={{ backgroundColor: mode.mode ? 'black' : 'white', boxShadow: 'none', color: 'black', minHeight: '80px' }} position="static">
      <Container sx={{ margin: 'auto' }} maxWidth="xl">
        <Toolbar disableGutters>

          {/* <Typography variant='h1' noWrap sx={{ color: mode.mode ? 'white' : 'black', mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'cursive', textDecoration: 'none', fontSize: '1rem' }}>Jeroni</Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} id={page.path} onClick={handleCloseNavMenu}>
                  <Typography id={page.path} onClick={handleChildNavMenu} textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box><Typography
            variant="p"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt='Company logo' />
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt='Company Logo' />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                id={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: mode.mode ? 'white' : 'black', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', }}>
            <Tooltip title="Open settings"> 
              <Switch checked={mode.mode} onClick={() => setMode({ type: 'SET_DARKMODE' })} />
            </Tooltip>
            <Button sx={{ display: { xs: 'none', md: 'block' }, border: 'none', color: mode.mode ? 'white' : 'black', '&: hover': {border: 'none'} }} variant='outlined'>Login</Button>
            <Button sx={{ backgroundColor: '#4540DB', display: { xs: 'none', md: 'block' }, border: 'none', color: 'white', '&: hover': {border: 'none'} }} variant='contained'>Register Now</Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;