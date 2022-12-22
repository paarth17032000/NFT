import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NFTCard from '../components/NFTCard'
import { fetchNFTs } from '../utils/fetchNFTs'

export default function Explore() {
  const [val, setVal] = useState()
  const [NFTs, setNFTs] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchNFTs(val,null,setNFTs).then(result => console.log(result)).catch(err => console.log(err))
  }
  
  return (
    <>
       <Navbar />
       <div className='min-h-[calc(100vh-77px)]'>
          <section className='flex flex-col flex-wrap items-center justify-center py-10'>
              <div className=''>
                <div>Enter your address to see your nfts:</div>
                <input className='px-4 py-2 border' onChange={(e) => setVal(e.target.value)} placeholder="address" />
                <div 
                  onClick={handleSubmit}
                  className='bg-black px-6 py-2 text-white rounded-[8px] mt-2 text-center cursor-pointer'>
                  See NFTs
                </div>
              </div>

              <section className='flex flex-wrap justify-center my-10'>
                  {NFTs ? NFTs.map(NFT => {
                        return (
                            <NFTCard image={NFT.value.image} title={NFT.value.title} description={NFT.value.description} />
                        )
                    }) : <div>No NFTs found</div>}
              </section>
          </section>
        </div>
    </>
  )
}
