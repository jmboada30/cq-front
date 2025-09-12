import CryptoJS from 'crypto-js';

const useCryptoJS = () => {
  const Key = process.env.SECRET_KEY as string;

  const encryptDataCryptoJS = <T>(data: T, key: string = Key): string => {
    try {
      const jsonData = JSON.stringify(data);
      return CryptoJS.AES.encrypt(jsonData, key).toString();
    } catch {
      throw new Error(
        'Error al encriptar los datos, verifique los datos ingresados o la clave de encriptación.',
      );
    }
  };

  const decryptDataCryptoJS = <T>(data: string, key: string = Key): T => {
    try {
      const bytes = CryptoJS.AES.decrypt(data, key);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch {
      throw new Error(
        'Error al desencriptar los datos, verifique los datos ingresados o la clave de encriptación.',
      );
    }
  };

  return {
    encryptDataCryptoJS,
    decryptDataCryptoJS,
  };
};

export default useCryptoJS;
