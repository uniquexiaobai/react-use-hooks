import { useState } from 'react';

const useBoolean = (
  initialValue: boolean
): [boolean, (x?: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (forceValue?: boolean) => {
    if (typeof forceValue === 'boolean') {
      setValue(forceValue);
    } else {
      setValue(!value);
    }
  };

  return [value, toggle];
};

export default useBoolean;
