const endpoint = `https://eth-mainnet.g.alchemy.com/v2/Kq69ZXkplZthHINh8ZRbUNTxZO0LCF3B`;

export const getAddressNFTs = async (owner, contractAddress, setNFTs, retryAttempt) => {
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&pageSize=10`).then(data => data.json())
            }
        } catch (e) {
            getAddressNFTs(endpoint, owner, contractAddress, setNFTs, retryAttempt+1)
        }
        return data
    }
}

const getNFTMetadata = async(NFTs) => {
    const NFTsMetadata = await Promise.allSettled(NFTs.map( async (NFT) => {
        const metadata = await fetch(`${endpoint}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`).then(data => data.json())
        let imageUrl;
        if(metadata.media[0].gateway.length)
            imageUrl = metadata.media[0].gateway

        return {
            id: NFT.id.tokenId,
            image: imageUrl,
            title: metadata.metadata.name,
            description: metadata.metadata.description,
            attributes: metadata.metadata.attributes
        }
    }))
    return NFTsMetadata
}

const fetchNFTs = async(owner, contractAddress, setNFTs) => {
    const data = await getAddressNFTs(owner, contractAddress)
    if(data.ownedNfts.length){
        const NFTs = await getNFTMetadata(data.ownedNfts)
        let completeNFTs = NFTs.filter(NFT => NFT.status === 'fulfilled')
        setNFTs(completeNFTs) 
    } else {
        setNFTs(null)
    }
}

export {fetchNFTs}