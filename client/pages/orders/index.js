const OrderIndex = ({ orders }) => {
  return (
    <div>
      <h3>
        Past orders
      </h3>
      <hr />
      <table class="order-table table table-secondary">
        <thead>
          <tr>
            <th>
              Ticket name
            </th>
            <th>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>{order.status}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
