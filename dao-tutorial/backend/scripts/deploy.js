const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");
const hre = require("hardhat");

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await hre.ethers.deployContract("FakeNFTMarketplace");
  await FakeNFTMarketplace.waitForDeployment();
  console.log("FakeNFTMarketplace deployed to: ", FakeNFTMarketplace.target);

  // Now deploy the ToTheApexDAO contract
  const ToTheApexDAO = await hre.ethers.deployContract(
    "ToTheApexDAO",
    [FakeNFTMarketplace.target, CRYPTODEVS_NFT_CONTRACT_ADDRESS],
    { value: ethers.parseEther("1") }
  );
   await ToTheApexDAO.waitForDeployment();
  console.log("ToTheApexDAO deployed to: ", ToTheApexDAO.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
