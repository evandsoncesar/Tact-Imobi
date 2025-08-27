import React from 'react';
import '../../styles/planosStyle/CardPlano.css';
import { X, Check } from 'lucide-react';

interface PlanoCardProps {
  titulo: string;
  subtitulo: string;
  destaque?: boolean;
  beneficios: string[];
  desabilitados?: string[];
  onClick: () => void;
  tipo: 'básico' | 'profissional' | 'empresarial';
}

const PlanoCard: React.FC<PlanoCardProps> = ({
  titulo,
  subtitulo,
  destaque = false,
  beneficios,
  desabilitados = [],
  onClick,
  tipo,
}) => {
  return (
    <div className={`plano-card ${destaque ? 'destaque' : ''} ${tipo}`}>
      {destaque && <div className="tag-popular">MAIS POPULAR</div>}
      <h3>{titulo}</h3>
      <p className="subtitulo">{subtitulo}</p>
      <a className="valores">Consulte valores</a>

      <ul className="beneficios">
        {beneficios.map((b, i) => (
          <li key={i} className="habilitado"> <Check/> {b}</li>
        ))}
        {desabilitados.map((d, i) => (
          <li key={i} className="desabilitado"> <X/> {d}</li>
        ))}
      </ul>

      <button onClick={onClick}>Entrar em Contato</button>
    </div>
  );
};

export default PlanoCard;
