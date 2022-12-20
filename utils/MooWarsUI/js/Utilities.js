function shortenAddress(address) {
	if (address === null) return '';
	return address.substr(0, 6) + '...' + address.substr(-4);
}
