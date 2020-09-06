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
          
          {console.log(depls)}
          {depls.depls.forEach((element) => {
            return (
              <tr key={element.id}>
                <td>{element.name}</td>
                <td>{element.date}</td>
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
