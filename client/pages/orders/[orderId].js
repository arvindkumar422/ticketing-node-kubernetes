import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div class="container">
      <div className="expiry">
        <h4 className="time-left-text">
          Time left to pay: {timeLeft} seconds!!
        </h4>
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51HANWyJUQaDpNgeV0LXOfgvBTcDfKI1Rg9gQy238uEx0LDDKFcfKRvmY2dWpeVpEPIcrtfBH5Vtsrm6oENIBdq8v00YUFesBHJ"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
        {errors}
      </div>
      <div className="democards">
        <h3>Try out payments with any of the below demo cards</h3>
        <table class="table table-secondary">
          <thead>
            <tr>
              <th>Number</th>
              <th>Brand</th>
              <th>CVC</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4242 4242 4242 4242</td>
              <td>Visa</td>
              <td>Any 3 digits</td>
              <td>Any future date</td>
            </tr>
            <tr>
              <td>5555 5555 5555 4444</td>
              <td>Mastercard</td>
              <td>Any 3 digits</td>
              <td>Any future date</td>
            </tr>
            <tr>
              <td>6200 0000 0000 0005</td>
              <td>UnionPay</td>
              <td>Any 3 digits</td>
              <td>Any future date</td>
            </tr>
            <tr>
              <td>3782 822463 10005</td>
              <td>American Express</td>
              <td>Any 4 digits</td>
              <td>Any future date</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
