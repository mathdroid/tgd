import { Contract, utils } from "ethers";
import abi from "./public/abi.json";
import { CHAINS, getTokenAddress, TOKENS } from "@lido-sdk/constants";
import { getERC20Contract } from "@lido-sdk/contracts";
import { getRpcProvider } from "@lido-sdk/providers";

export const supportedChainIds = [CHAINS.Mainnet];

const contractAddress = process.env.NEXT_PUBLIC_SC_CONTRACT_ADDRESS;
const contractInterface = new utils.Interface(abi);
export const contract = new Contract(contractAddress, contractInterface);

export const rpc = {
  [CHAINS.Mainnet]: process.env.NEXT_PUBLIC_SC_RPC_URL_1,
  [CHAINS.Rinkeby]: process.env.NEXT_PUBLIC_SC_RPC_URL_4,
};
const providerRpc = getRpcProvider(CHAINS.Rinkeby, rpc[CHAINS.Rinkeby]);
export const contractRpc = getERC20Contract(contractAddress, providerRpc);
