import React, {useEffect, useState} from "react";
import axios from "axios";
export default function App() {
	const [countries, setCountries] = useState([]);
	const [searchedCountry, setSearchedCountry] = useState("");
	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => response.data)
			.then((data) => {
				setCountries(data);
			});
	}, []);

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
	);

	return (
		<div>
			Countries
			<input
				type="text"
				value={searchedCountry}
				onChange={(e) => setSearchedCountry(e.target.value)}
			/>
			{filteredCountries.length <= 10 ? (
				filteredCountries.length === 1 ? (
					<div className="">
						<h1>{filteredCountries[0].name.common} </h1>
						{filteredCountries[0].capital.map((capital) => (
							<span>
								capital {capital} <br />
							</span>
						))}
						{filteredCountries[0].area}
						<h2>languages:</h2>
						<ul>
							{Object.values(filteredCountries[0].languages).map((language) => (
								<li>{language}</li>
							))}
						</ul>
						<img
							src={filteredCountries[0].flags.png}
							alt={filteredCountries[0].flags.alt}
						/>
					</div>
				) : (
					filteredCountries.map((country) => (
						<div className="">
							<p>{country.name.common}</p>
							<button onClick={() => setSearchedCountry(country.name.common)}>
								show
							</button>
						</div>
					))
				)
			) : (
				<p>Too many matches, specify another filter</p>
			)}
		</div>
	);
}
