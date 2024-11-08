import React, { useEffect, useState } from 'react'
import "./App.css"




function Box({playingas,setplayingas,id,socket,setgamestate,gamestate,checkwin,finishedarraystate,isfinished,setisfinished,currentplayer,setcurrentplayer}) {
    const circleSvg = (
<svg
  width="192"
  height="192"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
    stroke="#ffffff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

      );  
      const crossSvg = (
        <svg
        width="192"
        height="192"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 5L5 19M5 5L19 19"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      );


      const [icon,seticon] = useState(null)

      useEffect(()=>{
        socket?.on("restarting",()=>{
          seticon(null)
        })
      },[])
      

      const clickonsquare = ()=>{
        if(isfinished){
            return
        }
        if(playingas == currentplayer &&gamestate.flat()[id]!="circle" && gamestate.flat()[id]!="cross"){
          
          if(!icon){
            if(currentplayer == "circle"){   
              seticon(circleSvg)
            }else{
              seticon(crossSvg)
            }
          }
          socket.emit("currentplayer", currentplayer)
            const newsstate = [...gamestate];
            let rowindex = Math.floor(id / 3);
            let colindex = id % 3;
            newsstate[rowindex][colindex] = currentplayer;
            setgamestate(newsstate); 
        socket?.emit("movefromplayer",gamestate)

        
      }
      }


    useEffect(()=>{
        let winner = checkwin()
        if (winner){   
            setisfinished(winner)            
        }
        if(gamestate.flat()[id] == "circle"){
          seticon(circleSvg)
        }
        if(gamestate.flat()[id] == "cross"){
            seticon(crossSvg)
        }
        
        
        
    },[gamestate])

  return (
    <div onClick={clickonsquare} className={` ${finishedarraystate.includes(id) ? (isfinished == "circle"?"circwin":"crswon") :"box"}  ${isfinished =="draw" ? "drawhai":""}  rounded-xl ${isfinished ? "opop" : "box"} changewh h-[150px] w-[150px] flex items-center justify-center`}>{icon}</div>
  )
}

export default Box