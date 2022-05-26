const SuperMarioWorldCollection = artifacts.require("SuperMarioWorldCollection");

module.exports = async function(deployer){
    await deployer.deploy(SuperMarioWorldCollection, 
                        "SuperMarioWorldCollection",
                        "SMWC",
                        "https://ipfs.io/ipfs/Qmb6tWBDLd9j2oSnvSNhE314WFL7SRpQNtfwjFWsStXp5A/");

    const superMarioWorldCollection = await SuperMarioWorldCollection.deployed();

    console.log("SuperMarioWorldCollection was deployed to address",superMarioWorldCollection.address);

    await superMarioWorldCollection.mint(10);
    await superMarioWorldCollection.mint(10);
    await superMarioWorldCollection.mint(10);
    await superMarioWorldCollection.mint(1);
    await superMarioWorldCollection.mint(1);
    await superMarioWorldCollection.mint(1);
    await superMarioWorldCollection.mint(1);
    await superMarioWorldCollection.mint(1);

    console.log("NFT minted successfully")
    
}