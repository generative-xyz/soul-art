import { useCallback, useState } from 'react';

const useForceUpdate = () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [, updateState] = useState<any>();
  const forceUpdate: any = useCallback(() => updateState({}), []);

  return forceUpdate;
};

export default useForceUpdate;
