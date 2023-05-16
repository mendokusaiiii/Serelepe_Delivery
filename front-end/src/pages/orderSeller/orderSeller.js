import React from 'react';
import HeaderSeller from '../../components/Seller/HeaderSeller';
import OrderSeller from '../../components/Seller/OrderSeller';

function OrderSellerPage() {
//   const { loading, setLoading } = useContext(stateGlobalContext);

  //   useEffect(() => {
  //     setLoading(false);
  //   }, [setLoading]);

  return (
    <div>
      <HeaderSeller />
      <OrderSeller />
    </div>
  );
}

export default OrderSellerPage;
