import Web3 from 'web3';
import SuperMarioWorldCollection from './contracts/SuperMarioWorldCollection.json'
import detectEthereumProvider from '@metamask/detect-provider';

const getWeb3 = () =>

    new Promise(async (resolve, reject) => {

    
        const provider = await detectEthereumProvider();

        if (provider) {

            await provider.request({ method:'eth_requestAccounts'});

            try {

                const web3 = new Web3(provider);

                resolve(web3);

            } catch (error) {

                reject(error);

            }

        } reject('Install Metamask');

    });

    
const getNftVisualizer = async web3 => {
    let contract = new web3.eth.Contract(
        SuperMarioWorldCollection.abi,
        '0x028d2548b231A192dD2bAD7e577441C5298EACF8'
    );

    return contract
}

export { getWeb3, getNftVisualizer };