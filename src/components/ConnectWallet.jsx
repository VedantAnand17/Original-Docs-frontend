import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi';
import Button from './ui/button';

const ConnectWallet = () => {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect } = useConnect();
    const connectors = useConnectors();

    if (address) {
        return (
            <div className="wallet-container ">
                <div className="address-display text-white">
                    Connected: {address.slice(0, 6)}...{address.slice(-4)}
                </div>
                <Button className="disconnect-button mb-5 mt-1 bg-red-600 hover:cursor-pointer hover:bg-red-800"
                    onClick={() => disconnect()}
                >
                    Disconnect
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <h2>Connect Your Wallet</h2>
            <div className="flex gap-5 justify-center mb-5 mt-1">
                {connectors.map((connector) => (
                    <Button
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        className="bg-green-600 hover:cursor-pointer hover:bg-green-800"
                    >
                        Connect {connector.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ConnectWallet;