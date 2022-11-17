import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { GlobalContext } from '../context/GlobalState';

ChartJS.register(ArcElement, Tooltip, Legend);


export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext)

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    console.log(amounts)

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [`${income}`, `${expense}`],
        backgroundColor: [
          'rgba(46, 204, 113, 0.5)',
          'rgba(192, 57, 43, 0.5)',
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(192, 57, 43, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
    {amounts.length > 0 && <Pie data={data} />}
    <div className="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p className="money plus">${income}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p className="money minus">${expense}</p>
    </div>
  </div>
  </>
  )
}
