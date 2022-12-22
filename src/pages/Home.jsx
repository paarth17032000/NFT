import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NFTCard from '../components/NFTCard'
import { WalletContext } from '../context/walletContext'
import { fetchNFTs } from '../utils/fetchNFTs'

export default function Home() {
  const wallet = useContext(WalletContext)
  const {currentAccount} = wallet
  const [NFTs, setNFTs] = useState(null)

  useEffect(() => {
    fetchNFTs(currentAccount,null,setNFTs).then(result => console.log(result)).catch(err => console.log(err))
  }, [setNFTs])

  return (
    <>
        <Navbar />
        {!currentAccount ? (
          <div className='flex items-center justify-center text-[64px] text-white bg-purple-500 min-h-[calc(100vh-77px)] pb-[77px]'>
            Connect Wallet !
          </div>
        ) : (
          <div className='min-h-[calc(100vh-77px)]'>
            <section className='flex flex-wrap justify-center'>
              {NFTs ? NFTs.map(NFT => {
                    return (
                        <NFTCard image={NFT.value.image} title={NFT.value.title} description={NFT.value.description} />
                    )
                }) : <div className='my-10'>No NFTs found! You may try explore!</div>}
            </section>
          </div>
        )}
        
    </>
  )
}
