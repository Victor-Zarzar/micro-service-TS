import { Box, Container, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound404() {
    return (
        <Container
            fixed
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                mt: 4,
            }}
        >
            <Typography variant="h1" component="h2" color="primary" fontWeight="bold" gutterBottom>
                404
            </Typography>

            <Typography variant="body1" gutterBottom className="dark:text-white text-lg">
                Not Found.
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animation: 'bounce 1s infinite',
                    '@keyframes bounce': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-10px)' },
                    },
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-compass"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: '#1E88E5' }}
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="8 16 10 10 16 8 14 14 8 16" />
                    <circle cx="12" cy="12" r="9" />
                </svg>
            </Box>

            <Typography variant="body1" className="dark:text-white text-lg" sx={{ mt: 4 }}>
                Back to page{' '}
                <MuiLink component={Link} href="/" color="primary" underline="hover">
                    Home
                </MuiLink>
            </Typography>
        </Container>
    );
}
