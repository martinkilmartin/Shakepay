import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Shaking from "./Shaking";
import { getTransactions } from "../services/shakepayAPI";

function Chart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    getTransactions().then((result) => {
      if (mounted) {
        setData(result);
      }
    });
    return () => (mounted = false);
  }, []);

  if (data) {
    return (
      <div>
        {console.log(data)}
        <LineChart
          width={800}
          height={800}
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="btc"
            stroke="#f7931a"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="etc" stroke="#3c3c3d" />
        </LineChart>
      </div>
    );
  } else {
    return <Shaking />;
  }
}

export default Chart;
