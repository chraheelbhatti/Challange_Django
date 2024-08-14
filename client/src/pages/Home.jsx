import React, {useEffect, useState} from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import Web3 from 'web3';

export default function Home() {
    const {user} = useAuth();
    const getUser = useUser();
    const [balance, setBalance] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);  // New state for loading user data

    useEffect(() => {
        async function fetchUserData() {
            await getUser();
            setLoadingUser(false);  // Set loading to false after user data is fetched
        }

        fetchUserData();
    }, []);  // Only run once on component mount

    useEffect(() => {
        if (user?.wallet_address) {
            const web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
            web3.eth.getBalance(user.wallet_address).then(balanceInWei => {
                const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
                setBalance(balanceInEth);
            }).catch(error => {
                console.error("Error fetching Ethereum balance:", error);
            });
        }
    }, [user]);  // Run this effect whenever 'user' changes

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {loadingUser ? (
                            'Loading user data...'
                        ) : user?.email ? (
                            <>
                                <p>Wallet Address: {user.wallet_address}</p> {/* Display wallet address */}
                                {balance !== null ? (
                                    `Ethereum Balance: ${balance} ETH`
                                ) : (
                                    'Fetching Ethereum balance...'
                                )}
                            </>
                        ) : (
                            'Please login first'
                        )}
                    </div>
                </div>
            </h2>
        </div>
    );
}
