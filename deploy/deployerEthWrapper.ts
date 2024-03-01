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
  const factory = await deploy("SkaleS2SERC20Wrapper", {
    from: deployer,
    log: true,
    args: [
      "Europa Wrapped ETHC",
      "wETHC",
      "0xD2Aaa00700000000000000000000000000000000"
    ]
  });

  await hre.run("verify:verify", {
    address: factory.address,
    contract: "contracts/Wrapper.sol:SkaleS2SERC20Wrapper",
    constructorArguments: [
      "Europa Wrapped ETHC",
      "wETHC",
      "0xD2Aaa00700000000000000000000000000000000"
    ]
  });
};

deployFunction.tags = ["wrapper"]; // Set the tag for the deployment

export default deployFunction;
