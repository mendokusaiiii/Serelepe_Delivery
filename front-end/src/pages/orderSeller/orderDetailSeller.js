import React from 'react';
import HeaderSeller from '../../components/Seller/HeaderSeller';
import CardDetailSeller from '../../components/Seller/CardDetailSeller';

function OrderDetailSeller() {
  // const { loading, setLoading } = useContext(stateGlobalContext);

  // useEffect(() => {
  //   setLoading(false);
  // }, [setLoading]);

  return (
    <div>
      <HeaderSeller />
      <CardDetailSeller />
    </div>
  );
}

export default OrderDetailSeller;
