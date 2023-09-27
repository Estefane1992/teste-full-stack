import BeerList from '@/components/beerlist/beerlist';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo.png'

export default function Beers() {
  return (
    <div className='min-h-screen flex flex-col'>
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
      <main className='flex-grow'>
        <BeerList/> 
      </main>
      <footer className='bottom-0  left-0 w-full bg-[#ffb831] text-center font-bold text-sm'>
        &copy; 2023. Todos os direitos reservados. Desenvolvido por Estefane.
      </footer>
    </div>
  );
}
