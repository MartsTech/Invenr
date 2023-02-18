import {EventTracker} from '@devexpress/dx-react-chart';
import {
  Chart,
  Legend,
  PieSeries,
  Title,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

export interface PieChartProps {
  data: any;
  valueField: string;
  argumentField: string;
  name: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  valueField,
  argumentField,
  name,
}) => {
  return (
    <Chart data={data}>
      <Title text={name} />
      <PieSeries
        name={name}
        valueField={valueField}
        argumentField={argumentField}
      />
      <Legend />
      <EventTracker />
      <Tooltip />
    </Chart>
  );
};
