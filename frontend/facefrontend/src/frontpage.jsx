// // import React, { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";

// // const Front = () => {
// //   const [recognizedName, setRecognizedName] = useState("USN will appear here");
// //   const [recognizedStudentName, setRecognizedStudentName] = useState("Name will appear here");
// //   const [attendanceMessage, setAttendanceMessage] = useState(""); 
// //   const [students, setStudents] = useState([]);
// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);

// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:5001/api/students",);
// //         setStudents(response.data);
// //       } catch (err) {
// //         console.error("Error fetching students:", err);
// //       }
// //     };

// //     fetchStudents();
// //   }, []);

// //   useEffect(() => {
// //     const getCamera = async () => {
// //       try {
// //         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //         videoRef.current.srcObject = stream;
// //       } catch (err) {
// //         console.error("Camera access error:", err);
// //       }
// //     };

// //     getCamera();
// //   }, []);

// //   const handleRecognize = async () => {
// //     const canvas = canvasRef.current;
// //     const context = canvas.getContext("2d");
// //     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
// //     const imageData = canvas.toDataURL("image/jpeg");
  
// //     try {
// //       const response = await axios.post("http://localhost:5050/recognize", { image: imageData })// sending the image data
        
// //       const usn = response.data.usn;
  
// //       setRecognizedName(usn);
  
// //       const matchedStudent = students.find((student) => student.usn === usn);
// //       if (matchedStudent) {
// //         setRecognizedStudentName(matchedStudent.name);
// //       } else {
// //         setRecognizedStudentName("Not found");
// //       }
  
// //       const recognizedAt = new Date().toISOString(); // Always send recognizedAt
// //       const currentPeriod = getCurrentPeriod();
  
// //       if (currentPeriod === 'No Period') {
// //         setAttendanceMessage("Attendance cannot be recorded outside of class periods.");
// //         return;
// //       }
  
// //       // Submit period-wise attendance
// //       try {
// //         const res = await axios.post("http://localhost:5001/api/periodwise-attendance", {
// //           usn,
// //           recognizedAt
// //         });
// //         alert(res.data.message);
// //         setAttendanceMessage(`${currentPeriod} attendance successfully recorded.`);
// //       } catch (err) {
// //         alert(err.response?.data?.message || "Something went wrong");
// //         setAttendanceMessage("Failed to record attendance.");
// //       }
  
// //     } catch (err) {
// //       console.error(err);
// //       setRecognizedName("Error recognizing");
// //       setRecognizedStudentName("Recognition failed");
// //       setAttendanceMessage("Error in recognition or attendance.");
// //     }
// //   };
  
  

// // function getCurrentPeriod() {
// //   const now = new Date();
// //   const hours = now.getHours();
// //   const minutes = now.getMinutes();

// //  if (hours >= 9 && hours < 10) {
// //     return 'Java';
// //   } else if (hours === 10 && minutes >= 10) {
// //     return 'Python';
// //   } else if (hours === 11 && minutes >= 20) {
// //     return 'Networking';
// //   } else if (hours === 12 && minutes >= 10) {
// //     return 'AI/ML';
// //   } else if (hours === 20 && minutes >= 30 || (hours === 20 && minutes < 60)) {
// //     return 'React'; 
// //   } 

  
// //   return 'No Period';
  
// // }

  

// //   return (
// //     <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
// //       <div className="flex h-full items-center justify-center">
// //         <div className="flex flex-col sm:flex-row gap-5 w-full h-[80vh] p-5">
// //           <div className="w-1/2 h-full flex items-center justify-center">
// //             <div className="w-full max-w-2xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border-2 border-[#E8E4FF]">
// //               <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
// //               <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
// //             </div>
// //           </div>

// //           <div className="w-1/2 h-full flex flex-col items-center justify-center text-center">
// //             <h1 className="text-5xl font-bold text-white drop-shadow-md mb-6">
// //               Smart Attendance System
// //             </h1>

