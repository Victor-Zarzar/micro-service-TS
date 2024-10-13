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
import { useTranslations } from 'next-intl';

function Copyright() {
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const t = useTranslations('Footer');

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
                {t('title')}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const { systemTheme, theme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const t = useTranslations('Footer');

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
                            {t('about')}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            {t('p')}
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t('links')}
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>
                                <Link href="#" variant="body2">
                                    {t('privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body2">
                                    {t('terms')}
                                </Link>
                            </li>
                            <li>
                                <Link href="#" variant="body2">
                                    {t('contact')}
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t('follow')}
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