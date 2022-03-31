import React, {useEffect, useState} from "react";
import aro4a from '../images/slider__gif__img/aro4a.gif';
import aro3 from '../images/slider__gif__img/aro3.gif'
import { loadBlockchain } from '../store/asyncActions'
import { useStore } from '../context/GlobalState'
import { setupConnection } from "../store/actions";
import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import CoinbaseWalletProvider from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider'
import WalletLink from "walletlink";
import Wallet from "./Wallet";
import Dashboard from "./Dashboard";
import { ADDRESS, ABI } from '../contract/SmartContract';
import { providers } from "web3modal";

function MainSection(){
    // const [{ accounts }, dispatch] = useStore();
    const [{ accounts,owner_account,contract,total_mint,user_reserved,token_price, token_price1,launch_time, connect}, dispatch] = useStore();
    // const [status, setStatus] = useState("Connect");
    //Apr 07, 2022 19:00:00 GMT+0000
    const [account, setAccount] = useState();
    const [distance, setDistance] = useState(new Date("Mar 26, 2022 23:32:00") - new Date().getTime());
    const [label1, setLabel1] = useState("Rebels NFT Collection SOLD OUT");
    const [label2, setLabel2] = useState("Robots NFT Mint date: April 7th");
    const [label3, setLabel3] = useState("Official NFT Collection");
    const [label4, setLabel4] = useState("MINTING April 7th ");
    const [total_mint1, setMint] = useState(0);
    const [price1, setPrice1] = useState(0);
    const [price2, setPrice2] = useState(0);
    const { ethereum } = window;

    const providerOptions =  !ethereum ? {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: "223f20f418c34a758240a7f416435110", // Required
                network: "mainnet",
                qrcodeModalOptions: {
                    mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
                }
            }
        },
        walletlink: {
            package: WalletLink, 
            options: {
              appName: "Web 3 Modal",
              infuraId: "223f20f418c34a758240a7f416435110"
            }
        },
        authereum: {
            package: Authereum // required
        },
        "custom-metamask": {
            display: {
            logo: providers.METAMASK.logo,
            name: 'Install MetaMask',
            description: 'Connect using browser wallet'
            },
            package: {},
            connector: async () => {
            window.open('https://metamask.io')
            throw new Error('MetaMask not installed');
            }
        }
    } : ethereum.isCoinbaseWallet ? {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: "223f20f418c34a758240a7f416435110", // Required
                network: "mainnet",
                qrcodeModalOptions: {
                    mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
                }
            }
        },  
        authereum: {
            package: Authereum // required
        },
        "custom-metamask": {
            display: {
            logo: providers.METAMASK.logo,
            name: 'Install MetaMask',
            description: 'Connect using browser wallet'
            },
            package: {},
            connector: async () => {
            window.open('https://metamask.io')
            throw new Error('MetaMask not installed');
            }
        }
    } : {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: "223f20f418c34a758240a7f416435110", // Required
                network: "mainnet",
                qrcodeModalOptions: {
                    mobileLinks: ["rainbow", "metamask", "argent", "trust", "imtoken", "pillar"]
                }
            }
        },
        walletlink: {
            package: WalletLink, 
            options: {
              appName: "Web 3 Modal",
              infuraId: "223f20f418c34a758240a7f416435110"
            }
        },
        authereum: {
            package: Authereum // required
        }
    };

    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        theme: "dark"
    });

    useEffect(async () => {

        await loadBlockchain(dispatch);
        if(web3Modal.cachedProvider) {
            connectButton();
            // await loadBlockchain(dispatch);
            // const web3 = new Web3(Web3.givenProvider);
            // const acc = await web3.eth.getAccounts();
            // setAccount(acc[0]);
        }

        const interval = setInterval(() => {
            if(distance > 1) {
                setDistance(new Date("Mar 26, 2022 23:32:00") - new Date().getTime());
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById("demo").innerHTML = "Countdown to mint: <br>" + days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";
            }
            if(distance > -1000 && distance < 1000) window.location.href = "/";
        }, 1000);
        
        return () => clearInterval(interval);
    }, [distance, accounts[0]])

    const connectButton =  async () => {          
        try {
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            const acc = await web3.eth.getAccounts();
            setAccount(acc[0]);
            const contract = new web3.eth.Contract(ABI, ADDRESS);
            const t_mint = await contract.methods.totalSupply().call();
            setMint(t_mint);
            const p1 = await contract.methods.mintPrice().call();
            setPrice1(p1);
            const p2 = await contract.methods.whiteMintPrice().call();
            setPrice2(p2);
        } catch(error) {
            if(error.message == "User rejected") window.location.reload();
        }
    };
    
    const disconnectButton = async () => {
        await web3Modal.clearCachedProvider();
        setAccount("");
    };
    
    return(
        <>
        <div id="main_and_text_container">
            <main>
                {/* <!-- slider section  --> */}
                <div className="slider__container">
                    <div
                        id="carousel"
                        className="carousel slide carousel-fade"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div
                                className="carousel-item active text-center"
                                data-bs-interval="3000"
                            >
                                <img
                                    className="d-inline-block"
                                    src={aro4a}
                                    className="d-block"
                                    alt="slider image"
                                />
                            </div>
                            <div
                                className="carousel-item text-center"
                                data-bs-interval="3000"
                            >
                                <img
                                    className="d-inline-block"
                                    src={aro3}
                                    className="d-block"
                                    alt="slider image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* <!-- main section texts  --> */}
            <section id="main__sec__text" >
                <div className="container">
                    <div className="text__wrapper">
                        <div className="text__wrap">
                            <h1 className="text-center text-white mb-0">                 
                                Suburban Colors
                            </h1>
                            <p className="text-center text-white mb-0">
                                { (distance > 1) ? <></> :
                                    <a style={{textDecoration: 'underline'}} href="https://opensea.io/collection/suburbancolors-collection" target={"_blank"}>
                                    {label3}<br/>
                                    </a>
                                }
                                {
                                    (distance > 1) ? <></> : label4
                                }
                                人間 vs ロボット <br/>
                                
                                { (distance > 1) ? label1 : <></>} <br/>
                                { (distance > 1) ? <b>{label2}</b> : <></>}
                                {
                                    (distance > 1) ? 
                                    <p
                                        class="
                                        text-underline text-center
                                    f    d-block
                                        text-bold
                                    " id="demo"></p> : <></>
                                }
                            </p>
                            
                            {
                                (distance > 1) ? <></> :
                                (
                                    !account ?
                                        <a
                                        id="collect__now"
                                        className="
                                            text-underline text-center
                                        f    d-block
                                            text-bold
                                        "
                                        //href="#wallet"
                                        onClick={ connectButton }
                                        >Connect to a Wallet
                                        </a> : 
                                        <a
                                            id="collect__now1"
                                            className="
                                                text-underline text-center
                                            f    d-block
                                                text-bold
                                            "
                                            href="#wallet"
                                            onClick={ disconnectButton }
                                        >{account}
                                        </a>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
        {
            ( distance > 1 ) ? <></> : <Wallet 
                                            account = {account} 
                                            total_mint1 = {total_mint1}
                                            o_account = {owner_account}
                                            mint_price = {price1}
                                            white_price = {price2} />
        }
        {
            ( distance > 1 ) ? <></> : <Dashboard account = {account}/>
        }
        </>
    );
}

export default MainSection;