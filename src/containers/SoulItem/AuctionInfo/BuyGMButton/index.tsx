import { BUY_GM_URL } from '@/configs';
import Link from 'next/link';
import React from 'react';
import s from './styles.module.scss';

const BuyGMButton: React.FC = (): React.ReactElement => {
  return (
    <Link className={s.buyGmBtn} href={BUY_GM_URL} target='_blank'>
      Buy GM
    </Link>
  )
}

export default React.memo(BuyGMButton);
