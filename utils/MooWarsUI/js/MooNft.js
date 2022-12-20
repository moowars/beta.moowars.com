import Web3 from "web3";
import { NFT } from './NFT.js';

export class MooNFT extends NFT {

	static contract; // Used to store web3 contract
	static cache = {};
	// static baseUri = 'http://localhost/projects/mine/moowarsui/images/nft/';
	static baseUri = 'https://nfts.moowars.com/';

	constructor(tokenId) {
		super(tokenId);

		this.powerLevel = null;
		this.hitPoints = null;
		this.attack = null;

		// For testing
		let hash = BigInt(Web3.utils.soliditySha3(tokenId));
		let mask = BigInt('0xffffffff');
		this.attack = Number((hash & mask) % 100n + 1n);
		hash >>= 32n;
		this.hitPoints = Number((hash & mask) % 100n + 1n);
		this.powerLevel = this.attack + this.hitPoints;
	}

	image() {
		// Always make image ID between 0 and 100
		let imageId = this.id % 100;

		return MooNFT.baseUri + imageId + '.jpg';
	}

	static get(tokenId) {
		if(!MooNFT.cache[tokenId]) {
			let token = new MooNFT(tokenId);
			MooNFT.cache[tokenId] = token;
			return token;
		}
		else {
			return MooNFT.cache[tokenId].copy();
		}
	}

}
