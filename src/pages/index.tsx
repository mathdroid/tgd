import Head from "next/head";
import {
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  Image,
  Link,
  Button,
  Input,
  AspectRatio,
  ChakraProvider,
  theme,
} from "@chakra-ui/react";

import { Contract } from "ethers";
import { WalletSelection } from "../components/WalletSelection";
import { ProviderWeb3, useWeb3 } from "@lido-sdk/web3-react";
import { CHAINS } from "@lido-sdk/constants";
import { supportedChainIds, rpc } from "../contract";
import { useState } from "react";
import abi from "../abi.json";

export async function getStaticProps() {
  return {
    props: {},
  };
}
function Home() {
  const { account, library } = useWeb3();
  const [minted] = useState(0);
  const [mintAmount, setMintAmount] = useState(1);
  const increase = () => {
    setMintAmount(mintAmount + 1);
  };
  const decrease = () => {
    setMintAmount(mintAmount > 1 ? mintAmount - 1 : 1);
  };
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
        background="#ffffff"
        dir="row"
        p={16}
        justifyContent={"space-between"}
        id="mint"
      >
        <Stack p={8} flex={1}>
          <Heading fontWeight={"bold"} textTransform={"uppercase"}>
            The Goods Society
          </Heading>
          <Text fontSize={"xl"} textTransform={"uppercase"}>
            Join The Society
          </Text>
          <Flex
            background={"#e3e3e3"}
            borderRadius={"18px"}
            direction="column"
            alignContent={"center"}
          >
            <Flex
              background={"#c4c4c4"}
              borderRadius={"18px"}
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
            background={"#e3e3e3"}
            borderRadius={"18px"}
            direction="column"
            alignContent={"center"}
          >
            <Stack p={4}>
              <Text textAlign={"center"}>Amount To Mint</Text>
              <HStack>
                <Button borderRadius={"full"} onClick={decrease}>
                  -
                </Button>
                <Input value={mintAmount} textAlign={"center"} />
                <Button borderRadius={"full"} onClick={increase}>
                  +
                </Button>
              </HStack>
            </Stack>
          </Flex>
          {account ? (
            <Button
              borderRadius={"18px"}
              background={"#e3e3e3"}
              onClick={async () => {
                // setIsCompounding(true);
                try {
                  const connectedContract = new Contract(
                    process.env.NEXT_PUBLIC_SC_CONTRACT_ADDRESS,
                    abi,
                    library?.getSigner()
                  );
                  const mintTx = await connectedContract.mint({
                    value: `${5 * mintAmount}0000000000000000`,
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
              Mint
            </Button>
          ) : (
            <WalletSelection borderRadius={"18px"} background={"#e3e3e3"} />
          )}
        </Stack>
        <AspectRatio ratio={1} flex={1}>
          <Image src="section1.png" />
        </AspectRatio>
      </Flex>
      <Flex minH="80vh" dir="row" justifyContent={"space-between"} id="about">
        <Flex
          flex={4}
          backgroundImage="section2.png"
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
      <Stack spacing={16} p={16} id="utilities">
        <Heading textAlign={"center"} textTransform={"uppercase"}>
          Utilities
        </Heading>
        <HStack spacing={16}>
          <Image src="/benefit.png"></Image>
          <Stack>
            <Heading>FREE COFFEE AT THE GOODS CAFE FOR 1 YEAR</Heading>
            <Text>
              As part of the goods society, enjoy our goods coffee for free
              every Monday - Wednesday starting February 2022.
            </Text>
          </Stack>
        </HStack>
        <HStack spacing={16}>
          <Stack>
            <Heading>
              PRIVILEGE TO OWN THE FIRST EVER NON FUNGIBLE TOTE BAG
            </Heading>
            <Text>
              A physical limited edition tote bag with NFT to verify its
              ownership.
            </Text>
          </Stack>
          <Image src="/benefit2.png"></Image>
        </HStack>

        <HStack spacing={16}>
          <Image src="/benefit3.png"></Image>
          <Stack>
            <Heading>
              INSTANT OWNERSHIP OF THE GOODS PLUS BLACK LEVEL MEMBERSHIP CARD
            </Heading>
            <Text>
              Up to 50% discount on all The Goods Dept Product and Up to 30% on
              all The Goods Dept FNB on birthday.
            </Text>
          </Stack>
        </HStack>
        <HStack spacing={16}>
          <Stack>
            <Heading>EARLY ACCESS TO THE GOODS DEPT COLLECTION DROPS</Heading>
            <Text>
              New shoes? Limited edition products? going to the hippest event in
              town? your our VIP on every activities.
            </Text>
          </Stack>
          <Image src="/benefit4.png"></Image>
        </HStack>
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
        <Home />
      </ChakraProvider>
    </ProviderWeb3>
  );
};

export default Page;
