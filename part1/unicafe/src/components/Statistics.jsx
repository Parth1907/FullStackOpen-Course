import React from "react";
import StatisticsLine from "./StatisticsLine";

export default function Statistics({good, neutral, bad}) {
	return (
		<div>
			<h1>Statistics</h1>
			<table>
				<tbody>
					<StatisticsLine text={"good"} value={good} />
					<StatisticsLine text={"neutral"} value={neutral} />
					<StatisticsLine text={"bad"} value={bad} />
					<StatisticsLine text={"all"} value={good + neutral + bad} />
					<StatisticsLine
						text={"average"}
						value={(good - bad) / (good + neutral + bad)}
					/>
					<StatisticsLine
						text={"positive"}
						value={(good / (good + neutral + bad)) * 100}
					/>
				</tbody>
			</table>
		</div>
	);
}
