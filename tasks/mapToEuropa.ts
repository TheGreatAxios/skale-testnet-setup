task("map-to-europa", "Deploy a Europa Token and Map")
	.addParam("name", "Name of ERC-20")
	.addParam("symbol", "Symbol of ERC-20")
	.addParam("decimals", "Decimals of ERC-20")
	.addParam("token", "Mainnet Token Address")
	.setAction(async(taskArgs: any, hre) => {
		
		const name = taskArgs.name as string;
		const symbol = taskArgs.symbol as string;
		const decimals = Number(taskArgs.decimals as string);
		const tokenAddress = taskArgs.token as string;

		if (decimals < 0 || decimals > 18) throw new Error("Decimals must be between 1-18 (inclusive)");
		if (!hre.ethers.isAddress(tokenAddress)) throw new Error("Invalid Token Address");

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