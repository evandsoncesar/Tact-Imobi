import React from 'react';
import CardEmpreendimento from './CardEmpreendimento';
import '../../styles/empreendimentosStyle/ListaEmpreendimentos.css';
import type { Filtros } from './Filtros';

interface Empreendimento {
  id: number;
  titulo: string;
  preco: string;
  localizacao: string;
  imagem: string;
  quartos: number;
  suites: number;
  metragem: number;
}

interface ListaEmpreendimentosProps {
  filtros: Filtros;
}

const empreendimentos: Empreendimento[] = [
  {
    id: 1,
    titulo: 'Condomínio Pinheiros',
    preco: '2.300/mês',
    localizacao: 'Pernambuco - Recife - Boa Viagem',
    imagem: process.env.PUBLIC_URL + '/apartamento.jpg',
    quartos: 3,
    suites: 2,
    metragem: 85,
  },
  {
    id: 2,
    titulo: 'Lotus Residence',
    preco: '1.800/mês',
    localizacao: 'Pernambuco - Olinda - Peixinhos',
    imagem: process.env.PUBLIC_URL + '/apartamento.jpg',
    quartos: 3,
    suites: 2,
    metragem: 85,
  },
  {
    id: 3,
    titulo: 'Condomínio Labubu',
    preco: '1.500/mês',
    localizacao: 'Pernambuco - Recife - Graças',
    imagem: process.env.PUBLIC_URL + '/apartamento.jpg',
    quartos: 3,
    suites: 2,
    metragem: 85,
  },
  {
    id: 4,
    titulo: 'Residence Premium',
    preco: '1.300/mês',
    localizacao: 'Pernambuco - Jaboatão dos Guararapes - Candeias',
    imagem: process.env.PUBLIC_URL + '/apartamento.jpg',
    quartos: 3,
    suites: 2,
    metragem: 85,
  },
  {
    id: 5,
    titulo: 'Condomínio Alpha',
    preco: '2.000/mês',
    localizacao: 'Pernambuco - Recife - Graças',
    imagem: process.env.PUBLIC_URL + '/apartamento.jpg',
    quartos: 3,
    suites: 2,
    metragem: 85,
  },
  {
    id: 6,
    titulo: 'Residence Gold',
    preco: '1.800/mês',
    localizacao: 'Pernambuco - Olinda - Peixinhos',
    imagem: process.env.PUBLIC_URL + '/apartamento.jpg',
    quartos: 3,
    suites: 2,
    metragem: 85,
  },
];

export default function ListaEmpreendimentos({ filtros }: ListaEmpreendimentosProps) {
  // Certifique-se que filtros.pesquisa, estado e municipio são strings não vazias
  const pesquisaLower = filtros.pesquisa.trim().toLowerCase();
  const estadoLower = filtros.estado.trim().toLowerCase();
  const municipioLower = filtros.municipio.trim().toLowerCase();

  const filtrados = empreendimentos.filter((item) => {
    const tituloLower = item.titulo.toLowerCase();
    const localizacaoLower = item.localizacao.toLowerCase();

    // Verifica se título contém a pesquisa
    const tituloMatch = pesquisaLower === '' || tituloLower.includes(pesquisaLower);

    // Verifica estado (exemplo simples, pois localizacao tem 'Cidade - Estado')
    const estadoMatch = estadoLower === '' || localizacaoLower.includes(estadoLower);

    // Verifica município (também simplificado)
    const municipioMatch = municipioLower === '' || localizacaoLower.includes(municipioLower);

    return tituloMatch && estadoMatch && municipioMatch;
  });

  return (
    <div className="lista-empreendimentos">
      {filtrados.map((item) => (
        <CardEmpreendimento key={item.id} {...item} />
      ))}
    </div>
  );
}
