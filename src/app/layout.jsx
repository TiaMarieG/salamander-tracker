'use client';

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import '../../styles/global.css';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#388e3c',
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body style={{ margin: 0, height: '100%' }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Flex container for full height layout */}
          <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* Header */}
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Salamander Tracker
                </Typography>
                <Button color="inherit" component={Link} href="/">Home</Button>
                <Button color="inherit" component={Link} href="/videos">Videos</Button>
              </Toolbar>
            </AppBar>

            {/* Main content area that grows */}
            <Box component="main" flexGrow={1} py={4}>
              <Container maxWidth="lg">{children}</Container>
            </Box>

            {/* Footer at the bottom */}
            <AppBar position="static" color="primary" id="footer-bar" sx={{ top: 'auto', bottom: 0 }}>
              <Toolbar>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  © 2025 Salamander Tracker
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
