import { ROUTE_PATH } from '@/constants/route-path';
import logger from '@/services/logger';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { ISoul } from '@/interfaces/api/soul';
import { getSoulDetail } from '@/services/soul';

const SoulItem = ({ data }: { data?: ISoul }) => {
  const router = useRouter();
  const { tokenId } = router.query as {
    tokenId: string;
  };
  const [soulDetail, setSoulDetail] = useState<ISoul | undefined>(data);

  useEffect(() => {
    if (!data) {
      fetchSoulDetail();
    }
  }, [data]);

  const fetchSoulDetail = async () => {
    try {
      const data = await getSoulDetail({
        tokenId: tokenId,
      });
      setSoulDetail(data);
    } catch (error) {
      logger.error(error);
      router.push(ROUTE_PATH.NOT_FOUND);
    }
  };

  if (!soulDetail) {
    return (
      <div className="grid-center h-full-view">
        <Spinner></Spinner>;
      </div>
    );
  }

  return (
    <>
      <img src={soulDetail.image} />
    </>
  );
};

export default React.memo(SoulItem);
