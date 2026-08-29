import { Routes, Route } from 'react-router-dom'
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import Home from './pages/Home'
import ExcerciseDetail from './pages/ExcerciseDetail'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A0A0A',
      paper: '#161616',
    },
    primary: {
      main: '#FF2625',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ width: '100%', maxWidth: '1440px', mx: 'auto', overflow: 'hidden' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ExcerciseDetail/:id" element={<ExcerciseDetail />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
