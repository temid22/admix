import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Chart = ({ aspect, title, data, dataKey }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="Users" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A020F0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#A020F0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#A020F0"
            fillOpacity={1}
            fill="url(#Users)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
