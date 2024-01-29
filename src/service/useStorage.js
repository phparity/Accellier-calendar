import { useData } from './DataContex';

const useStorage = () => {
  const { data, setData } = useData();
  const getData = (key) => {
    return data[key];
  };
  const saveData = (key, value) => {
    setData(key, value);
  };
  const clearData = () => {
    setData("C_DATA","C_DATA")
  }

  return {
    getData,
    saveData,
    clearData
  };
};

export default useStorage;
