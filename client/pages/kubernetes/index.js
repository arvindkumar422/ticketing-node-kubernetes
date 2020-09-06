import depls from '../../assets/depl.json';
import services from '../../assets/services.json';
import { useEffect, useState } from 'react';

const Kube = () => {

  const [selection, setSelection] = useState('');

  return (
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" value="aaa" onChange={(e) => setSelection(e.target.value)}>Aaaa</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" value="aaa" onChange={(e) => setSelection(e.target.value)}>bbbbb</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" value="sdff" onChange={(e) => setSelection(e.target.value)}>ccccc</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" value="dfs" href="#" onChange={(e) => setSelection(e.target.value)}>ddddd</a>
        </li>
      </ul>
      <hr />
      <table class="order-table table">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Namespace
            </th>
            <th>
              Labels
            </th>
            <th>
              Pods
            </th>
            <th>
              Created
            </th>
            <th>
              Images
            </th>
          </tr>
        </thead>
        <tbody>
          { selection === 'dfs' ? depls.depls.map((item) => {
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.namespace}</td>
                <td>{item.labels}</td>
                <td>{item.pods}</td>
                <td>{(new Date().getHours() - new Date(item.created).getHours()) / 24} days ago</td>
                <td>{item.images}</td>
              </tr>
            );
          })
        : services.services.map((item) => {
          return (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.namespace}</td>
              <td>{item.labels}</td>
              <td>{item.clusterip}</td>
              <td>{(new Date().getHours() - new Date(item.created).getHours()) / 24} days ago</td>
              <td>{item.endpoints}</td>
            </tr>
          );
        })
        }

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
