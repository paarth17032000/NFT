import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { WalletContext } from '../context/walletContext'
import makeBlockie from 'ethereum-blockies-base64'
import { Menu } from '@headlessui/react'

export default function Navbar() {
  const wallet = useContext(WalletContext)
  const {onLoginHandler, currentAccount} = wallet
  const location  = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if(!currentAccount) {
      navigate('/')
    }
  })
  return (
    <div className='h-[77px] bg-purple-500 flex items-center justify-between lg:px-40 md:px-20 px-10 gap-8'>
        <Link to='/' className='text-white font-bold md:text-[24px] text-[16px] whitespace-nowrap'>NFT Palace</Link>
        <div className='items-center hidden gap-4 md:flex'>
          <Link to='/explore' className='bg-black/50 px-8 py-2 rounded-[8px] text-white cursor-pointer hover:bg-black/70'>Explore</Link>
          <div
          onClick={onLoginHandler()}
          className={`${!currentAccount && 'bg-black/50 px-8 py-2 rounded-[8px] text-white cursor-pointer hover:bg-black/70'}`}>
            {currentAccount ?  
            <Link to='/'><img className="w-8 bg-black rounded-full hover:shadow-lg" src={makeBlockie(currentAccount)} alt="Blockie" /></Link>
              : 'Connect'}
          </div>
        </div>
        <div className='flex items-center justify-center md:hidden'>
          <Menu as="div" className="relative">
            <Menu.Button>
              {currentAccount && <img className="w-8 bg-black rounded-full hover:shadow-lg" src={makeBlockie(currentAccount)} alt="Blockie" />}
            </Menu.Button>
            <Menu.Items className="flex flex-col p-5 gap-3 absolute shadow-xl left-[-7rem] top-10 bg-white w-36 shadow-menu rounded-[16px]">
              <Menu.Item as="div" className="text-[13px] cursor-pointer text-[#6E7191] hover:text-[#14142B]">
                {location.pathname === '/' ? (
                  <Link to='/explore'>Explore</Link>
                ) : (
                  <Link to='/'>Home</Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
    </div>
  )
}
