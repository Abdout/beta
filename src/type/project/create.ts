import { SelectOption } from "@/component/atom/select/select";

export interface CreateState {
    customer: string;
    location: string;
    consultant: string;
    client: string;
    voltages: { [key: string]: boolean };
    lvOptions: SelectOption[];
    mvOptions: SelectOption[];
    hvOptions: SelectOption[];
    evOptions: SelectOption[];
    lvSwgr: SelectOption[];
    lvTrafo: SelectOption[];
    lvRmu: SelectOption[];
    lvCable: SelectOption[];
    mvSwgr: SelectOption[];
    mvTrafo: SelectOption[];
    mvRmu: SelectOption[];
    mvCable: SelectOption[];
    hvSwgr: SelectOption[];
    hvTrafo: SelectOption[];
    hvRmu: SelectOption[];
    hvCable: SelectOption[];
    evSwgr: SelectOption[];
    evTrafo: SelectOption[];
    evRmu: SelectOption[];
    evCable: SelectOption[];
}

export interface CreateContextProps extends CreateState {
    setCustomer: (customer: string) => void;
    setLocation: (location: string) => void;
    setConsultant: (consultant: string) => void;
    setClient: (client: string) => void;
    setVoltages: (voltages: { [key: string]: boolean }) => void;
    setLvOptions: (lvOptions: SelectOption[]) => void;
    setMvOptions: (mvOptions: SelectOption[]) => void;
    setHvOptions: (hvOptions: SelectOption[]) => void;
    setEvOptions: (evOptions: SelectOption[]) => void;
    setLvSwgr: (lvSwgr: SelectOption[]) => void;
    setLvTrafo: (lvTrafo: SelectOption[]) => void;
    setLvRmu: (lvRmu: SelectOption[]) => void;
    setLvCable: (lvCable: SelectOption[]) => void;
    setMvSwgr: (mvSwgr: SelectOption[]) => void;
    setMvTrafo: (mvTrafo: SelectOption[]) => void;
    setMvRmu: (mvRmu: SelectOption[]) => void;
    setMvCable: (mvCable: SelectOption[]) => void;
    setHvSwgr: (hvSwgr: SelectOption[]) => void;
    setHvTrafo: (hvTrafo: SelectOption[]) => void;
    setHvRmu: (hvRmu: SelectOption[]) => void;
    setHvCable: (hvCable: SelectOption[]) => void;
    setEvSwgr: (evSwgr: SelectOption[]) => void;
    setEvTrafo: (evTrafo: SelectOption[]) => void;
    setEvRmu: (evRmu: SelectOption[]) => void;
    setEvCable: (evCable: SelectOption[]) => void;
}