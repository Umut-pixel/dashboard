"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

interface AnalyticsChartProps {
  data: ChartData[]
  dataKey?: string
  lineColor?: string
  height?: number
}

export default function AnalyticsChart({ 
  data, 
  dataKey = "value", 
  lineColor = "#8884d8",
  height = 300 
}: AnalyticsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={dataKey} stroke={lineColor} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
