import { NFT } from './NFT.js';

export class PackNFT extends NFT {

	static contract; // Used to store web3 contract
	static cache = {};
	static baseUri = 'https://nft.moowars.com/pack/';

	constructor(tokenId) {
		super(tokenId);
	}

	image() {
		return PackNFT.baseUri + this.id + '.png';
	}

	static get(tokenId) {
		if(!PackNFT.cache[tokenId]) {
			let token = new PackNFT(tokenId);
			PackNFT.cache[tokenId] = token;
			return token;
		}
		else {
			return PackNFT.cache[tokenId].copy();
		}
	}

}
