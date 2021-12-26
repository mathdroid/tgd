import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Text,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Stack,
  Img,
  ModalFooter,
  Icon,
  Link,
  ButtonProps,
} from "@chakra-ui/react";
import {
  useWeb3,
  useConnectorMetamask,
  useConnectorCoinbase,
  useConnectorWalletConnect,
  useConnectorImToken,
  useConnectorTrust,
  useDisconnect,
} from "@lido-sdk/web3-react";
import { useLookupAddress } from "@usedapp/core";
import { UnsupportedChainIdError } from "@web3-react/core";
import { trimAddress } from "../utils";

export const WalletSelection = (props: ButtonProps) => {
  const { connector, account, error } = useWeb3();
  const metamask = useConnectorMetamask();
  const coinbase = useConnectorCoinbase();
  const walletconnect = useConnectorWalletConnect();
  const imtoken = useConnectorImToken();
  const trust = useConnectorTrust();
  const { disconnect } = useDisconnect();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const ens = useLookupAddress();

  const isWrongNetwork = !!error && error instanceof UnsupportedChainIdError;

  return (
    <>
      <Button variant="outline" onClick={onOpen} {...props}>
        {isWrongNetwork
          ? "Wrong Network"
          : account
          ? ens
            ? ens
            : trimAddress(account)
          : "Connect Wallet"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {connector ? "Disconnect Wallet" : "Connect Wallet"}
          </ModalHeader>
          <ModalBody py={8}>
            {connector && account ? (
              <Stack>
                <Button
                  width="100%"
                  onClick={() => {
                    disconnect();
                    onClose();
                  }}
                >
                  Disconnect
                </Button>
              </Stack>
            ) : (
              <Stack>
                <Button
                  size="lg"
                  justifyContent="space-between"
                  rightIcon={
                    <Img src={`/metamask.png`} h="5" alt={`Metamask logo`} />
                  }
                  onClick={() => {
                    if (window.ethereum) {
                      metamask.connect();
                      onClose();
                    } else {
                      onOpenAlert();
                    }
                  }}
                >
                  MetaMask
                </Button>
                <Button
                  size="lg"
                  justifyContent="space-between"
                  rightIcon={
                    <Img
                      src={`/walletconnect.svg`}
                      h="5"
                      alt={`WalletConnect logo`}
                    />
                  }
                  onClick={() => {
                    walletconnect.connect();
                    // activate(connectorsByName[ConnectorNames.WalletConnect]);
                    onClose();
                  }}
                >
                  WalletConnect
                </Button>
                <Button size="lg" onClick={coinbase.connect}>
                  Coinbase
                </Button>
                ;
                <Button size="lg" onClick={imtoken.connect}>
                  ImToken
                </Button>
                ;
                <Button size="lg" onClick={trust.connect}>
                  Trust Wallet
                </Button>
                ;
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            {account ? null : (
              <Text textAlign="center" w="full">
                New to Ethereum wallets?{" "}
                <Link
                  colorScheme="blue"
                  href="https://ethereum.org/en/wallets/"
                  isExternal
                >
                  Learn more
                  <Icon as={ExternalLinkIcon} mx="1" />
                </Link>
              </Text>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
