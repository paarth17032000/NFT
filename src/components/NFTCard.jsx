import React from 'react'
import { truncateString } from '../utils/truncateString'

export default function NFTCard({ image, title, transaction, collectionName }) {
    return (
        <section
            className="flex items-center justify-center h-[450px] p-2"
            id="nft-card"
        >
            <section
                className="w-full h-full p-2 rounded-lg bg-stone-700"
                style={{
                boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.5)",
                }}
            >
                <img src={image} alt='nft_image' className='flex w-full h-[60%] rounded-lg h-full bg-white/100' />
                <div className="text-left p-2 h-[15%]" id="nft-card-details">
                    <div className="text-xl font-bold text-white" id="nft-card-name">
                        {title}
                    </div>
                    <div className="text-sm text-white/80" id="nft-card-collection">
                        {collectionName}
                    </div>
                </div>
                {transaction.block_hash ? (
                    <div className="bg-stone-500 text-left rounded-lg p-2 h-[25%]" id="nft-card-details">
                        <div className='text-sm font-bold text-white'>Last trade:</div>
                        <div className="text-sm text-white/80" id="nft-card-collection">
                            From : {truncateString(transaction.from_address)}
                        </div>
                        <div className="text-sm text-white/80" id="nft-card-collection">
                            To : {truncateString(transaction.to_address)}
                        </div>
                        <div className="text-sm text-white/80" id="nft-card-collection">
                            Value : {transaction.value}
                        </div>
                    </div>
                ) : <></>}
            </section>
        </section>
    )
}
