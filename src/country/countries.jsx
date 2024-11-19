import { useEffect, useState } from "react";
import "./country.css";

const Card = ({ flags, name }) => {
    return (
        <div
            className="countryCard"
        >
            <img
                src={flags?.png || "https://via.placeholder.com/100"} // Fallback to placeholder image
                alt="country flag"
                style={{
                    width: "100px",
                    height: "100px",
                }}
            />
            <h2>{name?.common || "Unknown Country"}</h2> {/* Fallback to "Unknown Country" */}
        </div>
    );
};

function Countries() {
    const API_ENDPOINT = "https://restcountries.com/v3.1/all";
    const [countries, setCountries] = useState([]);
    const [searchquery,setsearchquery]=useState("");
    const [filteredcountries,setfilteredcountries]=useState([]);

    useEffect(() => {
        fetch(API_ENDPOINT)
            .then((res) => res.json())
            .then((data) => {
                console.log(data); 
                setCountries(data);
                setfilteredcountries(data);
            })
            .catch((error) => console.log("Error fetching data:", error));
    }, []);

    useEffect(() => {
        setfilteredcountries(
            countries.filter((country) => 
                country.name.common.toLowerCase().includes(searchquery.toLowerCase())
            )
        );
    },[countries,searchquery]);

    return (
        <div>
            <input type="text" value={searchquery} onChange={(e) => {
                setsearchquery(e.target.value)
            }}></input>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            
            {filteredcountries
                .filter((country) => country.flags && country.name) 
                .map((country) => (
                    <Card
                        key={country.cca3} 
                        flags={country.flags}
                        name={country.name}
                    />
                ))}
        </div>
        </div>
    );
}

export default Countries;
