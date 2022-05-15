import { ThemeProvider } from '@emotion/react';
import { AppBar, 
        Container, 
        createTheme, 
        MenuItem, 
        Select, 
        Toolbar, 
        Typography 
    } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

   

const Header = () => {

    const {currency,setCurrency} = CryptoState()
  
   
    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
          },
    })

  return (
      <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography onClick={()=> navigate('/')} variant="h5" className="title">
                    Crypto Info
                </Typography>
                <Select 
                    varient="outlined"
                    style={{
                        width:100,
                        height:40,
                        marginLeft:15
                    }}
                    value={currency}
                    onChange={e=>setCurrency(e.target.value)}
                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                    
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header