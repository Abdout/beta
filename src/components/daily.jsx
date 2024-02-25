'use client';


import FooterForm from '@/component/report/footer/form';
import HeaderForm from '@/component/report/header/form';
import KitForm from '@/component/report/kit/form';
import React, { useState } from 'react'

const Daily = () => {
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  return (
    <div className='space-y-10'> 
      
      <HeaderForm setTriggerUpdate={setTriggerUpdate} />
      <FooterForm setTriggerUpdate={setTriggerUpdate} />
      <KitForm setTriggerUpdate={setTriggerUpdate} />
    </div>
  )
}

export default Daily