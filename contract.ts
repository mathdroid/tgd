import { Contract, utils } from "ethers";
import abi from "./public/abi.json";
import { CHAINS, getTokenAddress, TOKENS } from "@lido-sdk/constants";
import { getERC20Contract } from "@lido-sdk/contracts";
import { getRpcProvider } from "@lido-sdk/providers";
import constants from "./constants";

export const supportedChainIds = [CHAINS.Mainnet];

const contractAddress = constants.contractAddress;
const contractInterface = new utils.Interface(abi);
export const contract = new Contract(contractAddress, contractInterface);

const providerRpc = getRpcProvider(constants.network, constants.rpc);
export const contractRpc = getERC20Contract(contractAddress, providerRpc);
