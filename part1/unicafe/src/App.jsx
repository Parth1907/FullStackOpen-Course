import {useState} from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";
import StatisticsLine from "./components/StatisticsLine";

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

 const handleClickGood = () => setGood(good + 1)
 const handleClickNeutral = () => setNeutral(neutral + 1)
 const handleClickBad = () => setBad(bad + 1)
	return (
		<div>
			<h1>Give Feedback</h1>
      <Button text={"good"} onClick={handleClickGood}/>
      <Button text={"neutral"} onClick={handleClickNeutral}/>
      <Button text={"bad"} onClick={handleClickBad}/>
			{good > 0 || neutral > 0 || bad > 0 ? (
				<Statistics good={good} neutral={neutral} bad={bad} />
			) : (
				<p> "No feedback given" </p>
			)}
		</div>
	);
};

export default App;
