const CONTRACT_ADDRESS = "0xc3F59FE1A6B232c985E2A73c055DaB27FEf9fffC";
const META_DATA_URL =
  "ipfs://bafyreiccofgbphyhgwsaezddlofjbn3xooikxu5nrcxbdjps6akublvhae/metadata.json";

async function mintNFT(contractAddress, metaDataURL) {
  const ExampleNFT = await ethers.getContractFactory("MyToken");
  const [owner] = await ethers.getSigners();
  const tokenId = await ExampleNFT.attach(contractAddress).mintNFT(
    owner.address,
    metaDataURL
  );
  console.log("NFT minted to: ", owner.address, " with tokenId: ", tokenId);
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
