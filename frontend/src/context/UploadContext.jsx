import { createContext, useContext } from "react";
import useImageUpload from "@/hooks/useImageUpload";

const UploadContext = createContext();

export function UploadProvider({ children }) {
  const upload = useImageUpload();

  return (
    <UploadContext.Provider value={upload}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  return useContext(UploadContext);
}