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
import DashboardIcon from '@mui/icons-material/Dashboard';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from 'next-themes';

const pages = ['Home', 'Costs', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 1)' : 'rgba(156, 163, 175, 1)',
                color: currentTheme === 'dark' ? 'white' : 'black',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DashboardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Dashboard
                    </Typography>

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
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <DashboardIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#"
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
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {pages.map((page) => (
                           <Button
                           key={page}
                           onClick={handleCloseNavMenu}
                           sx={{
                               my: 2,
                               color: currentTheme === 'dark' ? 'white' : 'black',
                               display: 'block',
                               textAlign: 'center', 
                           }}
                       >
                           {page}
                       </Button>
                   ))}
                        {currentTheme === 'dark' ? (
                            <IconButton onClick={() => setTheme('light')} sx={{ ml: 2 }} color="inherit">
                                <Brightness4Icon />
                            </IconButton>
                        ) : (
                            <IconButton onClick={() => setTheme('dark')} sx={{ ml: 2 }} color="inherit">
                                <DarkModeIcon />
                            </IconButton>
                        )}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip
                            title="Open settings"
                            sx={{
                                backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 1)' : 'rgba(255, 255, 255, 1)',
                                color: currentTheme === 'dark' ? 'white' : 'black',
                            }}
                        >
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Avatar" src="avatar.png" />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{
                                mt: '45px',
                                '& .MuiMenu-paper': {
                                    backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 1)' : 'rgba(255, 255, 255, 1)',
                                    color: currentTheme === 'dark' ? 'white' : 'black',
                                },
                            }}
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
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                    sx={{
                                        backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 1)' : 'rgba(255, 255, 255, 1)',
                                        color: currentTheme === 'dark' ? 'white' : 'black',
                                        '&:hover': {
                                            backgroundColor: currentTheme === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(229, 231, 235, 1)',
                                        },
                                    }}
                                >
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

export default ResponsiveAppBar;