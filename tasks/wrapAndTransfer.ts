task("wrap-and-transfer", "Deploy a Europa Token and Map")
	.addParam("address", "Token Address")
	.addParam("to", "Chain")
	.addParam("amount", "Amount of Tokens")
	.setAction(async(taskArgs: any, hre) => {
	
		const to = taskArgs.to as string;
		const amount = Number(taskArgs.amount as string);
		const address = taskArgs.address as string;

		if (amount < 0) throw new Error("Amount must be greater than 0");
		if (!hre.ethers.isAddress(address)) throw new Error("Invalid Token Address");

		const [ signer ] = await hre.ethers.getSigners();

	    const { ethers, deployments } = hre;

	    const { abi, address } = await deployments.get("TokenFactory");

	    const contract = new ethers.Contract(address, abi, signer);

	    const res = await contract.deployDappToken(
	    	name,
	    	symbol,
	    	decimals,
	    	"juicy-low-small-testnet",
	    	tokenAddress,
	    	{
	    		gasLimit: 100_000_000
	    	}
	    );

	   	await res.wait();
    	const lastestAddress = await contract.latestToken();
    	console.log("deployDappToken token address:", address)
    	console.log("deployDappToken result:", res);
    });