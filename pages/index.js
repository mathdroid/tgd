import Head from "next/head";
import Image from "next/image";
import { Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      minH={"100vh"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
    >
      <Flex
        height={16}
        justifyContent={"space-between"}
        direction={"row"}
        p={4}
        width={"100%"}
      >
        <Heading>The Goods Dept</Heading>
        <HStack spacing={4} textTransform={"uppercase"} fontWeight={"bold"}>
          <Text>Mint</Text>
          <Text>About</Text>
          <Text>Utilities</Text>
          <Text>FAQ</Text>
          <Text>Team</Text>
        </HStack>
        <HStack spacing={4} textTransform={"uppercase"} fontWeight={"bold"}>
          <Text>Discord</Text>
          <Text>Twitter</Text>
          <Text>Instagram</Text>
          <Text>OpenSea</Text>
        </HStack>
      </Flex>
      <Image alt="The Goods Dept NFT" src={require("../public/banner.png")} />
    </Flex>
  );
}
