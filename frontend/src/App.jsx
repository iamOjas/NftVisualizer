// import getWeb3 from "./getWeb3";
import NFTCard from './NFTCard';
import styled from 'styled-components';
import NFTModal from './NFTModal';
import { useState, useEffect} from 'react';
import {getNftVisualizer, getWeb3} from './utils'
import axios from 'axios';


let nfts = [
  {name : "Mario" ,symbol : "SMWC" ,copies :  "10" ,image : "https://pngimg.com/uploads/chrome_logo/chrome_logo_PNG2.png" },      
  {name : "Luigi" ,symbol : "SMWC" ,copies :  "10" ,image : "https://pngimg.com/uploads/chrome_logo/chrome_logo_PNG2.png"},
  {name : "Yoshi" ,symbol : "SMWC" ,copies :  "10" ,image : "https://pngimg.com/uploads/chrome_logo/chrome_logo_PNG2.png"},
  {name : "Donkey King" ,symbol : "SMWC" ,copies :  "10" ,image : "https://pngimg.com/uploads/chrome_logo/chrome_logo_PNG2.png"},
  {name : "Mario" ,symbol : "SMWC" ,copies :  "10" ,image : "https://pngimg.com/uploads/chrome_logo/chrome_logo_PNG2.png"},
  {name : "Luigi" ,symbol : "SMWC" ,copies :  "10" ,image : "https://pngimg.com/uploads/chrome_logo/chrome_logo_PNG2.png"},
  {name : "Yoshi" ,symbol : "SMWC" ,copies :  "10" ,image : "https://pngimg.com/uploads/chrome_logo/chrome_logo_PNG2.png"},
  {name : "Donkey King" ,symbol : "SMWC" ,copies :  "10" ,image : "https://pngimg.com/uploads/chrome_logo/chrome_logo_PNG2.png"},
  ]
  

function App() {
  const [showModal, setshowModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState();
  const [web3,setWeb3] = useState(undefined);
  const [accounts,setAccounts] = useState(undefined);
  const [nftCollection,setNftCollection] = useState(undefined);
  const [numberOfNfts, setNumberOfNfts] = useState(0);
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [initialNft, setNFT] = useState(nfts);

  useEffect(() => {
    const init = async() =>{
      const web3 = await getWeb3();
      const accounts = await web3.eth.requestAccounts();
      const NftVisualizer = await getNftVisualizer(web3);
      const number = (await NftVisualizer.methods.tokenCount().call());
      const symbol = await NftVisualizer.methods.symbol().call()
      // console.log(number,symbol)

      setWeb3(web3);
      setAccounts(accounts);
      setNftCollection(NftVisualizer);
      setCollectionSymbol(symbol);
      setNumberOfNfts(number)
    }
    init();
  },[])
  
  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof nftCollection === 'undefined'
    || numberOfNfts === 0
    || collectionSymbol === ""
  ){
    return <div>Loading...</div>;
  }

  function toggleModal(i){
    if(i){
      setSelectedNft(i)
    }
    setshowModal(!showModal)
  }

  const getNftMetadata = async () =>{
    let address = accounts[0]
    let arr = new Array(Number(numberOfNfts))
    let account = arr.fill(address);
    let ids = Array.from({length: numberOfNfts},(_,i) => i+1)
    // console.log(account)
    let copies = await nftCollection.methods.balanceOfBatch(account,ids).call();
    // console.log(copies)
    let tempArray = [];
    let baseUrl = "";

    for(let i = 1; i<= numberOfNfts; i++){
      if(i===1){
        let tokenURI = await nftCollection.methods.uri(i).call();
        baseUrl = tokenURI.replace(/\d+.json/,"")
        let metadata = await getMetaDataFromIpfs(tokenURI)
        metadata.symbol = collectionSymbol
        metadata.copies = copies[i-1];
        tempArray.push(metadata)
      }
      else{
        let metadata = await getMetaDataFromIpfs(baseUrl+ `${i}.json`)
        metadata.symbol = collectionSymbol
        metadata.copies = copies[i-1];
        tempArray.push(metadata)
      }
    }
    setNFT(tempArray)
  }

  getNftMetadata();

  const getMetaDataFromIpfs = async (tokenUri) =>{
    let metadata = await axios.get(tokenUri)
    return metadata.data
  }

  
  return (
    <>
    <Container>
      <Title>Super Mario World Collection({collectionSymbol})</Title>
      <Subtitle>The rarest and best of Super Mario World</Subtitle>
      <Subtitle>Total Number Of NFTs: {numberOfNfts}</Subtitle>
      <Grid>
        {
          initialNft.map((nft,i)=>
            <NFTCard nft={nft} key={i} togglemodal ={() => toggleModal(nft)}></NFTCard>
          )
        }
      </Grid>
    </Container>
    {
      showModal &&
      <NFTModal nft={selectedNft} togglemodal ={() => toggleModal()} />
    }
    </>
  );
}



const Title = styled.h1`
  margin:0;
  text-align: center;
`
const Subtitle = styled.h4`
  color: gray;
  margin-top: 0;
  text-align: center;
`

const Container = styled.div`
  width: 70%;
  max-width: 1200px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 100px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
`


export default App;
