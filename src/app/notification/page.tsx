"use client";

import Footer from "@/component/report/footer/table";
import Header from "@/component/report/header/table";
import Kit from "@/component/report/kit/table";
import React, { useState } from "react";
import { usePDF } from "react-to-pdf";

const Notification = () => {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  return (
    <div className="flex flex-col gap-4 mb-10">
      <button
      onClick={() => toPDF()}
      className="border p-4 bg-black text-white w-40">Download PDF</button>
      <div ref={targetRef} className="space-y-10 mr-20">
        <Header triggerUpdate={triggerUpdate} />
        <Footer triggerUpdate={triggerUpdate} />
        <Kit />
      </div>
    </div>
  );
};

export default Notification;
