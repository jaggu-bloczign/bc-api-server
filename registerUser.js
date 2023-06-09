const {Wallets}=require("fabric-network");
const FabricCAServices=require('fabric-ca-client');

const { buildCAClient, registerAndEnrollUser, enrollAdmin}=require("./CAUtils")
const { buildCCPOrg1,buildCCPOrg2,buildCCPOrg3,buildWallet}=require("./AppUtils")
const { getCCP } = require("./buildCCP");
const path=require('path');
const walletPath=path.join(__dirname,"wallet")

exports.registerUser=async(orgMSP,userId)=>{

    let org=Number(OrgMSP.match(/\d/g).join(""));
    let ccp=getCCP(org)
    // build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org${org}.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, orgMSP);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, orgMSP, userId, 'org${org }.department1');

        return {
            wallet
        }
}