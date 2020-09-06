import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ currentUser, ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div>
      <div className="info">
        <p>
          Clicking on 'Purchase' will create a new order which will expire in 90 seconds.
          <br/>
          Ticket will be locked and cannot be edited or purchased by others until the order expires.
        </p>
      </div>
      <div class="card ticket-card">
        <div class="card-body">
          <h2 class="card-title">{ticket.title}</h2><h4 class="card-text" >${ticket.price}</h4>
          <hr />
          {errors}
          {currentUser === null
            ? <div><button class="btn btn-primary" disabled>Purchase</button><p>You must be logged in to purchase</p></div>
            : <button onClick={() => doRequest()} class="btn btn-primary">Purchase</button>}
          {/* <button disabled={currentUser === null} onClick={() => doRequest()} class="btn btn-primary">Purchase</button> */}
        </div>

      </div>
    </div>

    // <div>
    //   <h1>{ticket.title}</h1>
    //   <h4>${ticket.price}</h4>
    //   {errors}
    //   <button onClick={() => doRequest()} className="btn btn-primary">
    //     Purchase
    //   </button>
    // </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
