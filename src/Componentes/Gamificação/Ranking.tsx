import React, { useEffect, useState } from 'react';
import { getPoints } from '../../service/GeoBoxAPI';
import { GamificationResponse } from '../../Interfaces/GamificationResponse';
import './Ranking.css';
import NavBar from '../NavBar/NavBar';

const Ranking: React.FC = () => {
  const [ranking, setRanking] = useState<GamificationResponse[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const data = await getPoints();
      setRanking(data);
    };
    fetchRanking();
  }, []);

  return (
    <div className="ranking-container">
        <NavBar />
      <h1>🏆 Ranking de Usuários</h1>
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
