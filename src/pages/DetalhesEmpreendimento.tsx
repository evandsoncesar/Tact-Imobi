import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fakeEmpreendimentos } from '../API/api';
import '../styles/empreendimentosStyle/DetalhesEmpreendimento.css';
import { Ruler, Bed, Bath, Car, ShieldCheck, Building2, TreePalm } from 'lucide-react';
import Slider from "react-slick";
import Sidebar from '../components/SideBar';


interface Empreendimento {
  id: string;
  titulo: string;
  bairro: string;
  cidade: string;
  preco: string;
  fotos: string[];
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  caracteristicas: string[];
  comodidades: string[];
  sobre: string;
  localizacao: string;
}

export default function DetalhesEmpreendimento() {
  const { id } = useParams<{ id: string }>();
  const [dados, setDados] = useState<Empreendimento | null>(null);

  useEffect(() => {
    const empreendimentoEncontrado = fakeEmpreendimentos.find((item: Empreendimento) => item.id === id);
    setDados(empreendimentoEncontrado || null);
  }, [id]);

  if (!dados) return <p className="loading">Carregando...</p>;

  return (
    <div style={{ display: 'flex' }}> 
        <Sidebar />
      <div style={{ padding: 20, background: '#f5f5f5', minHeight: '100vh', flex: 1 }}>
        <div className="detalhes-container">
          <div className="header">
            <div>
              <h1 className="titulo">{dados.titulo}</h1>
              <p className="localizacao">{dados.bairro}, {dados.cidade}</p>
              <span className="preco">Valor do Imóvel: {dados.preco}</span>
            </div>

          </div>

          <div className="galeria">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              className="slider"
            >
              {dados.fotos.map((foto, idx) => (
                <div key={idx}>
                  <img src={foto} alt={`Foto ${idx}`} className="foto-slider" />
                </div>
              ))}
            </Slider>
          </div>


          <div className="resumo">
            <div>
              <Ruler size={24} />
              <strong>{dados.area}m²</strong>
              <p>Área</p>
            </div>
            <div>
              <Bed size={24} />
              <strong>{dados.quartos}</strong>
              <p>Quartos</p>
            </div>
            <div>
              <Bath size={24} />
              <strong>{dados.banheiros}</strong>
              <p>Banheiros</p>
            </div>
            <div>
              <Car size={24} />
              <strong>{dados.vagas}</strong>
              <p>Vagas</p>
            </div>
          </div>

          <div className="mapa">
            <iframe
              src={dados.localizacao}
              width="100%"
              height="300"
              loading="lazy"
              style={{ border: 0 }}
              title="Mapa do imóvel"
            />
          </div>

          <div className="sobre-imovel">
            <h3>Sobre o Imóvel</h3>
            <p className="sobre">{dados.sobre}</p>
          </div>
        
          <div className="caracteristicas">
            <div className="caracteristica-box">
              <TreePalm size={32} color="#29306a" />
              <h3>Lazer</h3>
              <ul>
                {dados.comodidades.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="caracteristica-box">
              <ShieldCheck size={32} color="#29306a" />
              <h3>Segurança</h3>
              <ul>
                {dados.comodidades.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="caracteristica-box">
              <Building2 size={32} color="#29306a" />
              <h3>Infraestrutura</h3>
              <ul>
                {dados.comodidades.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
