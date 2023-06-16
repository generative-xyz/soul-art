import {camelCaseKeys} from '@/utils/helpers';
import {apiClient} from '.';
import {constructURL} from '@/utils/url';
import {ISoul} from '@/interfaces/api/soul';
import {IAttribute} from '@/interfaces/attributes';
import {SOUL_CONTRACT} from '@/configs';

const API_PATH = '/soul';

export const getSoulsNfts = async ({
                                       attributes,
                                       limit = 10,
                                       page = 1,
                                       owner = '',
                                       isShowAll,
                                       isBigFile,
                                       sortBy,
                                       sort,
                                   }: {
    attributes?: string;
    limit?: number;
    page?: number;
    owner?: string;
    isShowAll?: boolean;
    isBigFile?: boolean;
    sortBy?: string;
    sort?: number;
}): Promise<ISoul[]> => {
    const url = constructURL(`${API_PATH}/nfts`, {
        limit,
        page,
        owner,
        allow_empty: isShowAll,
        is_big_file: isBigFile,
        sort_by: sortBy,
        sort,
    });

    const res = await apiClient.get(url, {
        params: {
            attributes: attributes ? encodeURI(attributes) : undefined,
        },
    });
    return Object(camelCaseKeys(res));
};

export const getSoulDetail = async ({
                                        tokenId,
                                    }: {
    tokenId: string;
}): Promise<ISoul> => {
    const res = await apiClient.get(`${API_PATH}/nfts/${tokenId}`);
    return Object(camelCaseKeys(res));
};

export const getSoulAttributes = async (): Promise<IAttribute[]> => {
    const res = await apiClient.get(
        `/marketplace/collections/${SOUL_CONTRACT}/attributes`
    );
    return Object(camelCaseKeys(res));
};

export const getListContractNFTsByToken = async (
    token_id: string
): Promise<ISoul[]> => {
    const res = await apiClient.get(
        `/marketplace/collections/${SOUL_CONTRACT}/nfts`,
        {params: {token_id}}
    );
    return Object(camelCaseKeys(res));
};

export const getListTokensByWallet = async (walletAddress: string): Promise<any> => {
    const res = await apiClient.get(`/marketplace/collections/0x85802F1f36F549334EeeEf6715Ed16555ed7178b/nfts?owner=${walletAddress}`);
    return Object(camelCaseKeys(res));
}
