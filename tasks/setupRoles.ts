import { MultisigWallet } from "../utils/multisigwallet";
import { TokenManagerERC20 } from "../utils/tokenManagerERC20";
import { TokenManagerLinker } from "../utils/tokenManagerLinker";
import { Roles } from "../utils/roles";
import { Marionette } from "../utils/marionette";

task("setup-roles", "Connect SKALE Chain")
	.setAction(async(taskArgs: any, hre) => {

		const [ signer ] = await hre.ethers.getSigners();

	    const { ethers, deployments } = hre;

	    const { address: tokenFactoryAddress } = await deployments.get("TokenFactory");

	    try {
			const tokenManagerLinker = new ethers.Contract(TokenManagerLinker.address, Roles.abi, signer);
		    const tokenManagerERC20 = new ethers.Contract(TokenManagerERC20.address, Roles.abi, signer);
		    const marionette = new ethers.Contract(Marionette.address, Marionette.abi, signer);

		    
		    const msg = new ethers.Contract(MultisigWallet.address, MultisigWallet.abi, signer);
			
		    const setupTokenManagerLinker = await msg.submitTransaction(
		    	Marionette.address,
		    	0,
		    	marionette.interface.encodeFunctionData(
		    		"execute",
		    		[
						tokenManagerLinker.target,
				    	0,
				    	tokenManagerLinker.interface.encodeFunctionData(
				    		"grantRole",
				    		[
				    			ethers.id("REGISTRAR_ROLE"),
								tokenFactoryAddress
				    		]
				    	),
		    		]
		    	),
		    	{
		    		gasLimit: 100_000_000
		    	}
		    );
		    
		   	const response1 = await setupTokenManagerLinker.wait();
		   	console.log("Res 1: ", response1);

			const setupTokenManagerERC20 = await msg.submitTransaction(
				Marionette.address,
		    	0,
		    	marionette.interface.encodeFunctionData(
		    		"execute",
		    		[
						tokenManagerERC20.target,
				    	0,
				    	tokenManagerERC20.interface.encodeFunctionData(
				    		"grantRole",
				    		[
				    			ethers.id("TOKEN_REGISTRAR_ROLE"),
								tokenFactoryAddress
				    		]
				    	),
		    		]
		    	),
		    	{
		    		gasLimit: 100_000_000
		    	}
		    );
		    
		   	const response2 = await setupTokenManagerERC20.wait();
	    } catch (err) {
	    	console.error(err);
	    }
    });