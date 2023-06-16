import Erc20Json from '@/abis/soul.json';
import {GM_CONTRACT} from '@/configs';
import {useContract} from '@/hooks/useContract';
import {useWeb3React} from '@web3-react/core';
import {useCallback} from 'react';

const useGMBalanceOf = () => {

    const contract = useContract(GM_CONTRACT, Erc20Json.abi, false);
    const {account, provider} = useWeb3React();

    const call = useCallback(
        async (): Promise<number> => {
            if (account && provider && contract) {
                const balanceData = await contract.balanceOf(account);
                return balanceData / 1e18;
            }
            return 0;
        },
        [account, provider, contract]
    );

    return {
        call
    };
};

export default useGMBalanceOf;
