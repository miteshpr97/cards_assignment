import React, { useState, useEffect } from 'react';
import { mockData } from './mockData';
import './App.css'
const CardListing = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [cardTypeFilter, setCardTypeFilter] = useState('');

  // Fetch cards from the mockData object
  const fetchCards = async () => {
    try {
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedData = mockData.data.slice(startIndex, endIndex);
      setCards((prevCards) => [...prevCards, ...paginatedData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  // Trigger fetchCards on component mount
  useEffect(() => {
    fetchCards();
  }, []);

  // Handle infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchCards();
    }
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter cards based on search term and card type filter
  let filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (cardTypeFilter !== '') {
    filteredCards = filteredCards.filter((card) => card.card_type === cardTypeFilter);
  }

  return (
    <div>
      <div className='navbar'>
        <input
          type="text"
          placeholder="Search by card name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={cardTypeFilter} onChange={(e) => setCardTypeFilter(e.target.value)}>
          <option value="">All</option>
          <option value="burner">Burner</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
      <hr></hr>
<br></br>
      <div className="card-list">
        {filteredCards.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <span className="card-type">{card.card_type}</span>
            </div>
            <div className="card-body">
              <h4>{card.name}</h4>
              <p>{card.budget_name}</p>
              {card.card_type === 'burner' && <p>Expiry: {card.expiry}</p>}
              {card.card_type === 'subscription' && <p>Limit: {card.limit}</p>}
              <p>Status: {card.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardListing;
