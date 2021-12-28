import Head from "next/head";
import {
  Flex,
  Heading,
  HStack,
  VStack,
  Stack,
  Text,
  Image,
  Link,
  Button,
  Input,
  AspectRatio,
  ChakraProvider,
  theme,
  Center,
} from "@chakra-ui/react";

import { Contract, BigNumber, utils } from "ethers";
import { WalletSelection } from "../components/WalletSelection";
import { ProviderWeb3, useWeb3 } from "@lido-sdk/web3-react";
import { CHAINS } from "@lido-sdk/constants";
import { supportedChainIds, rpc, config } from "../contract";
import { useEffect, useState } from "react";
import abi from "../abi.json";
import { withPasswordProtect } from "@storyofams/next-password-protect";
import constants from "../constants";
import { DAppProvider, useContractCall } from "@usedapp/core";

export function useMintedAmount() {
  const [totalMinted]: any =
    useContractCall({
      abi: new utils.Interface(abi),
      address: constants.contractAddress,
      method: "totalSupply",
      args: [],
    }) ?? [];
  return BigNumber.isBigNumber(totalMinted)
    ? BigNumber.from(totalMinted).toNumber()
    : 0;
}
function Home() {
  const { account, library } = useWeb3();
  const [mintAmount, setMintAmount] = useState(1);
  const increase = () => {
    setMintAmount(mintAmount + 1);
  };
  const decrease = () => {
    setMintAmount(mintAmount > 1 ? mintAmount - 1 : 1);
  };
  useEffect(() => {
    console.log(constants.contractAddress);
  }, []);

  const minted = useMintedAmount();
  return (
    <Flex
      minH={"100vh"}
      width={"100%"}
      direction={"column"}
      alignItems={"stretch"}
    >
      <Flex
        height={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
        p={4}
        width={"100%"}
        background={"shade1"}
      >
        <Link href="https://thegoodsdept.com" flex={1}>
          <Image src="/logo.svg" />
        </Link>
        <HStack
          spacing={4}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          flex={1}
          px={4}
          justifyContent={"center"}
        >
          <Link href="#mint">
            <Text>Mint</Text>
          </Link>
          <Link href="#about">
            <Text>About</Text>
          </Link>
          <Link href="#utilities">
            <Text>Utilities</Text>
          </Link>
          <Link href="#faq">
            <Text>FAQ</Text>
          </Link>
          <Link href="#team">
            <Text>Team</Text>
          </Link>
        </HStack>
        <HStack
          justifyContent={"flex-end"}
          spacing={4}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          flex={1}
          px={4}
        >
          <WalletSelection />
        </HStack>
      </Flex>
      <Flex
        minH="100vh"
        backgroundImage={"/banner.png"}
        backgroundSize={"cover"}
        backgroundPosition={"bottom"}
      />
      <Flex
        minH="80vh"
        background="#F7F4EF"
        dir="row"
        p={16}
        justifyContent={"space-between"}
        id="mint"
      >
        <Stack p={8} flex={1}>
          <Center flexDir="column">
            <Heading fontWeight={"bold"} textTransform={"uppercase"}>
              The Goods Society
            </Heading>
            <Text fontSize={"xl"} textTransform={"uppercase"}>
              Join The Society
            </Text>
          </Center>
          <Flex flexDir="row" justifyContent="space-between">
            <Flex
              background={"#fff"}
              borderRadius={"full"}
              direction="column"
              alignContent={"center"}
              w="30%"
            >
              <Flex
                background={"#fff"}
                borderRadius={"full"}
                width={"60%"}
                height={"100%"}
                position="relative"
              ></Flex>
              <Flex direction="column" px={4} py={2}>
                <Heading textAlign={"center"}>{minted}/1100</Heading>
                <Text fontSize={"xs"} alignSelf={"flex-end"}>
                  Minted
                </Text>
              </Flex>
            </Flex>
            <Flex
              background={"#fff"}
              borderRadius={"full"}
              direction="column"
              alignContent={"center"}
              w="30%"
            >
              <Stack p={4}>
                {/* <Text textAlign={"center"}>Amount To Mint</Text> */}
                <HStack>
                  <Button
                    borderRadius={"full"}
                    onClick={decrease}
                    disabled
                    bg="#5BAAF5"
                  >
                    -
                  </Button>
                  <Input
                    value={1}
                    textAlign={"center"}
                    readOnly
                    disabled
                    borderColor="#fff"
                  />
                  <Button
                    borderRadius={"full"}
                    onClick={increase}
                    disabled
                    bg="#5BAAF5"
                  >
                    +
                  </Button>
                </HStack>
              </Stack>
            </Flex>
            <Flex
              // background={"#e3e3e3"}
              borderRadius={"full"}
              direction="column"
              alignContent={"center"}
              w="30%"
            >
              {account ? (
                <Button
                  size="lg"
                  height="100%"
                  color="#fff"
                  borderRadius={"full"}
                  background={"#7F66DE"}
                  alignContent={"center"}
                  onClick={async () => {
                    // setIsCompounding(true);
                    try {
                      const connectedContract = new Contract(
                        constants.contractAddress,
                        abi,
                        library?.getSigner()
                      );
                      const mintTx = await connectedContract.mint({
                        value: `40000000000000000`,
                      });
                      await mintTx.wait();
                      console.log(`${mintTx.hash}`);
                    } catch (e) {
                      console.error(e);
                    } finally {
                      // setIsCompounding(false);
                    }
                  }}
                >
                  MINT 0.08 ETH
                </Button>
              ) : (
                <WalletSelection borderRadius={"18px"} background={"#7F66DE"} />
              )}
            </Flex>
          </Flex>
        </Stack>

        {/* <AspectRatio ratio={1} flex={1}>
          <Image src="section1.jpg" />
        </AspectRatio> */}
      </Flex>

      <Flex minH="80vh" dir="row" justifyContent={"space-between"} id="about">
        {/* <Image src="c10.png"></Image> */}
        <Flex
          flex={4}
          backgroundImage="c10.png"
          backgroundSize="cover"
          backgroundPosition={"center"}
        />
        <Stack flex={5} p={8}>
          <Heading textTransform={"uppercase"}>Who are they?</Heading>

          <Text>
            The Goods People are citizens of the Goods City, they’re colors made
            them different & unique, with their signature tote bag ready to
            carry the world for them every-verse they go. They’re young at heart
            and open minded, fashion enthusiast, tech savvy, dynamic and
            creative with a rooted support for local sourced product.
          </Text>
          <Text>
            Each one believes that they’re destined for something bigger, be
            able to build better things together. And so together they decided
            to create a society, a community where they can show their talents
            and unique skill set, a place where they can do good things together
            with like minded people, a place to come out and show the world who
            they really are, a society to collaborate and accepted for their
            true colors.
          </Text>
        </Stack>
      </Flex>
      <Stack spacing={16} p={16} id="utilities" bg="#F7F4EF">
        <Heading textAlign={"center"} textTransform={"uppercase"}>
          Utilities
        </Heading>
        <Flex justifyContent="space-between">
          <HStack spacing={16} w="40%">
            <Stack>
              <Image src="/benefit.png"></Image>
              <Heading>FREE COFFEE AT THE GOODS CAFE FOR 1 YEAR</Heading>
              <Text>
                As part of the goods society, enjoy our goods coffee for free
                every Monday - Wednesday starting February 2022.
              </Text>
            </Stack>
          </HStack>
          <HStack spacing={16} w="40%">
            <Stack>
              <Image src="/benefit2.png"></Image>
              <Heading>
                PRIVILEGE TO OWN THE FIRST EVER NON FUNGIBLE TOTE BAG
              </Heading>
              <Text>
                A physical limited edition tote bag with NFT to verify its
                ownership.
              </Text>
            </Stack>
          </HStack>
        </Flex>
        <Flex justifyContent="space-between">
          <HStack spacing={16} w="40%">
            <Stack>
              <Image src="/benefit3.png"></Image>
              <Heading>
                INSTANT OWNERSHIP OF THE GOODS PLUS BLACK LEVEL MEMBERSHIP CARD
              </Heading>
              <Text>
                Up to 50% discount on all The Goods Dept Product and Up to 30%
                on all The Goods Dept FNB on birthday.
              </Text>
            </Stack>
          </HStack>
          <HStack spacing={16} w="40%">
            <Stack>
              <Image src="/benefit4.png"></Image>
              <Heading>EARLY ACCESS TO THE GOODS DEPT COLLECTION DROPS</Heading>
              <Text>
                New shoes? Limited edition products? going to the hippest event
                in town? your our VIP on every activities.
              </Text>
            </Stack>
          </HStack>
        </Flex>
      </Stack>

      <Stack spacing={16} p={16} id="utilities" bg="#fff">
        <Heading textAlign={"center"} textTransform={"uppercase"}>
          THE TEAM
        </Heading>
        <Flex justifyContent="space-between" alignItems="start">
          <HStack w="20%">
            <Stack>
              <Image src="/benefit.png"></Image>
              <Heading size="md">Anton Wirjono</Heading>
              <Text>Founder of The Goods Dept</Text>
            </Stack>
          </HStack>
          <HStack w="20%">
            <Stack>
              <Image src="/benefit.png"></Image>
              <Heading size="md">Hendrick</Heading>
              <Text>Head of Marketing The Goods Dept</Text>
            </Stack>
          </HStack>
          <HStack w="20%">
            <Stack>
              <Image src="/benefit.png"></Image>
              <Heading size="md">Iman Waskito</Heading>
              <Text>Lead Character Designer</Text>
            </Stack>
          </HStack>
          <HStack w="20%">
            <Stack>
              <Image src="/benefit.png"></Image>
              <Heading size="md">Yudha</Heading>
              <Text>Creative Head The Goods Dept</Text>
            </Stack>
          </HStack>
        </Flex>
      </Stack>

      <Stack p={16} alignContent={"stretch"}>
        <Text fontSize={"xx-small"} alignItems={"center"}>
          The Good People © 2021 All Right Reserved
        </Text>
      </Stack>
    </Flex>
  );
}

const Page = () => {
  return (
    <ProviderWeb3
      defaultChainId={CHAINS.Mainnet}
      supportedChainIds={supportedChainIds}
      rpc={rpc}
    >
      <ChakraProvider theme={theme}>
        <DAppProvider config={config}>
          <Home />
        </DAppProvider>
      </ChakraProvider>
    </ProviderWeb3>
  );
};

export default withPasswordProtect(Page);
