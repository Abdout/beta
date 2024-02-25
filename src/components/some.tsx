// // SomeComponent.tsx
// 'use client';
// import React, { useState } from 'react';
// import Modal from '@/components/modal';
// import AddTopic from '@/app/header/page';




// const SomeComponent: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={handleOpen} className='w-40 h-40 p-4 border'>Open Modal</button>
//       <Modal isOpen={isOpen} onClose={handleClose}>
//         <AddTopic />
//       </Modal>
//     </div>
//   );
// };

// export default SomeComponent;