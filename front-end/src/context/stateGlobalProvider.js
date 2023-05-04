// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import stateGlobalContext from './stateGlobalContext';

// function StateGlobalProvider(props) {
//   const [totalPurchased, setTotalPurchased] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isThereAnUser, setIsThereAnUser] = useState(false);
//   const [messageError, setMessageError] = useState('');
//   const [total, setTotal] = useState(0);

//   const { Provider } = stateGlobalContext;
//   const { children } = props;

//   const addAndRemoveTotal = (obj) => {
//     const isThereSomething = total.some(({ id }) => obj.id === id);
//     if (!isThereSomething && obj.counter > 0) return setTotalPurchased([...total, obj]);
//     const withNoProduct = total.filter(({ id }) => id !== obj.id);
//     if (obj.counter === 0) return setTotalPurchased([...withNoProduct]);
//     return setTotalPurchased([...withNoProduct, obj]);
//   };

//   const calculator = () => {
//     const result = total.reduce((acc, curr) => {
//       acc += (curr.counter * Number(curr.price));
//       return acc;
//     }, 0);
//     return result.toFixed(2);
//   };

//   useEffect
// }
