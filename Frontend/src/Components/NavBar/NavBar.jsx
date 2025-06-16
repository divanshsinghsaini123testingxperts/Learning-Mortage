


function NavBar(Props) {
    return (
        <nav>
            <ul>
                <li><img src="logo.png" alt="Logo" srcset="" /></li>
                <li><Button onClick={() => window.location.href = '/home'}>Home</Button></li>
                <li><Button onClick={() => window.location.reload()}>Refresh</Button></li>
                <li>{Props.Email} <Button onClick={Props.onLogout}>Logout</Button></li>

            </ul>
        </nav>
    );
}
export default NavBar;
