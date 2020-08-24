import Link from "next/link";
import Particles from 'react-particles-js';

const particlesJson = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }

  }
};

const LandingPage = ({ currentUser, tickets }) => {
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
      <Particles className='particles' params={particlesJson} />
      <h1>Tickets</h1>
      <table className="table table-success">
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
