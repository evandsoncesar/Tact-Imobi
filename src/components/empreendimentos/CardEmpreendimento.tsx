import React from 'react';
import { Link } from 'react-router-dom';
import { BedSingle, Bath, Ruler } from 'lucide-react';
import '../../styles/empreendimentosStyle/CardEmpreendimento.css';

interface CardEmpreendimentoProps {
  id: string | number;
  titulo: string;
  preco: number | string;
  localizacao: string;
  imagem: string;
  quartos: number;
  suites: number;
  metragem: number;
}

export default function CardEmpreendimento({
  id,
  titulo,
  preco,
  localizacao,
  imagem,
  quartos,
  suites,
  metragem,
}: CardEmpreendimentoProps) {
  return (
    <Link to={`/empreendimentos/${id}`} className="card-link">
      <div className="card-container">
        <img src={imagem} alt={titulo} className="card-imagem" />
        <div className="card-infos">
          <h4>{titulo}</h4>
          <span className="card-preco">Média: R$ {preco}</span>
          <p>{localizacao}</p>
          <div className="card-icones">
            
          </div>
        </div>
      </div>
    </Link>
  );
}
