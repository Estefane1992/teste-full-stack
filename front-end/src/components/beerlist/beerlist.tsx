'use client'
import { useEffect, useState } from 'react';
import { ButtonContained, ButtonOutlined } from '../button';
import { fetchBeerData } from '@/utils/api';

interface BeerListProps {
  id: number;
  name: string;
  abv: number;
  first_brewed: string;
  description: string;
  image_url: string;
}

export default function BeerList() {
  const [beers, setBeers] = useState<BeerListProps[]>([]);
  const [filterBeers, setFilterBeers] = useState<BeerListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [selectedBeer, setSelectedBeer] = useState<BeerListProps | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBeerData()
      .then((data) => {
        setBeers(data);
        setLoading(false);
      })
      .catch((error) => console.error('Erro ao buscar dados da API:', error));
  }, []);

  useEffect(() => {
    const filtered = beers.filter((beer) => {
      const lowerCaseName = beer.name.toLowerCase();
      const lowerCaseFilterCriteria = filterCriteria.toLowerCase();
      const filterCriteriaNumber = parseFloat(filterCriteria);

      
      if (!isNaN(filterCriteriaNumber) && filterCriteriaNumber === beer.abv) {
        return true;
      } else if (lowerCaseName.includes(lowerCaseFilterCriteria)) {
        return true;
      }

      return false;
    });

    setFilterBeers(filtered);
  }, [beers, filterCriteria]);

  const openModal = (beer: BeerListProps) => {
    setSelectedBeer(beer);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div className='text-center mt-8 uppercase'>Carregando...</div>;
  }

  return (
    <>
      <div className='container mx-auto mt-20 p-4'>
        <h1 className='text-[30px] font-bold mb-4 text-center uppercase'>
          Lista de Cervejas
        </h1>

        <div className='flex flex-col md:flex-row md:space-x-4 justify-center gap-8 mt-10'>
          <div className='relative flex-grow'>
            <input
              type='text'
              placeholder='Buscar por nome ou teor alcoólico'
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className='border flex-grow border-gray-300 rounded-md p-3 mt-1 w-[100%]'
            />
          </div>

          <div className='flex gap-8' >
            <ButtonContained
            style={{ flex: 2 }}
            onClick={() => {
              
              setFilterBeers([...filterBeers].sort((a, b) => a.name.localeCompare(b.name)));
            }}
          >
            {'Ordenar por Nome'}
          </ButtonContained>

          <ButtonOutlined
            style={{ flex: 2 }}
            onClick={() => {
              
              setFilterBeers([...filterBeers].sort((a, b) => a.abv - b.abv));
            }}
          >
            {'Ordenar por Teor Alcoólico'}
          </ButtonOutlined>
          </div>
        </div>

        <div className='grid lg:grid-cols-5 md:grid-cols-3 gap-10 mt-20 mb-20'>
          {filterBeers.map((beer) => (
            <div
              key={beer.id}
              className='border rounded-2xl bg-[#FFFFFF] flex flex-col justify-between p-2 shadow-2xl scale-100 hover:scale-105 transition duration-500 ease-in-out'
            >
              <div>
                {beer.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={beer.image_url}
                    alt={beer.name}
                    className='w-full h-48 object-contain mt-6'
                  />
                )}
                <p className='font-bold text-xl mt-2 mb-2 text-center'>
                  {beer.name}
                </p>
                <p className=' text-[20px]'>
                  <strong>Teor Alcoólico:</strong> {beer.abv}%
                </p>
                <p className=' text-[20px]'>
                  <strong>Primeira fabricação: </strong>
                  {beer.first_brewed}
                </p>
                <ButtonContained
                  style={{
                    width: '110px',
                    height: '40px',
                    marginTop: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                  onClick={() => openModal(beer)}
                >
                  {'Ver descrição'}
                </ButtonContained>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedBeer && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-4 shadow-lg rounded-lg max-w-[400px] mx-auto'>
            <p className='text-[24px] font-bold'>Descrição:</p>
            <p>{selectedBeer.description}</p>
            <ButtonOutlined
              style={{
                width: '110px',
                height: '40px',
                marginTop: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              onClick={closeModal}
            >
              {'Fechar'}
            </ButtonOutlined>
          </div>
        </div>
      )}
    </>
  );
}
