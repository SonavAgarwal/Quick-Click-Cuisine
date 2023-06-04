// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Order } from './components/Order'

// function App() {

//   const [orders, setOrders] = useState([])

//   useEffect(() => {
//     let intervalID = setInterval(() => {
//       fetch("http://127.0.0.1:5000/orders/inprogress")
//         .then((res) => res.json())
//         .then((data) => {
//               const parsedData = data?.map((d) => JSON.parse(d));
//               setOrders(parsedData)
//         });
//     }, 5000);
//     return () => clearInterval(intervalID);
// 	}, []);

//   return (
//     <div>
//     {orders.map((order, index) => (
//         <Order key={index} column = {1} order={order}></Order>
//     ))}
//     </div>)
// }

// export default App

import './App.css';
import { Order } from './components/Order';
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [orders, setOrders] = useState([]);

  function fetchData() {

    fetch('http://127.0.0.1:5000/orders/inprogress')
      .then((res) => res.json())
      .then((data) => {
        const parsedData = data?.map((d) => JSON.parse(d));
        setOrders(parsedData)
        console.log(parsedData)
      });
  }

  useEffect(() => {
    let intervalID = setInterval(() => {
      fetchData()
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="app-container">
      <div className="sections-container">
        <QueueSection orders={orders.filter((order) => order.status === 0)} fetchData={fetchData}  />
        <InProgressSection orders={orders.filter((order) => order.status === 1)} fetchData={fetchData}  />
        <CompleteSection orders={orders.filter((order) => order.status === 2)} fetchData={fetchData} />
      </div>
    </div>
  );
}

const QueueSection = ({ orders, fetchData }) => {
  return (
    <div className="section">
      <h2>Queue</h2>
      {orders.map((order, index) => (
        <Order key={index} column={1} order={order}fetchData={fetchData} />
      ))}
    </div>
  );
};

const InProgressSection = ({ orders, fetchData }) => {
  return (
    <div className="section">
      <h2>In Progress</h2>
      {orders.map((order, index) => (
        <Order key={index} column={2} order={order}fetchData={fetchData} />
      ))}
    </div>
  );
};

const CompleteSection = ({ orders, fetchData }) => {
  return (
    <div className="section">
      <h2>Complete</h2>
      {orders.map((order, index) => (
        <Order key={index} column={3} order={order}fetchData={fetchData}  />
      ))}
    </div>
  );
};

export default App;
