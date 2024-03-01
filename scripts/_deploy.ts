import { ethers, run } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployFunction: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(" deployer address:", deployer);

  // Deploy your contracts
  const factory = await deploy("TokenFactory", {
    from: deployer,
    log: true,
    args: [deployer],
    skipIfAlreadyDeployed: false, // Set this to false if you want to deploy regardless
  });

  await hre.run("verify:verify", {
    address: factory.address,
    contract: "contracts/TokenFactory.sol:TokenFactory"
  });
};

deployFunction.tags = ["Europa"]; // Set the tag for the deployment

export default deployFunction;
