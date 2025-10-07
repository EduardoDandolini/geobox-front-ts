import React, { useEffect, useState } from 'react';
import { getPoints } from '../../service/GeoBoxAPI';
import { GamificationResponse } from '../../Interfaces/GamificationResponse';
import './Ranking.css';
import NavBar from '../NavBar/NavBar';
import Header from '../Header/Header';

const Ranking: React.FC = () => {
  const [ranking, setRanking] = useState<GamificationResponse[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getPoints();
        // Ensure data is always an array
        setRanking(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching ranking:', error);
        setRanking([]);
      }
    };
    fetchRanking();
  }, []);

  return (
    <div className="standard-container">
        <Header />
        <NavBar />
      <h1 className="standard-title">Classificação</h1>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, index) => (
            <tr key={index} className={index < 3 ? `top-${index + 1}` : ''}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
