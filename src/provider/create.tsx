'use client';
import { CreateContextProps, CreateState } from "@/type/project/create";
import { createContext, useState, useContext } from "react";

const CreateContext = createContext<CreateContextProps | undefined>(undefined);

export const useCreate = () => {
  const context = useContext(CreateContext);
  if (!context) {
    throw new Error('useCreate must be used within a CreateProvider');
  }
  return context;
};

export const CreateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: CreateState = {
    customer: "",
    location: "",
    consultant: "",
    client: "",
    voltages: { LV: false, MV: true, HV: false, EV: false },
    lvOptions: [],
    mvOptions: [],
    hvOptions: [],
    evOptions: [],
    lvSwgr: [],
    lvTrafo: [],
    lvRmu: [],
    lvCable: [],
    mvSwgr: [],
    mvTrafo: [],
    mvRmu: [],
    mvCable: [],
    hvSwgr: [],
    hvTrafo: [],
    hvRmu: [],
    hvCable: [],
    evSwgr: [],
    evTrafo: [],
    evRmu: [],
    evCable: [],
  };

  const stateAndSetters = Object.keys(initialState).reduce((acc, key) => {
    const [state, setter] = useState((initialState as any)[key]);
    return { ...acc, [key]: state, [`set${key.charAt(0).toUpperCase() + key.slice(1)}`]: setter };
  }, {});

  return (
    <CreateContext.Provider value={stateAndSetters as CreateContextProps}>
      {children}
    </CreateContext.Provider>
  );
};