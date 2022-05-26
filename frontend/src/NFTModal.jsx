import React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'

function NFTModal({nft,togglemodal}) {
  return (
    <NFTmodal>
        <ModalContent>
            <ModalGrid>
                <Nftphoto style={{backgroundImage: `url(${nft && nft.image})`, height: 400, width: 400}}></Nftphoto>
                <div>
                    <ModalTitle>{nft.name}</ModalTitle>
                    <Paragraph>{`You own ${nft.copies} copies`}</Paragraph>
                    <SectoinText> Description </SectoinText>
                    <Paragraph style={{width:400}}> {nft.description}</Paragraph>
                    <SectoinText> Attributes </SectoinText>
                    {
                        nft.attributes &&
                            nft.attributes.map((attribute,i) =>{
                                <div key={i}>
                                    <div style={{margin: "10px 0px 5px 0px"}}>
                                        <AttributeText>{attribute.trait}</AttributeText>
                                    </div>
                                </div>
                            })
                    }
                </div>
            </ModalGrid>
            <CloseButton onClick={()=> togglemodal()}>&times;</CloseButton>
        </ModalContent>
    </NFTmodal>
  )
}

const AttributeText = styled.h4`
color: gray;
margin: 0;
display: inline;
`

const CloseButton = styled.span`
    position: absolute;
    right: 0;
    top:0;
    padding:20px 25px 0 0;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
`

const Nftphoto = styled.div`
    display: block;
    height: 200px;
    width: 200px;
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    margin: auto;
`

const ModalTitle = styled.h1`
    margin:0;
`
const Paragraph = styled.p`
    margin: 0 0 15px 0;
`
const SectoinText = styled.h3`
    margin: 5px 0;
`
const ModalGrid = styled.div`
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
`

const NFTmodal = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 100px;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
`
const ModalContent = styled.div`
    position: relative;
    width: 900px;
    margin: auto;
    background-color: white;
    border-radius: 20px;
    padding: 20px;
`

export default NFTModal