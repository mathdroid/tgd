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
  SimpleGrid,
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
import { NextSeo } from "next-seo";

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
          display={["none", "none", "flex"]}
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
          <Flex
            flexDir={"column"}
            justifyContent="space-around"
            alignItems="center"
            flex={1}
          >
            <Flex
              background={"#fff"}
              borderRadius={"full"}
              direction="column"
              alignContent={"center"}
              w="30%"
              minW="24rem"
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
            {/* <Flex
              background={"#fff"}
              borderRadius={"full"}
              direction="column"
              alignContent={"center"}
              w="30%"
            >
                <Text textAlign={"center"}>Amount To Mint</Text>
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
            </Flex> */}
            <Flex
              // background={"#e3e3e3"}
              borderRadius={"full"}
              direction="column"
              alignContent={"center"}
              width={["100%"]}
            >
              {account ? (
                <Button
                  alignSelf={"center"}
                  color="#fff"
                  w="24rem"
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
                  MINT 1 (0.04 ETH)
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

      <Flex
        minH="80vh"
        direction={["column", "column", "row"]}
        justifyContent={"space-between"}
        id="about"
      >
        {/* <Image src="c10.png"></Image> */}
        <Flex
          flex={4}
          minHeight="24rem"
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
        <SimpleGrid columns={[1, 1, 2]} spacing={4}>
          <Stack>
            <Image src="/benefit.png"></Image>
            <Heading>FREE COFFEE AT THE GOODS CAFE FOR 1 YEAR</Heading>
            <Text>
              As part of the goods society, enjoy our goods coffee for free
              every Monday - Wednesday starting February 2022.
            </Text>
          </Stack>
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
          <Stack>
            <Image src="/benefit3.png"></Image>
            <Heading>
              INSTANT OWNERSHIP OF THE GOODS PLUS BLACK LEVEL MEMBERSHIP CARD
            </Heading>
            <Text>
              Up to 50% discount on all The Goods Dept Product and Up to 30% on
              all The Goods Dept FNB on birthday.
            </Text>
          </Stack>
          <Stack>
            <Image src="/benefit4.png"></Image>
            <Heading>EARLY ACCESS TO THE GOODS DEPT COLLECTION DROPS</Heading>
            <Text>
              New shoes? Limited edition products? going to the hippest event in
              town? your our VIP on every activities.
            </Text>
          </Stack>
        </SimpleGrid>
      </Stack>
      <Image src="customize.png" alignSelf="center" />

      <Stack spacing={16} p={16} id="utilities" bg="#fff">
        <Heading textAlign={"center"} textTransform={"uppercase"}>
          THE TEAM
        </Heading>
        <SimpleGrid columns={[1, 2, 4]} spacing={2}>
          <HStack maxW="24rem" w="100%">
            <Stack>
              <Image
                src="/teams/Anton.png"
                borderRadius="20px"
                maxW="197px"
                maxH="197px"
                w="100%"
                h="10%"
              ></Image>
              <Heading size="md">Anton Wirjono</Heading>
              <Text>Founder of The Goods Dept</Text>
            </Stack>
          </HStack>
          <HStack maxW="24rem" w="100%">
            <Stack>
              <Image
                src="/teams/Hendrick.png"
                maxW="197px"
                maxH="197px"
                w="100%"
                h="10%"
                borderRadius="20px"
              ></Image>
              <Heading size="md">Hendrick</Heading>
              <Text>Head of Marketing The Goods Dept</Text>
            </Stack>
          </HStack>
          <HStack maxW="24rem" w="100%">
            <Stack>
              <Image
                src="/teams/iman.png"
                borderRadius="20px"
                maxW="197px"
                maxH="197px"
                w="100%"
                h="10%"
              ></Image>
              <Heading size="md">Iman Waskito</Heading>
              <Text>Lead Character Designer</Text>
            </Stack>
          </HStack>
          <HStack maxW="24rem" w="100%">
            <Stack>
              <Image
                src="/teams/yudha.png"
                borderRadius="20px"
                maxW="197px"
                maxH="197px"
                w="100%"
                h="10%"
              ></Image>
              <Heading size="md">Yudha</Heading>
              <Text>Creative Head The Goods Dept</Text>
            </Stack>
          </HStack>
          <HStack maxW="24rem" w="100%">
            <Stack>
              <Image
                src="/teams/nov.jpeg"
                borderRadius="20px"
                maxW="197px"
                maxH="197px"
                w="100%"
                h="10%"
              ></Image>
              <Heading size="md">Novrizal Pratama</Heading>
              <Text>Gaspack - Community Advisor</Text>
            </Stack>
          </HStack>
          <HStack maxW="24rem" w="100%">
            <Stack>
              <Image
                src="/teams/sunny.jpeg"
                borderRadius="20px"
                maxW="197px"
                maxH="197px"
                w="100%"
                h="10%"
              ></Image>
              <Heading size="md">Sunny Gho</Heading>
              <Text>Gaspack - Creative Advisor</Text>
            </Stack>
          </HStack>
          <HStack maxW="24rem" w="100%">
            <Stack>
              <Image
                src="/teams/irzan.jpeg"
                borderRadius="20px"
                maxW="197px"
                maxH="197px"
                w="100%"
                h="10%"
              ></Image>
              <Heading size="md">Irzan Raditya</Heading>
              <Text>Gaspack - Tech Advisor</Text>
            </Stack>
          </HStack>
        </SimpleGrid>
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
      <NextSeo
        title="The Goods Society"
        description="The Goods Society Minting Page"
        openGraph={{
          type: "website",
          url: "https://nft.thegoodsdept.com",
          title: "The Goods Society",
          description: "The Goods Society Minting Page",
          images: [
            {
              url: "https://nft.thegoodsdept.com/section1.jpg",
              width: 800,
              height: 800,
              alt: "The Goods Society",
            },
          ],
        }}
      />
      <ChakraProvider theme={theme}>
        <DAppProvider config={config}>
          <Home />
        </DAppProvider>
      </ChakraProvider>
    </ProviderWeb3>
  );
};

export default Page;
