import Link from "next/link";
// import KubeConfig from "@kubernetes/client-node";
// import CoreV1Api from "@kubernetes/client-node";

const k8s = require('@kubernetes-client/client-node');

const LandingPage = ({ currentUser, tickets }) => {

  const podsList = new k8s.KubeConfig();
  podsList.loadFromDefault();

  const k8sApi = podsList.makeApiClient(CoreV1Api);



  const ticketList = tickets.map((ticket) => {
    return (
      <Link href="tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
        <tr key={ticket.id} >
          <td>{ticket.title}</td>
          <td>{ticket.price}</td>
          <td>
            <Link href="tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
              <a>View</a>
            </Link>
          </td>
        </tr>
      </Link>
    );
  });

  return (
    <div className="homediv">
      <h1>Tickets</h1>
      {k8sApi.listNamespacedPod('default').then((res) => {
        console.log(res.body);
      })}
      <table className="table table-home table-success">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
