// import { Peer } from "peerjs";
// import { IoCall } from "react-icons/io5";
// import { FaMicrophone } from "react-icons/fa";
// import { LuScreenShare } from "react-icons/lu";
// import { BsCameraVideoOffFill } from "react-icons/bs";
// import { useParams } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

// function VideoScreen({ isStudent }) {
//   const PRE = "DELTA";
//   const SUF = "MEET";
//   var room_id;
//   var getUserMedia =
//     navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia;
//   var local_stream;
//   var screenStream;
//   var peer = null;
//   var currentPeer = null;
//   var screenSharing = false;
//   function createRoom() {
//     console.log("Creating Room");
//     let room = "12";
//     if (room == " " || room == "") {
//       alert("Please enter room number");
//       return;
//     }
//     room_id = PRE + room + SUF;
//     peer = new Peer(room_id);
//     peer.on("open", (id) => {
//       console.log("Peer Connected with ID: ", id);

//       getUserMedia(
//         { video: true, audio: true },
//         (stream) => {
//           local_stream = stream;
//           setLocalStream(local_stream);
//         },
//         (err) => {
//           console.log(err);
//         }
//       );
//     });
//     peer.on("call", (call) => {
//       call.answer(local_stream);
//       call.on("stream", (stream) => {
//         setRemoteStream(stream);
//       });
//       currentPeer = call;
//     });
//   }

//   function setLocalStream(stream) {
//     let video = document.getElementById("local-video");
//     video.srcObject = stream;
//     video.muted = true;
//     video.play();
//   }
//   function setRemoteStream(stream) {
//     let video = document.getElementById("remote-video");
//     video.srcObject = stream;
//     video.play();
//   }

//   function joinRoom() {
//     console.log("Joining Room");
//     let room = "12";
//     if (room == " " || room == "") {
//       alert("Please enter room number");
//       return;
//     }
//     room_id = PRE + room + SUF;

//     peer = new Peer();
//     peer.on("open", (id) => {
//       console.log("Connected with Id: " + id);
//       getUserMedia(
//         { video: true, audio: true },
//         (stream) => {
//           local_stream = stream;
//           setLocalStream(local_stream);

//           let call = peer.call(room_id, stream);
//           call.on("stream", (stream) => {
//             setRemoteStream(stream);
//           });
//           currentPeer = call;
//         },
//         (err) => {
//           console.log(err);
//         }
//       );
//     });
//   }

//   function startScreenShare() {
//     if (screenSharing) {
//       stopScreenSharing();
//     }
//     navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
//       screenStream = stream;
//       let videoTrack = screenStream.getVideoTracks()[0];
//       videoTrack.onended = () => {
//         stopScreenSharing();
//       };
//       if (peer) {
//         let sender = currentPeer.peerConnection.getSenders().find(function (s) {
//           return s.track.kind == videoTrack.kind;
//         });
//         sender.replaceTrack(videoTrack);
//         screenSharing = true;
//       }
//       console.log(screenStream);
//     });
//   }

//   function stopScreenSharing() {
//     if (!screenSharing) return;
//     let videoTrack = local_stream.getVideoTracks()[0];
//     if (peer) {
//       let sender = currentPeer.peerConnection.getSenders().find(function (s) {
//         return s.track.kind == videoTrack.kind;
//       });
//       sender.replaceTrack(videoTrack);
//     }
//     screenStream.getTracks().forEach(function (track) {
//       track.stop();
//     });
//     screenSharing = false;
//   }

//   return (
//     // <div className="bg-[#09090B] w-screen h-screen">
//       {/* <p id="notification"></p>

//       {isStudent && joinRoom()}

//       {!isStudent && createRoom()}

//       <div className="meet-area flex justify-center mt-[px]">
//         <video
//           id={"remote-video"}
//           className=" bg-[#18181B]  w-5/12  rounded-3xl min-h-[600px] max-h-[700px] mt-12"
//         ></video>
//       </div>
//       <video
//         id={"local-video"}
//         className=" bg-[#18181B]  absolute rounded-3xl  bottom-10  left-5 w-[400px] "
//       ></video>
//       <div className="flex w-screen justify-center space-x-10 absolute bottom-11">
//         <div className="bg-[#3C4043] p-2.5 rounded-full">
//           <FaMicrophone className="text-white text-4xl" />
//         </div>
//         <div className="bg-[#3C4043] p-2.5 rounded-full">
//           <IoCall className="text-red-700 text-4xl " />
//         </div>
//         <div
//           className="bg-[#3C4043] p-2.5 rounded-full"
//           onClick={startScreenShare}
//         >
//           <LuScreenShare className="text-white text-4xl " />
//         </div>
//         <div className="bg-[#3C4043] p-2.5 rounded-full">
//           <BsCameraVideoOffFill className="text-white text-4xl " />
//         </div>
//       </div> */}
//     // </div>
//   );
// }

// export default VideoScreen;
