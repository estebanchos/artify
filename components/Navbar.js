import Link from "next/link";

function Navbar() {
    return (
        <div className='container h-10 flex justify-end' >
            <div className='flex w-1/4 justify-evenly items-center'>
                <Link href='/'>Home</Link>
                <Link href='/dashboard'>Dashboard</Link>
                <Link href='/login'>Login</Link>
            </div>
        </div>
    );
}

export default Navbar;