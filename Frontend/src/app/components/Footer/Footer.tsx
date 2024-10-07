import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useTheme } from 'next-themes';

function Copyright() {
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <Typography
            variant="body2"
            align="center"
            sx={{
                color: currentTheme === 'dark' ? 'white' : 'black',
            }}
        >
            {'© '}
            <Link color="inherit" href="https://yourwebsite.com/">
                Cost of Living in Brazil
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: currentTheme === 'dark' ? '#0f172a' : '#e2e8f0',
                color: currentTheme === 'dark' ? 'white' : 'black',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: currentTheme === 'dark' ? 'white' : 'black' }}>
                            About
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            The Brazil Cost of Living Dashboard offers a comprehensive view into the costs of essential items in different Brazilian
                            cities.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Useful Links
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>
                                <Link href="#" variant="body2">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body2">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body2">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Follow us
                        </Typography>
                        <Box>
                            <IconButton href="https://github.com/your-profile" color="inherit">
                                <GitHubIcon />
                            </IconButton>
                            <IconButton href="https://linkedin.com/in/your-profile" color="inherit">
                                <LinkedInIcon />
                            </IconButton>
                            <IconButton href="https://twitter.com/your-profile" color="inherit">
                                <TwitterIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Copyright />
                </Box>
            </Container>
        </Box>
    );
}