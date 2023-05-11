import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchSales from '../../api/fetchSales';
import Header from '../../components/Header';
import stateGlobalContext from '../../context/stateGlobalContext';
import { readLocal, saveLocal } from '../../helpers/localStorage';
import { sumItemsValue } from '../../helpers/cartFunctions';
import fetchSellers from '../../api/fetchSellers';

function CheckoutPage() {
  const { setMyArray, myArray } = useContext(stateGlobalContext);
  const [arrayLocal, setArrayLocal] = useState(myArray);
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(1);
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [total, setTotal] = useState(sumItemsValue(arrayLocal));
  const [addressNumberCheckout, setAddressNumberCheckout] = useState('');
  const history = useHistory();

  useEffect(() => {
    setArrayLocal(readLocal('cartItems'));
    setMyArray(readLocal('cartItems'));
  }, [setMyArray]);

  useEffect(() => {
    async function getSellers() {
      setSellers(await fetchSellers());
      console.log(await fetchSellers());
    }
    getSellers();
  }, []);

  const deleteItem = (id) => {
    const item = myArray.filter((product) => +product.id !== +id);
    setMyArray(item);
    setArrayLocal(item);
    saveLocal('cartItems', item);
    saveLocal('cartValue', sumItemsValue(item).toFixed(2));
  };

  useEffect(() => {
    sumItemsValue(myArray);
    setTotal(sumItemsValue(arrayLocal));
  }, [arrayLocal, myArray]);

  const handleInputChange = async (target) => {
    if (target.name === 'checkoutAddress') setCheckoutAddress(target.value);
    if (target.name === 'addressNumberCheckout') setAddressNumberCheckout(target.value);
  };

  async function handleClick() {
    const sales = {
      totalPrice: total,
      sellerId: selectedSeller,
      deliveryAddress: checkoutAddress,
      deliveryNumber: addressNumberCheckout,
    };

    const cartItems = myArray.map((item) => ({
      productId: item.id, quantity: item.quantity,
    }));
    const user = readLocal('user');
    const { data } = await fetchSales(user.token, { cartItems,
      ...sales,
      userEmail: user.email });
    console.log(data);
    history.push(`/customer/orders/${data.saleId}`);
  }

  return (
    <>
      <Header />
      <h3>Order Completion</h3>
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
            <th>Delete Item</th>
          </tr>
          { arrayLocal.map((product, index) => {
            const subTotal = (+(product.price) * +(product.quantity)).toFixed(2);
            const item = `customer_checkout__element-order-table-item-number-${index}`;
            const name = `customer_checkout__element-order-table-name-${index}`;
            const quantity = `customer_checkout__element-order-table-quantity-${index}`;
            const price = `customer_checkout__element-order-table-unit-price-${index}`;
            const totalToPa = `customer_checkout__element-order-table-sub-total-${index}`;
            const remove = `customer_checkout__element-order-table-remove-${index}`;
            return (
              <tr key={ product.id }>
                <td data-testid={ item }>{ index + 1 }</td>
                <td data-testid={ name }>{ product.name}</td>
                <td data-testid={ quantity }>{ product.quantity }</td>
                <td data-testid={ price }>
                  {`R$ ${product.price.toString().replace('.', ',')}`}
                </td>
                <td data-testid={ totalToPa }>
                  {`R$ ${subTotal.toString().replace('.', ',')}`}
                </td>
                <td data-testid={ remove }>
                  <button
                    type="submit"
                    onClick={ () => deleteItem(product.id) }
                  >
                    Delete Item
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <span
        data-testid="customer_checkout__element-order-total-price"
      >
        Total Price: R$
        {' '}
        { `${(total.toFixed(2)).toString().replace('.', ',')}` }
      </span>
      <div>
        <label htmlFor="sellerSelectCheckout">
          {selectedSeller}
          <br />
          <select
            id="sellerSelect"
            data-testid="customer_checkout__select-seller"
            onChange={ (e) => setSelectedSeller(e.target.value) }
          >
            {sellers.map((seller) => (
              <option value={ seller.id } key={ seller.name }>
                {seller.name}
              </option>
            ))}

          </select>
        </label>
        <br />
        <label htmlFor="checkoutAddress">
          Address
          <br />
          <input
            id="checkoutAddress"
            name="checkoutAddress"
            data-testid="customer_checkout__input-address"
            type="text"
            onChange={ ({ target }) => handleInputChange(target) }
          />
        </label>
        <br />
        <label htmlFor="addressNumberCheckout">
          Number
          <br />
          <input
            id="addressNumberCheckout"
            name="addressNumberCheckout"
            data-testid="customer_checkout__input-address-number"
            type="text"
            onChange={ ({ target }) => handleInputChange(target) }
          />
        </label>
        <br />
        <button
          data-testid="customer_checkout__button-submit-order"
          type="submit"
          onClick={ handleClick }
        >
          Order Completion
        </button>
      </div>
    </>
  );
}

export default CheckoutPage;
