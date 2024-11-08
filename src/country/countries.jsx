import { useEffect, useState } from "react";

const Card = ({flag,name}) => {
    return <div style={{display:"flex",
        flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    border:"2px solid black",
    borderRadius:"5px",
    padding:"20px",
    width:"200px",
    height:"200px"}}>
        <img src={flag} alt="countryflag" style={{
            width:"100px",height:"100px"
        }}/>
        <h2>{name}</h2>
    </div>
};




function Countries(){
    const API_ENDPOINT =" https://xcountries-backend.azurewebsites.net/all "
    const [countries,setcountries]=useState([])
    console.log(countries);
    useEffect(() =>{
        fetch(API_ENDPOINT).then(res => res.json()).then(data => setcountries(data)).catch()
    },[])
    return (
        <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
        {countries.map(({flag,name}) => (
            <Card key={name} flag={flag} name={name}/>
            ))}
    </div>
    );
}

export default Countries