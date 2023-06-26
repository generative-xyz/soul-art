import React from "react";
import s from './styles.module.scss';

const INTERACTION_DATA = [
  {
    keyText: 'i',
    keyDesc: 'Show/hide technical information.',
  },
  {
    keyText: 'u',
    keyDesc: 'Update the AI mode',
  },
  {
    keyText: 'b',
    keyDesc: 'Hide/show borders',
  },
  {
    keyText: 'k',
    keyDesc: 'Save the hi-res image of the Soul to your computer',
  },
  {
    keyText: 's',
    keyDesc: 'Save the screenshot of the Soul to your computer',
  },
];

const TabInteraction: React.FC = (): React.ReactElement => {
  return (
    <>
      {INTERACTION_DATA.map((interData, index) => (
        <div className={s.tabInter} key={index}>
          <div className={s.tabInterKeyText}>
            {interData.keyText}
          </div>
          <div className={s.tabInterKeyDesc}>
            {interData.keyDesc}
          </div>
        </div>
      ))}
    </>
  );
};

export default React.memo(TabInteraction);
