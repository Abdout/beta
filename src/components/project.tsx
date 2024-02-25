// "use client";
// import { useGlobalState } from "@/provider/global";
// // import formatDate from "@/util/formatDate";
// import React from "react";
// import SmIcon from "@/component/atom/icon/sm";
// // import Edit from "./modal/edit";
// import Modal from "@/component/atom/modal/modal";
// import CreateContent from "../component/modal/project/edit";

// interface Props {
//   title: string;
//   description: string;
//   date: string;
//   isCompleted: boolean;
//   id: string;
// }

// function TaskItem({ title, description, date, isCompleted, id }: Props) {
//   const { theme, deleteTask, updateTask, openModal, modal } = useGlobalState();
//   return (
//     <div className="flex flex-col gap-2 p-4 mt-4 w-[16rem] h-[12rem] bg-[#fcfcfc] border hover:border-black">
//       {modal && <Modal content={<CreateContent />} />}
//       <h1>{title}</h1>
//       <p className=" text-gray-600 dark:text-gray-300">{description}</p>
//       {/* <p className="text-sm text-gray-500">{formatDate(date)}</p> */}
//       <div>
//         {isCompleted ? (
//           <div className="flex items-center">
//             <span className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></span>
//             <button
//               onClick={() => {
//                 const task = {
//                   id,
//                   isCompleted: !isCompleted,
//                 };

//                 updateTask(task);
//               }}
//             >
//               Done
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center">
//             <span className="inline-block w-4 h-4 mr-2 bg-red-600 rounded-full"></span>
//             <button
//               onClick={() => {
//                 const task = {
//                   id,
//                   isCompleted: !isCompleted,
//                 };

//                 updateTask(task);
//               }}
//             >
//               Stuck
//             </button>
//           </div>
//         )}

//         {/* <div className="flex justify-start items-center gap-2">
//           <Icon icon="ph:folder-simple-thin" width={30} />
//           <h4>Docs</h4>
//         </div> */}

//         <div className="flex gap-2 justify-end">
//           <button>
//             <SmIcon src="/edit.png" alt="Edit" path="" onClick={openModal} />
//           </button>
//           <button
//             className="delete"
//             onClick={() => {
//               deleteTask(id);
//             }}
//           >
//             <SmIcon src="/delete.png" alt="Delete" path="" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TaskItem;
