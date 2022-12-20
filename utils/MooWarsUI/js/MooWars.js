import { EventEmitter } from './EventEmitter.js';
import { MooNFT } from './MooNft.js';
import { PackNFT } from './PackNFT.js';
import { NftCollection } from './NftCollection.js';
// import { ArenaCollection } from './ArenaCollection.js';
// import { Battle } from './Battle.js';
// import { BattleCollection } from './BattleCollection.js';

export class MooWars extends EventEmitter {

	constructor(config) {
		super();

		this.connected = false;
		this.account = null;
		this.mooCollection = new NftCollection(MooNFT);
		this.packCollection = new NftCollection(PackNFT);
		this.pendingTxs = [];
		this.pendingChainlinkRequests = {};
		this.chain = config.chain;
		// this.arenaCollection = new ArenaCollection();
		// this.battleCollection = new BattleCollection();

		this.heardPower = null;

		// Handle changes to heard power
		this.mooCollection.on('update', (collection) => {
			let heardPower = collection.reduce((sum, moo) => sum + moo.powerLevel, 0);
			if(heardPower !== this.heardPower) {
				this.heardPower = heardPower;
				this.emit('heardPower', heardPower);
			}
		});

		this.start(config);
	}

	start(config) {
		const web3Config = {
			reconnect: {
				auto: true,
				delay: 5000,
				maxAttempts: 60,
				onTimeout: false,
			}
		};
		const provider = new config.Web3.providers.WebsocketProvider(config.web3Path, web3Config);
		this.web3 = new config.Web3(provider);

		MooNFT.contract = new this.web3.eth.Contract(config.contracts.nft.abi, config.contracts.nft.address);
		PackNFT.contract = new this.web3.eth.Contract(config.contracts.pack.abi, config.contracts.pack.address);

		this.loadWallet();
		this.monitorChainlink(config.contracts.chainlink);

		this.checkActive();
		setInterval(this.checkActive.bind(this), 2000);

		// subscribe to blockheaders to check for balance change
		this.web3.eth.subscribe('newBlockHeaders')
		.on("data", (blockHeader) => {
			if (this.account) {
				this.web3.eth.getBalance(this.account).then(balance => {
					this.emit('balance', balance);
				});
			}
			this.checkPending();
		});

		// this.on('connected', this.onConnect);
		// this.on('disconnected', this.onDisconnect);
		// this.on('account', this.onAccount);
	}

