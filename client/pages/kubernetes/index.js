import depls from '../../assets/depl.json';
import services from '../../assets/services.json';
import secrets from '../../assets/secrets.json';
import ingresses from '../../assets/ingresses.json';
import pods from '../../assets/pods.json';
import { useEffect, useState } from 'react';

const Kube = () => {

  const [selection, setSelection] = useState('dep');


  return (
    <div className="nav-selection">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={selection == 'dep' ? "nav-link active" : "nav-link"} value="Deployments" onClick={() => { setSelection('dep') }}>Deployments</a>
        </li>
        <li className="nav-item">
          <a className={selection == 'ser' ? "nav-link active" : "nav-link"} value="Services" onClick={() => { setSelection('ser') }}>Services</a>
        </li>
        <li className="nav-item">
          <a className={selection == 'pod' ? "nav-link active" : "nav-link"} value="Pods" onClick={() => { setSelection('pod') }}>Pods</a>
        </li>
        <li className="nav-item">
          <a className={selection == 'ing' ? "nav-link active" : "nav-link"} value="Ingresses" onClick={() => { setSelection('ing') }}>Ingresses</a>
        </li>
        <li className="nav-item">
          <a className={selection == 'sec' ? "nav-link active" : "nav-link"} value="Secrets" onClick={() => { setSelection('sec') }}>Secrets</a>
        </li>
      </ul>
      <hr />
      <table class="table table-primary">
        <thead>
          {
          selection === 'dep' ?
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
            :
            selection === 'ser' ?
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
                Cluster IP
              </th>
              <th>
                Created
              </th>
              <th>
                Endpoints
              </th>
            </tr>
            :
            selection === 'pod' ?
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
                Node
              </th>
              <th>
                Created
              </th>
              <th>
                Status
              </th>
              <th>
                Status
              </th>
            </tr>
            :
            selection === 'ing' ?
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
                Created
              </th>
              <th>
                Endpoints
              </th>
            </tr>
            :
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
                Type
              </th>
              <th>
                Created
              </th>
            </tr>
            
          }

        </thead>
        <tbody>
          {selection === 'dep' ? depls.depls.map((item) => {
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.namespace}</td>
                <td>{item.labels}</td>
                <td>{item.pods}</td>
                <td>{Math.ceil((new Date().getTime() - new Date(item.created).getTime()) / (1000 * 3600 * 24))} days ago</td>
                <td>{item.images}</td>
              </tr>
            );
          })
            :
            selection === 'ser' ?
              services.services.map((item) => {
                return (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.namespace}</td>
                    <td>{item.labels}</td>
                    <td>{item.clusterip}</td>
                    <td>{Math.ceil((new Date().getTime() - new Date(item.created).getTime()) / (1000 * 3600 * 24))} days ago</td>
                    <td>{item.endpoints}</td>
                  </tr>
                );
              })
              :
              selection === 'pod' ?
                pods.pods.map((item) => {
                  return (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.namespace}</td>
                      <td>{item.labels}</td>
                      <td>{item.node}</td>
                      <td>{Math.ceil((new Date().getTime() - new Date(item.created).getTime()) / (1000 * 3600 * 24))} days ago</td>
                      <td>{item.status}</td>
                      <td>{item.restarts}</td>
                    </tr>
                  );
                })
                : selection === 'ing' ?
                  ingresses.ingresses.map((item) => {
                    return (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.namespace}</td>
                        <td>{item.labels}</td>
                        <td>{Math.ceil((new Date().getTime() - new Date(item.created).getTime()) / (1000 * 3600 * 24))} days ago</td>
                        <td>{item.endpoints}</td>
                      </tr>
                    );
                  })
                  :
                  secrets.secrets.map((item) => {
                    return (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.namespace}</td>
                        <td>{item.labels}</td>
                        <td>{item.type}</td>
                        <td>{Math.ceil((new Date().getTime() - new Date(item.created).getTime()) / (1000 * 3600 * 24))} days ago</td>
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
