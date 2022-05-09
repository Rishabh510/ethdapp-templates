// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyToken is ERC721, ERC721URIStorage {
    uint256 counter = 0;
    event NFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("MyToken", "MTK") {}

    function mintNFT(address to, string memory uri) public {
        _safeMint(to, counter);
        _setTokenURI(counter, uri);
        counter++;
        emit NFTMinted(msg.sender, counter);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
