const { expect, assert } = require("chai");
// const { ethers } = require("hardhat");

describe("NFT Contract", function () {
  let nftContractAddress, nft;
  beforeEach("Should be deployed", async function () {
    const MyToken = await ethers.getContractFactory("MyToken");
    const mytoken = await MyToken.deploy();
    nft = await mytoken.deployed();
    nftContractAddress = await mytoken.address;
  });

  // Tests address for the NFT contract
  it("Should have an address", async () => {
    assert.notEqual(nftContractAddress, 0x0);
    assert.notEqual(nftContractAddress, "");
    assert.notEqual(nftContractAddress, null);
    assert.notEqual(nftContractAddress, undefined);
  });

  // Tests for NFT minting function of NFT contract using tokenID of the minted NFT
  it("Should be able to mint NFT", async () => {
    // Mints a NFT
    let sampleAddress = "0xc76235d153e17e410BB4B9D3bF5312F9758cf274";
    let sampleUri =
      "ipfs://bafyreiccofgbphyhgwsaezddlofjbn3xooikxu5nrcxbdjps6akublvhae/metadata.json";
    let txn = await nft.mintNFT(sampleAddress, sampleUri);
    let tx = await txn.wait();

    // tokenID of the minted NFT
    let event = tx.events[0];
    let value = event.args[2];
    tokenId = value.toNumber();

    assert.equal(tokenId, 0);

    // Mints another NFT
    txn = await nft.mintNFT(sampleAddress, sampleUri);
    tx = await txn.wait();

    // tokenID of the minted NFT
    event = tx.events[0];
    value = event.args[2];
    tokenId = value.toNumber();

    assert.equal(tokenId, 1);
  });
});
