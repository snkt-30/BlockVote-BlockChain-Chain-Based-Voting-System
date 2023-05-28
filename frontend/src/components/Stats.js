import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const StructData = ({ state }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await state.contract.getStructData();

      setData(result);
    };

    fetchData();
  }, [state.contract]);

  return (
    <>
      <Navbar />
      {data ? (
        <div>
          <h1>Election Stats</h1>
          <PieChart width={400} height={400}>
            <Pie
              data={[
                // { name: "Total Voters", value: data.Total_Voters },
                { name: "Total Male Voters", value: data.Total_Male_Voters },
                { name: "Total Female Voters", value: data.Total_Female_Voters },
                { name: "Total Vote Voted", value: data.Total_Vote_Voted },
                { name: "Total Female Voters", value: data.Total_Male_Voted },
                { name: "Total Female Voters", value: data.Total_Female_Voted },
              ]}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <h1 className="results-container">Loading...</h1>
      )}
    </>
  );
};

export default StructData;
