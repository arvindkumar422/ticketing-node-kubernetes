import depls from '../../assets/depl.json';

const Kube = () => {
  return (
    <div>
      <h3>
        Deployments
      </h3>
      <hr />
      <table class="order-table table table-secondary">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {depls.depls.map((item) => {
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.date}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};

Kube.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default Kube;
