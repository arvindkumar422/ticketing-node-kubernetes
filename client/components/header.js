import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    { label: 'Kubernetes dashboard', href: '/kubernetes' },
    !currentUser && { label: 'Register', href: '/auth/signup' },
    !currentUser && { label: 'Login', href: '/auth/signin' },
    currentUser && { label: 'Sell tickets', href: '/tickets/new' },
    currentUser && { label: 'My orders', href: '/orders' },
    currentUser && { label: 'Logout', href: '/auth/signout' }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link nav-main" style={{ marginRight: "6px", backgroundColor: "aliceblue" }}>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand">MicroTix</a>
          </Link>

          <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">{links}</ul>
          </div>
        </div>

      </nav>
      <div className="userloggedindiv">
        {currentUser ? <h5 className="userloggedin">Logged in as {currentUser.email}</h5> : <h5>Not logged in</h5>}
      </div>
    </div>


  );
};