	// listen for metamask events
	loadWallet() {
		if (!window.ethereum) return;

		window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
			if (accounts.length === 0) return;
			this.changeAccount(accounts[0]);
		});

		window.ethereum.on('accountsChanged', function (accounts) {
			// console.log('ethereum accountsChanged', accounts);
			if (accounts.length === 0) {
				return this.changeAccount(null);
			}
		  	this.changeAccount(accounts[0]);
		}.bind(this));

		// window.ethereum.on('connect', function (connectInfo, error) {
		// 	console.error('ethereum connect', connectInfo, error);
		// });

		// window.ethereum.on('disconnect', function (error) {
		// 	console.error('ethereum disconnect', error);
		// });

		// window.ethereum.on('chainChanged', function (chainId) {
		// 	console.log('etherem chainChanged', chainId);
		// });
	}

	// attempt to connect to metamask
	async connectWallet() {
		if (!window.ethereum) throw new Error('MetaMask extension not detected');

		if (this.account === null) {
			const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
			const account = this.web3.utils.toChecksumAddress(accounts[0]);
			this.changeAccount(account);
		} else {
			this.changeAccount(null);
		}
	}

	// check the provider connection state
	checkActive() {
		if (this.web3.currentProvider.connected != this.connected) {
			this.connected = this.web3.currentProvider.connected;
			if (this.connected) {
				this.emit('connected');
			} else {
				this.emit('disconnected');
			}
		}
	}

	// change connect wallet address
	changeAccount(account) {
		if (account !== null) {
			try {
				account = this.web3.utils.toChecksumAddress(account);
			} catch (e) {
				console.error('Invalid account', account);
				account = null;
			}
		}
		if (this.account === account) return;
		this.account = account;
		this.emit('account', account);
		this.mooCollection.setAccount(this.account);
		this.packCollection.setAccount(this.account);
		this.pendingTxs = [];

		if (account !== null) {
			this.web3.eth.getBalance(this.account).then(balance => {
				this.emit('balance', balance);
			});
		}
	}

	// buyPack submits a tx to buy *count* nft packs
	// returns a promise which resolves when the user confirms the metamask transaction
	// confirming the MetaMask transaction does not mean the transaction is complete,
	// it only means it was sent to network
	// when the first promise fulfills, a second promise, txComplete, is provided which will
	// fulfill when the transaction is recorded in a block
	// example:
	// let {txHash, txComplete} = await moowars.buyPack(1);
	// console.log('waiting for tx', txHash);
	// let receipt = await txComplete;
	// counsole.log('bought 1 pack');
	async buyPack(count) {
		await this.switchNetwork();

		// Estimate the gas for this transaction, also verifies the validity of the transaction
		const gas = await PackNFT.contract.methods.buy(count).estimateGas({from:this.account});

		const txHash = await this.sendTxToMetaMask({
			to: PackNFT.contract._address,
			data: PackNFT.contract.methods.buy(count).encodeABI()
		});

		return {txHash, txComplete: this.waitForTx(txHash)};
	}

	// openPack submits a tx to open pack *tokenId*
	// returns a promise which resolves when the user confirms the MetaMask transaction
	// confirming the MetaMask transaction does not mean the transaction is complete,
	// it only means it was sent to network
	// when the first promise fulfills, a second promise, txComplete, is provided which will
	// fulfill when the transaction is recorded in a block
	// example:
	// let {txHash, txComplete} = await moowars.openPack(123);
	// console.log('waiting for tx', txHash);
	// let receipt = await txComplete;
	// let nfts = await moowars.waitForChainlink(receipt);
	// console.log('pack contained', nfts);
	async openPack(tokenId) {
		await this.switchNetwork();

		const gas = await PackNFT.contract.methods.open(tokenId).estimateGas({from:this.account});

		const txHash = await this.sendTxToMetaMask({
			to: PackNFT.contract._address,
			data: PackNFT.contract.methods.open(tokenId).encodeABI()
		});

		return {txHash, txComplete: this.waitForTx(txHash)};
	}

	async sendTxToMetaMask(txParams) {
		if (this.account === null) throw new Error('Wallet not connected');
		txParams.from = this.account;
		return await window.ethereum.request({
		  method: 'eth_sendTransaction',
		  params: [txParams]
		});
	}

	// create a promise for a tx hash that resolves with its receipt once it is confirmed
	waitForTx(txHash) {
		return new Promise((resolve, reject) => {
			this.pendingTxs.push({txHash, resolve, reject});
		});
	}

	// check all pending txs to see if they have completed
	// resolve the promise once completed
	async checkPending() {
		let i = this.pendingTxs.length;
		while (i--) {
			const receipt = await this.web3.eth.getTransactionReceipt(this.pendingTxs[i].txHash);
			if (receipt) {
				if (receipt.status) {
					this.pendingTxs[i].resolve(receipt);
				} else {
					this.pendingTxs[i].reject("Transaction reverted");
				}
				this.pendingTxs.splice(i, 1);
			}
		}
	}

	// will wait for chainlink to fulfill the requestid contained in the receipt provided
	// return an array of nfts transfered to the user in that event receipt
	async waitForChainlink(receipt) {
		const requestId = this.getChainlinkRequestId(receipt);

		// event will resolve to the chainlink tx that fulfilled the request
		let event = await new Promise((resolve, reject) => {
			this.pendingChainlinkRequests[requestId] = {resolve, reject};
		});

		receipt = await this.web3.eth.getTransactionReceipt(event.transactionHash);
		// get mooNFTs in receipt
		const logs = receipt.logs.filter(log => log.topics[0] == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef');
		const moos = logs.map(log => MooNFT.get(BigInt(log.topics[3]).toString()));
		return moos;
	}

	// extract a chainlink requestid from the event logs of a tx receipt
	getChainlinkRequestId(receipt) {
		for (const log of receipt.logs) {
			if (log.topics[0] == '0x63373d1c4696214b898952999c9aaec57dac1ee2723cec59bea6888f489a9772') {
				let event = MooNFT.contract._decodeEventABI.call({
					signature: '0x63373d1c4696214b898952999c9aaec57dac1ee2723cec59bea6888f489a9772',
		            name: 'RandomWordsRequested',
		            type: 'event',
		            inputs: [
						{"name":"keyHash","type":"bytes32","indexed":true},
						{"name":"requestId","type":"uint256","indexed":false},
						{"name":"preSeed","type":"uint256","indexed":false},
						{"name":"subId","type":"uint64","indexed":true},
						{"name":"minimumRequestConfirmations","type":"uint16","indexed":false},
						{"name":"callbackGasLimit","type":"uint32","indexed":false},
						{"name":"numWords","type":"uint32","indexed":false},
						{"name":"sender","type":"address","indexed":true},
		            ]
				}, log);
				return event.returnValues.requestId;
			}
		}
		throw new Error("Chainlink RandomWordsRequested event not found in receipt");
	}
	
	// create an event subscription for all chainlink fulfillments for our subid
	monitorChainlink(config) {
		const contract = new this.web3.eth.Contract(config.abi, config.address);
		contract.events.RandomWordsFulfilled({filter: {subId:config.subId}})
		.on('data', log => {
			if (this.pendingChainlinkRequests[log.returnValues.requestId]) {
				this.pendingChainlinkRequests[log.returnValues.requestId].resolve(log);
				delete this.pendingChainlinkRequests[log.returnValues.requestId];
			}
		})
		.on('changed', () => {})
		.on('error', error => console.error('RandomWordsFulfilled error', error));
		// .on('connected', connected => console.log('RandomWordsFulfilled connected', connected))
	}

	// prevent sending transactions to the wrong chain, by forcing a switch to the correct chain first
	async switchNetwork() {
		if (this.account === null) throw new Error('Wallet not connected');

		try {
		  const chainId = await ethereum.request({ method: 'eth_chainId' });
		  if (chainId == this.chain.chainId) return;

		  await ethereum.request({
		    method: 'wallet_switchEthereumChain',
		    params: [{ chainId: this.chain.chainId }],
		  });
		} catch (switchError) {
		  if (switchError.code === 4001) {
		  	throw new Error('Incorrect network selected, please switch to the ' + this.chain.chainName + ' network');

		  // This error code indicates that the chain has not been added to MetaMask.
		  } else if (switchError.code === 4902) {
		  	try {
		      await ethereum.request({
		        method: 'wallet_addEthereumChain',
		        params: [this.chain],
		      });

		      // we have to check the chain again, because the user still has to approve switching to the new chain
		      const chainId = await ethereum.request({ method: 'eth_chainId' });
		      if (chainId != this.chain.chainId) {
		      	throw new Error('Incorrect network selected, please switch to the ' + this.chain.chainName + ' network');
		      }

		    } catch (addError) {
		    	if (addError.code === 4001) {
		    		throw new Error('Incorrect network selected, please add the ' + this.chain.chainName + ' network');
		    	} else {
		    		throw addError;
		    	}
		    }
		  } else {
			throw switchError;
		  }
		}
	}

	// create a link to the tx on the blockexplorer
	txUrl(txHash) {
		return this.chain.blockExplorerUrls[0] + 'tx/' + txHash;
	}
}
