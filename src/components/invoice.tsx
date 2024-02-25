"use client";
import { Select, SelectOption } from "@/component/atom/select/select";
import Volt from "@/component/project/home/step/volt";
import React, { useState } from "react";

const Invoice = () => {
  const [selectedOption, setSelectedOption] = useState<
    SelectOption[]>([]);

  const options: SelectOption[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    // Add more options as needed
  ];

  return (
    <div>
      <Volt />
      <Select
        multiple={true}
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
      />
    </div>
  );
};

export default Invoice;
