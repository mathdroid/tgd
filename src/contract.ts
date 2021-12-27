import { Contract, utils } from "ethers";
import abi from "./abi.json";
import { CHAINS, getTokenAddress, TOKENS } from "@lido-sdk/constants";
import { getERC20Contract } from "@lido-sdk/contracts";
import { getRpcProvider } from "@lido-sdk/providers";
import constants from "./constants";
import { Config } from "@usedapp/core";

export const supportedChainIds = [CHAINS.Rinkeby];

const contractAddress = constants.contractAddress;
const contractInterface = new utils.Interface(abi);
export const contract = new Contract(contractAddress, contractInterface);

export const rpc = {
  [CHAINS.Mainnet]: constants.rpc,
  [CHAINS.Rinkeby]: constants.rpc,
};
const providerRpc = getRpcProvider(constants.network, constants.rpc);
export const contractRpc = getERC20Contract(contractAddress, providerRpc);

export const config: Config = {
  readOnlyChainId: constants.network,
  readOnlyUrls: {
    [constants.network]: constants.rpc,
  },
};
