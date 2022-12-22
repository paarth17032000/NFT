import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { WalletContext } from '../context/walletContext'

export default function Navbar() {
  const wallet = useContext(WalletContext)
  const {onLoginHandler, currentAccount} = wallet
  return (
    <div className='h-[77px] bg-purple-500 flex items-center justify-between px-40 gap-8'>
        <Link to='/' className='text-white font-bold text-[24px]'>NFT Palace</Link>
        <div className='flex gap-4'>
          <Link to='/explore' className='bg-black/50 px-8 py-2 rounded-[8px] text-white cursor-pointer hover:bg-black/70'>Explore</Link>
          <div
          onClick={onLoginHandler()}
          className='bg-black/50 px-8 py-2 rounded-[8px] text-white cursor-pointer hover:bg-black/70'>
              {currentAccount ?  'Connected' : 'Connect'}
          </div>
        </div>
    </div>
  )
}
