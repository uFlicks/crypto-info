import { Container, 
    Typography ,
    createTheme, 
    ThemeProvider, 
    TextField, 
    TableContainer, 
    LinearProgress, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell,
    TableBody,
    Pagination} from '@mui/material'
import axios from 'axios'
import React ,{useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../api'
import { CryptoState } from '../CryptoContext'


const CoinTable = () => {
    const navigate = useNavigate();

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    const {currency,symbol} = CryptoState();


    const fetchCoins = async () =>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setCoins(data)
        setLoading(false);
    }
    useEffect(()=>{
        fetchCoins()
    },[currency])
    

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
                color:"white"
            },
            type:"dark",
        }
    })
    
    const handelSearch = () =>{
        return coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
        ))
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style = {{textAlign:"center"}}>
            <Typography variant="h4"
            style={{margin:18,color:"white"}}
            >
                Cryptocurrency Prices
            </Typography>
            <TextField
              variant="outlined"
              label="Search for a Crypto Currency"
              style={{color:"gold",marginBottom:"10px",width:"100%"}}
              onChange={e => setSearch(e.target.value)}
            />
            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor:"#f46036"}}/>
                    ): (
                        <Table>
                            <TableHead style = {{backgroundColor:"#f46036"}}>
                              <TableRow>
                                <TableCell>Coins</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">24h Change</TableCell>
                                <TableCell align="right">Market Cap</TableCell>
                              </TableRow>  
                            </TableHead>
                            <TableBody>
                                {
                                    handelSearch()
                                    .slice((page-1)*10,(page-1)*10+10)
                                    .map((row)=>{
                                        const profit = row.price_change_percentage_24h>0;
                                        return(
                                            <TableRow key={row.name} onClick={()=> navigate(`/coins/${row.id}`)}>
                                                <TableCell component='th' scope='row' style={{display:"flex",gap:15}}>
                                                 <img 
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height= "50"
                                                    style={{marginButtom:10}}
                                                 />
                                                 <div style={{display:"flex",flexDirection:"column"}} >
                                                     <span style={{textTransform:"uppercase",fontSize:22,color:"white"}}> {row.symbol} </span>
                                                     <span style={{color:"darkgrey"}} > {row.name} </span>
                                                 </div>

                                                </TableCell>
                                                <TableCell align='right' style={{color:"white"}}>
                                                    {symbol}{" "}
                                                    {row.current_price}
                                                </TableCell>
                                                <TableCell align="right" style={{color:profit>0 ? "rgb(14,203,129)" : "red"}}>
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h}%
                                                </TableCell>
                                                <TableCell align="right" style={{color:"white"}}>
                                                    {symbol}{" "}
                                                    {row.market_cap.toString().slice(0,-6)}M
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination
            style={{padding:20,
                width:"100%",
                display:"flex",
                justifyContent:"center",
                }}
            className="pagination"
            count = {(handelSearch()?.length/10).toFixed(0)}
            onChange={(_,value)=>{
                setPage(value);
                window.scroll(0,200)
            }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinTable