import { EventEmitter } from './EventEmitter.js';

export class NftCollection extends EventEmitter {

	constructor(nft) {
		super();
		
		this.nft = nft;
		this.account = null;
		this.collection = [];
		this.initialized = false;
		this.subs = {
			transfer: null,
		};
		this.reload();
	}

	setAccount(account) {
		if(this.account === account) return;
		this.account = account;
		this.reload();
	}

	reload() {
		if(this.initialized) {
			this.unload();
		}
		if(!this.account) return;

		// Get current state
		this.nft.contract.methods.tokensOfOwner(this.account).call()
			.then(tokenIds => {
				this.collection = tokenIds.map(tokenId => this.nft.get(tokenId));
				this.emit('load', this.collection);
				this.emit('update', this.collection);
			});

		// subscribe to ownership changes
		this.subs.transfer = this.nft.contract.events.Transfer()
			.on('data', log => this.transferEvent(log))
			.on('changed', log => {
				console.log('changed', log);
				// swap from and to to undo event
				const tmp = log.returnValues._from;
				log.returnValues._from = log.returnValues._to;
				log.returnValues._to = tmp;
				this.transferEvent(log);
			})
			.on('error', error => console.log('error', error))
			.on('connected', connected => console.log('connected', connected));

		this.initialized = true;
	}

	unload() {
		if(this.subs.transfer !== null) {
			this.subs.transfer.unsubscribe((error, success) => {
				// console.log('unsubscribe', error, success);
			});
		}

		this.collection.forEach(token => token.free());
		this.collection = [];
		this.initialized = false;
		this.emit('unload');
		this.emit('update', this.collection);
	}

	transferEvent(log) {
		if(log.returnValues.from == log.returnValues.to) return;

		if(log.returnValues.from == this.account) {
			const index = this.collection.findIndex((element) => element.id == log.returnValues.tokenId);
			if (index === -1) return;
			const token = this.collection[index];
			token.free();
			this.collection.splice(index, 1);
			this.emit('remove', token);
			this.emit('update', this.collection);
		}
		else if(log.returnValues.to == this.account) {
			const token = this.nft.get(log.returnValues.tokenId);
			this.collection.push(token);
			this.emit('add', token);
			this.emit('update', this.collection);
		}
	}

	count() {
		return this.collection.length;
	}
	
}
