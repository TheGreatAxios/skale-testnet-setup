import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";

import "./tasks/deployEuropaToken";
import "./tasks/mapToEuropa";
import "./tasks/setupRoles";

dotenv.config();

const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY;// ADMIN_KEY_TESTNET or ADMIN_KEY
if (!PRIVATE_KEY) {
  throw new Error("Private Key Not Set in .env");
}

function getTestnetEndpoint(chainName: string) : string {
  return "https://testnet.skalenodes.com/v1/" + chainName + "-testnet";
}

function getTestnetBlockExplorerEndpoint(chainName: string, api: boolean = false): string {
  const url = `https://${chainName}-testnet.explorer.testnet.skalenodes.com`;

  return api ? url + "/api" : url;
}

function getMainnetEndpoint(chainName: string) : string {
  return "https://mainnet.skalenodes.com/v1/" + chainName;
}

function getMainnetBlockExplorerEndpoint(chainName: string, api: boolean = false): string {
  const url = `https://${chainName}.explorer.mainnet.skalenodes.com`;

  return api ? url + "/api" : url;
}

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.5.0",
      },
      {
        version: "0.5.5",
        settings: {},
      },
      {
        version: "0.5.16",
        settings: {},
      },
      {
        version: "0.6.2",
        settings: {},
      },
      {
        version: "0.6.7",
        settings: {},
      },
      {
        version: "0.8.0",
        settings: {},
      },
      {
        version: "0.8.1",
        settings: {},
      },
      {
        version: "0.8.9",
        settings: {},
      },
      {
        version: "0.8.19",
        settings: {},
      },
    ],
  },
  networks: {
    "calypso-testnet": {
      url: getTestnetEndpoint("giant-half-dual"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "europa-testnet": {
      url: getTestnetEndpoint("juicy-low-small"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "nebula-testnet": {
      url: getTestnetEndpoint("lanky-ill-funny"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "titan-testnet": {
      url: getTestnetEndpoint("aware-fake-trim"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "calypso-mainnet": {
      url: getMainnetEndpoint("honorable-steel-rasalhague"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "europa-mainnet": {
      url: getMainnetEndpoint("elated-tan-skat"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "nebula-mainnet": {
      url: getMainnetEndpoint("green-giddy-denebola"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "titan-mainnet": {
      url: getMainnetEndpoint("parallel-storym-spica"),
      gas: 100_000_000,
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    tokenOwner: 1,
    etherscan: {
      apiKey: "any-key"
    },
  },
  etherscan: {
    apiKey: {
        "calypso-testnet": "non-applicable",
        "europa-testnet": "non-applicable",
        "nebula-testnet": "non-applicable",
        "titan-testnet": "non-applicable",
        "calypso-mainnet": "non-applicable",
        "europa-mainnet": "non-applicable",
        "nebula-mainnet": "non-applicable",
        "titan-mainnet": "non-applicable",
    },
    customChains: [
        {
            network: "calypso-testnet",
            chainId: 974399131,
            urls: {
                apiURL: getTestnetBlockExplorerEndpoint("giant-half-dual", true),
                browserURL: getTestnetBlockExplorerEndpoint("giant-half-dual")
            }
        },
        {
            network: "europa-testnet",
            chainId: 1444673419,
            urls: {
                apiURL: getTestnetBlockExplorerEndpoint("juicy-low-small", true),
                browserURL: getTestnetBlockExplorerEndpoint("juicy-low-small")
            }
        },
        {
            network: "nebula-testnet",
            chainId: 37084624,
            urls: {
                apiURL: getTestnetBlockExplorerEndpoint("lanky-ill-funny", true),
                browserURL: getTestnetBlockExplorerEndpoint("lanky-ill-funny")
            }
        },
        {
            network: "titan-testnet",
            chainId: 1020352220,
            urls: {
                apiURL: getTestnetBlockExplorerEndpoint("aware-fake-trim", true),
                browserURL: getTestnetBlockExplorerEndpoint("aware-fake-trim")
            }
        },
        {
            network: "calypso-mainnet",
            chainId: 1564830818,
            urls: {
                apiURL: getMainnetBlockExplorerEndpoint("honorable-steel-rasalhague"),
                browserURL: getMainnetBlockExplorerEndpoint("honorable-steel-rasalhague", true)
            }
        },
        {
            network: "europa-mainnet",
            chainId: 2046399126,
            urls: {
                apiURL: getMainnetBlockExplorerEndpoint("elated-tan-skat"),
                browserURL: getMainnetBlockExplorerEndpoint("elated-tan-skat", true)
            }
        },
        {
            network: "nebula-mainnet",
            chainId: 1482601649,
            urls: {
                apiURL: getMainnetBlockExplorerEndpoint("green-giddy-denebola", true),
                browserURL: getMainnetBlockExplorerEndpoint("green-giddy-denebola")
            }
        },
        {
            network: "titan-mainnet",
            chainId: 1350216234,
            urls: {
                apiURL: getMainnetBlockExplorerEndpoint("parallel-storym-spica"),
                browserURL: getMainnetBlockExplorerEndpoint("parallel-storym-spica", true)
            }
        },
    ]
  }
};

export default config;
