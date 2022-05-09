// import ethers from "@nomiclabs/hardhat-ethers";

async function deployContract() {
  const NFT = await ethers.getContractFactory("MyToken");
  const nft = await NFT.deploy();
  await nft.deployed();

  // This solves the bug in Mumbai network where the contract address is not the real one
  const txHash = nft.deployTransaction.hash;
  const txReceipt = await ethers.provider.waitForTransaction(txHash);
  const contractAddress = txReceipt.contractAddress;

  console.log("Contract deployed to address: ", contractAddress);
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