// //             <div className="mt-5 text-2xl font-medium text-gray-300">
// //               Recognized USN: <span className="text-emerald-400 font-bold">{recognizedName}</span>
// //             </div>
// //             <div className="mt-5 text-2xl font-medium text-gray-300">
// //               Recognized Student Name: <span className="text-emerald-400 font-bold">{recognizedStudentName}</span>
// //             </div>

// //             {/* Display the attendance message */}
// //             {attendanceMessage && (
// //               <div className="mt-5 text-lg font-medium text-yellow-300">
// //                 {attendanceMessage}
// //               </div>
// //             )}
// // <div className="flex flex-row gap-3">
// // <button
// //               onClick={handleRecognize}
// //               className="mt-8 transition-background inline-flex h-12 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
// //             >
// //               Recognize Face
// //             </button>

// //             <Link to="/Signin">
// //               <button className="mt-8 transition-background inline-flex h-12 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
// //                 Dashboard
// //               </button>
// //             </Link>
// // </div>
            
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Front;

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Front = () => {
//   const [recognizedName, setRecognizedName] = useState("USN will appear here");
//   const [recognizedStudentName, setRecognizedStudentName] = useState("Name will appear here");
//   const [attendanceMessage, setAttendanceMessage] = useState(""); 
//   const [students, setStudents] = useState([]);
//   const [networkStatus, setNetworkStatus] = useState(window.navigator.onLine ? "Online" : "Offline");
//   const [loading, setLoading] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/students");
//         setStudents(response.data);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//       }
//     };

//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     const getCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.error("Camera access error:", err);
//       }
//     };

//     getCamera();
//   }, []);

//   // Network status effect
//   useEffect(() => {
//     const updateNetworkStatus = () => {
//       setNetworkStatus(window.navigator.onLine ? "Online" : "Offline");
//     };
//     window.addEventListener("online", updateNetworkStatus);
//     window.addEventListener("offline", updateNetworkStatus);
//     return () => {
//       window.removeEventListener("online", updateNetworkStatus);
//       window.removeEventListener("offline", updateNetworkStatus);
//     };
//   }, []);

//   const handleRecognize = async () => {
//     setLoading(true);
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL("image/jpeg");
  
//     try {
//       const response = await axios.post("http://localhost:5050/recognize", { image: imageData });
//       const usn = response.data.usn;
//       setRecognizedName(usn);

//       const matchedStudent = students.find((student) => student.usn === usn);
//       if (matchedStudent) {
//         setRecognizedStudentName(matchedStudent.name);
//       } else {
//         setRecognizedStudentName("Not found");
//       }

//       const recognizedAt = new Date().toISOString();
//       const currentPeriod = getCurrentPeriod();

//       if (currentPeriod === 'No Period') {
//         setAttendanceMessage("Attendance cannot be recorded outside of class periods.");
//         setLoading(false);
//         return;
//       }

//       // Submit period-wise attendance
//       try {
//         const res = await axios.post("http://localhost:5001/api/periodwise-attendance", {
//           usn,
//           recognizedAt
//         });
//         alert(res.data.message);
//         setAttendanceMessage(`${currentPeriod} attendance successfully recorded.`);
//       } catch (err) {
//         alert(err.response?.data?.message || "Something went wrong");
//         setAttendanceMessage("Failed to record attendance.");
//       }
//     } catch (err) {
//       console.error(err);
//       setRecognizedName("Error recognizing");
//       setRecognizedStudentName("Recognition failed");
//       setAttendanceMessage("Error in recognition or attendance.");
//     }
//     setLoading(false);
//   };

//   function getCurrentPeriod() {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();

//   //   if (hours >= 9 && hours < 10) {
//   //     return 'Java';
//   //   } else if (hours === 10 && minutes >= 10) {
//   //     return 'Python';
//   //   } else if (hours === 11 && minutes >= 20) {
//   //     return 'Networking';
//   //   } else if (hours === 12 && minutes >= 30) {
//   //     return 'AI/ML';
//   //   } else if (hours === 20 && minutes >= 30 || (hours === 20 && minutes < 60)) {
//   //     return 'React'; 
//   //   } 
//   //   return 'No Period';
//   // }

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Front = () => {
//   const [recognizedName, setRecognizedName] = useState("USN will appear here");
//   const [recognizedStudentName, setRecognizedStudentName] = useState("Name will appear here");
//   const [attendanceMessage, setAttendanceMessage] = useState(""); 
//   const [students, setStudents] = useState([]);
//   const [networkStatus, setNetworkStatus] = useState(window.navigator.onLine ? "Online" : "Offline");
//   const [loading, setLoading] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/students");
//         setStudents(response.data);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//       }
//     };

//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     const getCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.error("Camera access error:", err);
//       }
//     };

//     getCamera();
//   }, []);

//   // Network status effect
//   useEffect(() => {
//     const updateNetworkStatus = () => {
//       setNetworkStatus(window.navigator.onLine ? "Online" : "Offline");
//     };
//     window.addEventListener("online", updateNetworkStatus);
//     window.addEventListener("offline", updateNetworkStatus);
//     return () => {
//       window.removeEventListener("online", updateNetworkStatus);
//       window.removeEventListener("offline", updateNetworkStatus);
//     };
//   }, []);

//   const handleRecognize = async () => {
//     setLoading(true);
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL("image/jpeg");
  
//     try {
//       const response = await axios.post("http://localhost:5050/recognize", { image: imageData });
//       const usn = response.data.usn;
//       setRecognizedName(usn);

//       const matchedStudent = students.find((student) => student.usn === usn);
//       if (matchedStudent) {
//         setRecognizedStudentName(matchedStudent.name);
//       } else {
//         setRecognizedStudentName("Not found");
//       }

//       const recognizedAt = new Date().toISOString();
//       const currentPeriod = getCurrentPeriod();

//       if (currentPeriod === 'No Period') {
//         setAttendanceMessage("Attendance cannot be recorded outside of class periods.");
//         setLoading(false);
//         return;
//       }

//       // Submit period-wise attendance
//       try {
//         const res = await axios.post("http://localhost:5001/api/periodwise-attendance", {
//           usn,
//           recognizedAt
//         });
//         alert(res.data.message);
//         setAttendanceMessage(`${currentPeriod} attendance successfully recorded.`);
//       } catch (err) {
//         alert(err.response?.data?.message || "Something went wrong");
//         setAttendanceMessage("Failed to record attendance.");
//       }
//     } catch (err) {
//       console.error(err);
//       setRecognizedName("Error recognizing");
//       setRecognizedStudentName("Recognition failed");
//       setAttendanceMessage("Error in recognition or attendance.");
//     }
//     setLoading(false);
//   };

//   function getCurrentPeriod() {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();

//   //   if (hours >= 9 && hours < 10) {
//   //     return 'Java';
//   //   } else if (hours === 10 && minutes >= 10) {
//   //     return 'Python';
//   //   } else if (hours === 11 && minutes >= 20) {
//   //     return 'Networking';
//   //   } else if (hours === 12 && minutes >= 30) {
//   //     return 'AI/ML';
//   //   } else if (hours === 20 && minutes >= 30 || (hours === 20 && minutes < 60)) {
//   //     return 'React'; 
//   //   } 
//   //   return 'No Period';
//   // }

//   if (hours === 8 && minutes >= 55) return 'React';        // 8:55 AM - 8:59 AM
//   if (hours === 10 && minutes < 10) return 'Java';         // 10:00 AM - 10:09 AM
//   if (hours === 10 && minutes >= 10 && minutes < 30) return 'Python'; // 10:10 AM - 10:29 AM
//   if (hours === 10 && minutes >= 30) return 'AI/ML';       // 10:30 AM - 10:59 AM
//   if (hours === 12 && minutes >= 20) return 'Networking';  // 12:20 AM onwards
//  return 'No Period';

//   return (
//     <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
//       <div className="flex h-full items-center justify-center">
//         <div className="flex flex-col sm:flex-row gap-5 w-full h-[80vh] p-5">
//           <div className="w-1/2 h-full flex items-center justify-center">
//             <div className="w-full max-w-2xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border-2 border-[#E8E4FF]">
//               <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
//               <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
//             </div>
//           </div>

//           <div className="w-1/2 h-full flex flex-col items-center justify-center text-center">
//             <h1 className="text-5xl font-bold text-white drop-shadow-md mb-6">
//               Smart Attendance System
//             </h1>

//             {/* Network Status Tab */}
//             <div className={`mb-4 px-4 py-2 rounded-xl font-semibold ${networkStatus === "Online" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
//               Network Status: {networkStatus}
//             </div>

//             <div className="mt-5 text-2xl font-medium text-gray-300">
//               Recognized USN: <span className="text-emerald-400 font-bold">{recognizedName}</span>
//             </div>
//             <div className="mt-5 text-2xl font-medium text-gray-300">
//               Recognized Student Name: <span className="text-emerald-400 font-bold">{recognizedStudentName}</span>
//             </div>

//             {/* Display the attendance message */}
//             {attendanceMessage && (
//               <div className="mt-5 text-lg font-medium text-yellow-300">
//                 {attendanceMessage}
//               </div>
//             )}
//             <div className="flex flex-row gap-3">
//               <button
//                 onClick={handleRecognize}
//                 disabled={loading}
//                 className="mt-8 transition-background inline-flex h-12 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
//               >
//                 {loading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin h-5 w-5 mr-2 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
//                     </svg>
//                     Recognizing...
//                   </span>
//                 ) : (
//                   "Recognize Face"
//                 )}
//               </button>

//               <Link to="/Signin">
//                 <button className="mt-8 transition-background inline-flex h-12 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
//                   Dashboard
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



//   return (
//     <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
//       <div className="flex h-full items-center justify-center">
//         <div className="flex flex-col sm:flex-row gap-5 w-full h-[80vh] p-5">
//           <div className="w-1/2 h-full flex items-center justify-center">
//             <div className="w-full max-w-2xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border-2 border-[#E8E4FF]">
//               <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
//               <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
//             </div>
//           </div>

//           <div className="w-1/2 h-full flex flex-col items-center justify-center text-center">
//             <h1 className="text-5xl font-bold text-white drop-shadow-md mb-6">
//               Smart Attendance System
//             </h1>

//             {/* Network Status Tab */}
//             <div className={`mb-4 px-4 py-2 rounded-xl font-semibold ${networkStatus === "Online" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
//               Network Status: {networkStatus}
//             </div>

//             <div className="mt-5 text-2xl font-medium text-gray-300">
//               Recognized USN: <span className="text-emerald-400 font-bold">{recognizedName}</span>
//             </div>
//             <div className="mt-5 text-2xl font-medium text-gray-300">
//               Recognized Student Name: <span className="text-emerald-400 font-bold">{recognizedStudentName}</span>
//             </div>

//             {/* Display the attendance message */}
//             {attendanceMessage && (
//               <div className="mt-5 text-lg font-medium text-yellow-300">
//                 {attendanceMessage}
//               </div>
//             )}
//             <div className="flex flex-row gap-3">
//               <button
//                 onClick={handleRecognize}
//                 disabled={loading}
//                 className="mt-8 transition-background inline-flex h-12 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
//               >
//                 {loading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin h-5 w-5 mr-2 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
//                     </svg>
//                     Recognizing...
//                   </span>
//                 ) : (
//                   "Recognize Face"
//                 )}
//               </button>

//               <Link to="/Signin">
//                 <button className="mt-8 transition-background inline-flex h-12 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
//                   Dashboard
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Front;


import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Front = () => {
  const [recognizedName, setRecognizedName] = useState("USN will appear here");
  const [recognizedStudentName, setRecognizedStudentName] = useState("Name will appear here");
  const [attendanceMessage, setAttendanceMessage] = useState(""); 
  const [students, setStudents] = useState([]);
  const [networkStatus, setNetworkStatus] = useState(window.navigator.onLine ? "Online" : "Offline");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/students");
        setStudents(response.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };
    getCamera();
  }, []);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setNetworkStatus(window.navigator.onLine ? "Online" : "Offline");
    };
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);
    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  const handleRecognize = async () => {
    setLoading(true);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");
  
    try {
      const response = await axios.post("http://localhost:5050/recognize", { image: imageData });
      const usn = response.data.usn;
      setRecognizedName(usn);

      const matchedStudent = students.find((student) => student.usn === usn);
      if (matchedStudent) {
        setRecognizedStudentName(matchedStudent.name);
      } else {
        setRecognizedStudentName("Not found");
      }

      const recognizedAt = new Date().toISOString();
      const currentPeriod = getCurrentPeriod();

      if (currentPeriod === 'No Period') {
        setAttendanceMessage("Attendance cannot be recorded outside of class periods.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post("http://localhost:5001/api/periodwise-attendance", {
          usn,
          recognizedAt
        });
        alert(res.data.message);
        setAttendanceMessage(`${currentPeriod} attendance successfully recorded.`);
      } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
        setAttendanceMessage("Failed to record attendance.");
      }
    } catch (err) {
      console.error(err);
      setRecognizedName("Error recognizing");
      setRecognizedStudentName("Recognition failed");
      setAttendanceMessage("Error in recognition or attendance.");
    }
    setLoading(false);
  };

  function getCurrentPeriod() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Example intervals (customize as needed)
    if (hours === 8 && minutes >= 55 && minutes <= 59) return 'React';        // 8:55 AM - 8:59 AM
    if (hours === 10 && minutes >= 5 && minutes <= 55) return 'Java';         // 10:05 AM - 10:55 AM
    if (hours === 11 && minutes >= 5 && minutes <= 55) return 'Python';       // 11:05 AM - 11:55 AM
    if (hours === 12 && minutes >= 5 && minutes <= 55) return 'AI/ML';        // 12:05 PM - 12:55 PM
    if (hours === 13 && minutes >= 5 && minutes <= 55) return 'Networking';   // 1:05 PM - 1:55 PM

    return 'No Period';
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col sm:flex-row gap-5 w-full h-[80vh] p-5">
          <div className="w-1/2 h-full flex items-center justify-center">
            <div className="w-full max-w-2xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border-2 border-[#E8E4FF]">
              <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
              <canvas ref={canvasRef} width="640" height="480" className="hidden"></canvas>
            </div>
          </div>

          <div className="w-1/2 h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-bold text-white drop-shadow-md mb-6">
              Smart Attendance System
            </h1>

            {/* Network Status Tab */}
            <div className={`mb-4 px-4 py-2 rounded-xl font-semibold ${networkStatus === "Online" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
              Network Status: {networkStatus}
            </div>

            <div className="mt-5 text-2xl font-medium text-gray-300">
              Recognized USN: <span className="text-emerald-400 font-bold">{recognizedName}</span>
            </div>
            <div className="mt-5 text-2xl font-medium text-gray-300">
              Recognized Student Name: <span className="text-emerald-400 font-bold">{recognizedStudentName}</span>
            </div>

            {/* Display the attendance message */}
            {attendanceMessage && (
              <div className="mt-5 text-lg font-medium text-yellow-300">
                {attendanceMessage}
              </div>
            )}
            <div className="flex flex-row gap-3">
              <button
                onClick={handleRecognize}
                disabled={loading}
                className="mt-8 transition-background inline-flex h-12 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Recognizing...
                  </span>
                ) : (
                  "Recognize Face"
                )}
              </button>

              <Link to="/Signin">
                <button className="mt-8 transition-background inline-flex h-12 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;