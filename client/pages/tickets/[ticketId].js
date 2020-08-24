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
    <div class="card bg-warning">
      <div class="card-body">
        <h1 class="card-title">{ticket.title}</h1><h4 class="card-text" >${ticket.price}</h4>
        {errors}
        <button disabled={currentUser === undefined} onClick={() => doRequest()} class="btn btn-primary">Purchase</button>
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
