import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

import { CHAINS } from "@lido-sdk/constants";
import { ProviderWeb3 } from "@lido-sdk/web3-react";

import { rpc, supportedChainIds } from "../contract";

function MyApp({ Component, pageProps }) {
  return (
    <ProviderWeb3
      defaultChainId={CHAINS.Mainnet}
      supportedChainIds={supportedChainIds}
      rpc={rpc}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProviderWeb3>
  );
}

export default MyApp;
