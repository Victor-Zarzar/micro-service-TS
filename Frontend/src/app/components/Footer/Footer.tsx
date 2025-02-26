import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

function Copyright() {
    const theme = useTheme();
    const t = useTranslations('Footer');

    return (
        <Typography
            variant="body2"
            align="center"
            sx={{
                color: theme.palette.text.primary,
            }}
        >
            {'© '}
            <Link color="inherit" href="https://yourwebsite.com/">
                {t('title')}
            </Link>{' '}
            , ,{new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const theme = useTheme();
    const t = useTranslations('Footer');

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                color: theme.palette.text.primary,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            {t('about')}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
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
