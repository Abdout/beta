'use client';
import { FC, useState } from "react";
import XlIcon from "../atom/icon/xl";
import TextIcon from "../atom/icon/text";
import { docs } from "@/constant/kit";
import Image from "next/image";

interface KitDetial {
  src:string,
  alt: string,
  id: string,
  bg?: string
  calibration?: string,
  datasheet?: number,
  manual?: string,
  price?: string,
  status?: string,
  under?: string,
  km?: number,
  width?: number,
  licence?: string,
  penalty?: string,
}

interface Props {
  kit: KitDetial;
}

const Profile: FC<Props> = ({ kit }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);


  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6 pl-2">
            <XlIcon src={kit.src} alt={kit.alt}/>
            <div className="items-start justify-start flex flex-col space-y-1">
              <h3>{kit.alt}</h3>
              <h5>{kit.id}</h5>
              <h5>{kit.under}</h5>
              <h5>{kit.status}</h5>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
    {docs.map((data, index) => (
      <div className="relative" onClick={() => setSelectedItem(selectedItem === index ? null : index)} key={index}>
        <div className={`p-1 ${selectedItem === index ? 'bg-black text-[#fcfcfc]' : ''}`}>
          <TextIcon icon={data.icon} label={data.label} color={selectedItem === index ? '[#fcfcfc]' : (index === 2 ? 'yellow' : 'black')} />
        </div>
        </div>
    ))}
  </div>
      {/* <h1>{kit.id}</h1>
      <h1>{kit.sim}</h1>
      <h1>{kit.petrol}</h1>
      <h1>{kit.oil}</h1>
      <h1>{kit.history}</h1>
      <h1>{kit.status}</h1>
      <h1>{kit.under}</h1>
      <h1>{kit.km}</h1>
      <h1>{kit.width}</h1>
      <h1>{kit.licence}</h1>
      <h1>{kit.penalty}</h1> */}
    </div>
    
  );
};

export default Profile;