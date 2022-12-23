import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NFTCard from '../components/NFTCard'
import { fetchNFTs } from '../utils/fetchNFTs'

export default function Explore() {
  const [val, setVal] = useState()
  const [NFTs, setNFTs] = useState()
  const [loading, setLoading] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await fetchNFTs(val,null,setNFTs).then(result => console.log(result)).catch(err => console.log(err))
    setLoading(false)
  }
  
  return (
    <>
       <Navbar />
       <div className='min-h-[calc(100vh-77px)] flex flex-col items-center my-4 py-2 px-10'>
          <div className='flex flex-col justify-center w-full my-2 sm:w-2/4'>
            <div className='font-bold text-left text-md whitespace-nowrap'>Enter your address to see your nfts:</div>
            <input className='px-4 py-2 border rounded-[8px] mt-1' onChange={(e) => setVal(e.target.value)} placeholder="address" />
            <div 
              onClick={handleSubmit}
              className='bg-black px-6 py-2 text-white rounded-[8px] mt-2 text-center cursor-pointer'>
              See NFTs
            </div>
            <div className="flex w-full bg-gray-200 mt-5 rounded-[8px] justify-center items-center py-3 px-4 whitespace-nowrap">
              <div className="text-[14px] text-[#1C1C1E] opacity-70 font-bold ml-2">
                  Please enter an address to see your nfts.
              </div>
            </div>
          </div>

          { 
            loading ? (
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            ) : (
              <section className='grid justify-center w-full my-5 grid-cols-templateCustom'>
                {NFTs ? NFTs.map(NFT => {
                    const {image, collectionName,title, description, transaction} = NFT.value
                    return (
                      <NFTCard 
                        image={image} 
                        collectionName={collectionName} 
                        title={title} 
                        description={description} 
                        transaction={transaction}
                      />
                    )
                }) : null}
              </section>
            )
          }
        </div>
    </>
  )
}
