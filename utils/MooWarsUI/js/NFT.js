import { EventEmitter } from './EventEmitter.js';

export class NFT extends EventEmitter {

	constructor(tokenId) {
		super();
		this.id = tokenId;
		this.owner = null;
		this.refCount = 1;
	}

	image() {
		throw new Error('Implement image() on child class');
	}

	copy() {
		this.refCount++;
		return this;
	}

	free() {
		this.refCount--;
	}

	static get(tokenId) {
		throw new Error('Implement get() on child class');
	}

}
