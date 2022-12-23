import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NFTCard from '../components/NFTCard'
import { WalletContext } from '../context/walletContext'
import { fetchNFTs } from '../utils/fetchNFTs'

export default function Home() {
  const wallet = useContext(WalletContext)
  const {currentAccount} = wallet
  const [NFTs, setNFTs] = useState(null)
  const [loading, setLoading] = useState()

  useEffect(() => {
    (async () => {
      setLoading(true)
      fetchNFTs(currentAccount,null, setNFTs)
      setLoading(false)
    })()
  }, [])
  return (
    <>
        <Navbar />
        {!currentAccount ? (
          <div className='flex items-center justify-center text-[64px] text-white bg-purple-500 min-h-[calc(100vh-77px)] pb-[77px]'>
            Connect Wallet !
          </div>
        ) : (
          <div className='min-h-[calc(100vh-77px)] flex flex-col my-4 py-2 px-10'>
            {loading ? (
              <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            ) : (
              <div>
                {NFTs ? (
                  <>
                    <div className='text-[24px] md:text-[48px] text-center'>Your NFT Collection !</div>
                    <div className='grid justify-center w-full my-5 grid-cols-templateCustom'>
                      {NFTs.map(NFT => {
                        const {image, title,id, collectionName, description, transaction} = NFT.value
                        return (
                          <NFTCard 
                            key={id}
                            title={title} 
                            image={image} 
                            description={description} 
                            collectionName={collectionName}
                            transaction={transaction}
                          />
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <div className="flex w-full bg-gray-200 mt-5 rounded-[8px] justify-center items-center py-3 px-4 whitespace-nowrap">
                      <div className="text-[14px] text-[#1C1C1E] opacity-70 font-bold ml-2">
                        No NFTs found! You may try explore!                   
                      </div>
                    </div>
                )}
              </div>
            )}
          </div>
        )}
        
    </>
  )
}
