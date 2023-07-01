import React from 'react';

const CardList = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <div key={card.name} className="card">
          <div className="card-type">{card.card_type}</div>
          <div className="card-details">
            <div>Name: {card.name}</div>
            <div>Budget Name: {card.budget_name}</div>
            <div>Owner ID: {card.owner_id}</div>
            <div>Spent: {card.spent.value} {card.spent.currency}</div>
            <div>Available to Spend: {card.available_to_spend.value} {card.available_to_spend.currency}</div>
            {card.card_type === 'burner' ? (
              <div>Expiry: {card.expiry}</div>
            ) : (
              <div>Limit: {card.limit}</div>
            )}
            <div>Status: {card.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
