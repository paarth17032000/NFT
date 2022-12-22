import React from 'react'

export default function NFTCard({ image,  title }) {
    return (
        <div className="w-1/4 mt-10 mb-4 mr-3 rounded-md bg-green-900 rounded-[10px] text-white" >
           <div> <img className='w-full rounded-[10px]' src={image}></img></div>
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl">{title}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
