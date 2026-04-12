
import React, { useEffect, useState } from "react";
import Card from "./Componants/Card";
import { getMovie } from "./Componants/Services/GetService";

export default function Movie() {
    const [data, setData] = useState([]);


  //
  const getMovieData = async () => {
    try {
      const res = await getMovie();
      console.log(res);
      setData(res.data)
     
    } catch (error) {
      console.log(error.data);
      console.log(error.message);
      console.log(error.status);
       
      
    }
  };
  useEffect(() => {
    getMovieData();
  }, []);
  return <div>
    {
        data.map((curEl)=>{
            return<Card key={curEl.id} movieData={curEl} ></Card>
        })
    }
  </div>;
}
