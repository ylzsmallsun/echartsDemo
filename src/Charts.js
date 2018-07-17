import React, {Component} from 'react';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';

class Charts extends Component {
    render() {
        return (
            <div>
                <div>
                    <PieChart />
                    <BarChart />
                    <LineChart />
                </div>
            </div>
        );
    }
}
export default Charts
