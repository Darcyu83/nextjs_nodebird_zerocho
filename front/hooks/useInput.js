import { useCallback, useState } from "react";

const useInput = (initialValue = null) => {
  const [value, setValue] = useState();

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, onChangeValue];
};

export default useInput;
