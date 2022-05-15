import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../api';
import { CryptoState } from "../CryptoContext";
import "./CoinPage.css"
import ReactHtmlParser from "react-html-parser";

const CoinPage = () => {
  const {id} = useParams()
  const [coin,setCoin] =useState()
  const {currency,symbol} = CryptoState()

  const fetchCoin = async() =>{
   
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data)
  }
  console.log(coin);

  useEffect(()=>{
    fetchCoin()
  },[])

  return (
    <div className='coin-container'>
      
      <div className='logo'>
        <img src={coin?.image.large} alt={coin?.name} />
      </div>
      <div>
        <Typography className='coin-name' variant='h3'>
            {coin?.name}
        </Typography>
      </div>
      <div>
      <Typography className='coin-des' >
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <Typography className='coin-rank' variant="h4">
          Rank: {coin?.market_cap_rank}
        </Typography>
        <Typography className='coin-rank' variant="h4">
          price: {symbol}{coin?.market_data.current_price[currency.toLowerCase()]}
        </Typography>
        <Typography className='coin-rank' variant="h4">
          24H High: {symbol}{coin?.market_data.high_24h[currency.toLowerCase()]}
        </Typography>
        <Typography className='coin-rank' variant="h4">
          24H Low: {symbol}{coin?.market_data.low_24h[currency.toLowerCase()]}
        </Typography>
      </div>
     
    </div>
  )
}

export default CoinPage