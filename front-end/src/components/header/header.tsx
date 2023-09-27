import Link from 'next/link';
import Logo from '@/assets/logo.png'
import Image from 'next/image';

const Header = () => {
    return (
        <header className='bg-[#ffb831]  w-full z-10'>
            <nav>
                <ul>
                    <li className='ml-10'>
                        <Link href={'/'}>
                            <Image
                                src={Logo}
                                alt='Logo'
                                className='w-20'
                            />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
