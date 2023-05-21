const { request } = require("express");

const { getCCP } = require("./buildCCP");
const { wallet,Gateway}=require('fabric-network');
const path=require("path");
const walletPath=path.join(__dirname,"wallet");

exports.query=async(request)=>{
    let org=request.org;
    let num=Number(org.match(/\d/g).join(""));
    const ccp = getCCP(num);

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		// const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org${num}.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		// await enrollAdmin(caClient, wallet, mspOrg1);

		// // in a real application this would be done only when a new user was required to be added
		// // and would be part of an administrative flow
		// await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

			await gateway.connect(ccp, {
				wallet,
				identity: request.userId,
				discovery: { enabled: true, asLocalhost: false } // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(request.channelName);

			// Get the contract from the network.
			const contract = network.getContract(request.chaincodeName);

			// Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
			// This type of transaction would only be run once by an application the first time it was started after it
			// deployed the first time. Any updates to the chaincode deployed later would likely not need to run
			// an "init" type function.
			// console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			
            let data=Object.values(request.data);

            let result=await contract.evaluateTransaction(...data);
            return result;
}