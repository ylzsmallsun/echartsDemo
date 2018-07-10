import React, {Component} from 'react';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';

class Charts extends Component {
    render() {
        return (
            <div>
                <div>
                    <PieChart />
                    <BarChart />
                </div>
            </div>
        );
    }
}
export default Charts
