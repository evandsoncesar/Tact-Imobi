import React, { useState, useEffect  } from 'react';
import '../../styles/socioeconomicoStyle/DadosCarrossel.css';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface Subitem {
  label: string;
  valor: string;
  subitens?: Subitem[];
}

interface Dado {
  titulo: string;
  dados: Subitem[];
}

interface FiltrosProps {
  filtros: {
    pesquisa: string;
    estado: string;
    municipio: string;
  } | null;
}

const dadosPorMunicipio: Record<string, Dado[]> = {
  'São Paulo': [
    {
      titulo: 'Informações Básicas',
      dados: [
        {
          label: 'Habitantes',
          valor: '',
          subitens: [
            { label: 'Homens', valor: '6.123.000 (49,1%)' },
            { label: 'Mulheres', valor: '6.202.000 (50,9%)' },
            { label: 'Casados', valor: '4.928.778 (41,4%)' },
          ],
        },
        {
          label: 'Área',
          valor: '',
          subitens: [
            { label: 'Densidade populacional', valor: '7.766 hab./km²' },
            { label: 'Densidade habitacional', valor: '3.205 dom./km²' },
          ],
        },
      ],
    },
    {
      titulo: 'Economia',
      dados: [
        { label: 'Produto Interno Bruto (PIB)', valor: 'R$ 803 bilhões' },
        { label: 'índice de desenvolvimento Humano (IDH)', valor: '0,805' },
      ],
    },
    {
      titulo: 'Domicílios',
      dados: [
        { label: 'Total', valor: '4.909.822 domicílios' },
        { label: 'Apartamentos', valor: '1.711.840 (34,9%)' },
        { label: 'Alugados', valor: '1.558.336 (31,7%)' },
        { label: 'Em favela', valor: '364.788 (7,4%)' },
        { label: 'Média de pessoas por domicílio', valor: '2,42' },
        {
          label: 'Distribuição por domicílio',
          valor: '',
          subitens: [
            { label: '1 pessoa', valor: '1.100.527 (22,4%)' },
            { label: '2 pessoas', valor: '1.470.724 (30,0%)' },
            { label: '3 pessoas', valor: '1.282.184 (26,1%)' },
            { label: '4 pessoas', valor: '763.875 (15,6%)' },
            { label: '5 pessoas ou mais', valor: '290.442 (5,9%)' },
          ],
        },
      ],
    },
    {
      titulo: 'Domicílios por Classe de Renda',
      dados: [
        {
          label: 'Classe A',
          valor: '771.451 (15,7%)',
          subitens: [
            { label: 'A1', valor: '340.116 (6,9%)' },
            { label: 'A2', valor: '431.335 (8,8%)' },
          ],
        },
        {
          label: 'Classe B',
          valor: '1.451.088 (29,6%)',
          subitens: [
            { label: 'B1', valor: '653.347 (13,3%)' },
            { label: 'B2', valor: '797.741 (16,2%)' },
          ],
        },
        {
          label: 'Classe C',
          valor: '2.420.023 (49,3%)',
          subitens: [
            { label: 'C1', valor: '1.832.885 (37,3%)' },
            { label: 'C2', valor: '587.138 (12,0%)' },
          ],
        },
        {
          label: 'Classe D/E',
          valor: '267.260 (5,4%)',
          subitens: [
            { label: 'D', valor: '198.163 (4,0%)' },
            { label: 'E', valor: '69.097 (1,4%)' },
          ],
        },
      ],
    },
    {
      titulo: 'Renda bruta mensal domiciliar',
      dados: [
        {label: 'Renda bruta mensal por domicílio', valor: 'R$ 61.332,34',},
          { label: 'Classe A', 
            valor: 'R$ 30.526,34 (49,8%)',
            subitens: [
            { label: 'A1', valor: 'R$ 18.531,77 (30,2%)' },
            { label: 'A2', valor: 'R$ 11.994,57 (19,6%)' },
            ]
          },
          { label: 'Classe B', 
            valor: 'R$ 16.917,64 (27,6%)',
            subitens: [
            { label: 'B1', valor: 'R$ 9.557,38 (15,6%)' },
            { label: 'B2', valor: 'R$ 7.360,25 (12,0%)' },
            ]
          },
          { label: 'Classe C', 
            valor: 'R$ 13.296,66 (21,7%)',
            subitens: [
            { label: 'C1', valor: 'R$ 11.060,67 (18,0%)' },
            { label: 'C2', valor: 'R$ 2.235,99 (3,6%)' },
            ]
          },  
          { label: 'Classe D/E', 
            valor: 'R$ 591,70 (1,0%)',
            subitens: [
            { label: 'D', valor: 'R$ 512,24 (0,8%)' },
            { label: 'E', valor: 'R$ 79,46 (0,1%)' },
            ]
          },
      ]   
    },
    {
      titulo: 'Renda Mensal',
      dados: [
        { label: 'Média per capita', valor: 'R$ 5.155,93' },
        { label: 'Média por domicílio', valor: 'R$ 12.491,77' },
        {
          label: 'Classe A',
          valor: 'R$ 39.570,04',
          subitens: [
            { label: 'A1', valor: 'R$ 54.486,62' },
            { label: 'A2', valor: 'R$ 27.808,02' },
          ],
        },
        {
          label: 'Classe B',
          valor: 'R$ 11.658,59',
          subitens: [
            { label: 'B1', valor: 'R$ 14.628,34' },
            { label: 'B2', valor: 'R$ 9.226,37' },
          ],
        },
        {
          label: 'Classe C',
          valor: 'R$ 5.494,43',
          subitens: [
            { label: 'C1', valor: 'R$ 6.034,57' },
            { label: 'C2', valor: 'R$ 3.808,28' },
          ],
        },
        {
          label: 'Classe D/E',
          valor: 'R$ 2.213,97',
          subitens: [
            { label: 'D', valor: 'R$ 2.584,96' },
            { label: 'E', valor: 'R$ 1.150,00' },
          ],
        },
      ],
    },
    {
      titulo: 'Faixa Etária',
      dados: [
        {
          label: 'Crianças (0 a 14 anos)',
          valor: '1.932.871 (16,2%)',
          subitens: [
            { label: '0 a 4 anos', valor: '588.064 (4,9%)' },
            { label: '5 a 9 anos', valor: '627.266 (5,3%)' },
            { label: '10 a 14 anos', valor: '717.541 (6,0%)' },
          ],
        },
        {
          label: 'Jovens (15 a 29 anos)',
          valor: '2.480.826 (20,9%)',
          subitens: [
            { label: '15 a 19 anos', valor: '718.597 (6,0%)' },
            { label: '20 a 24 anos', valor: '845.729 (7,1%)' },
            { label: '25 a 29 anos', valor: '916.500 (7,7%)' },
          ],
        },
        {
          label: 'Adultos (30 a 59 anos)',
          valor: '5.286.900 (44,4%)',
          subitens: [
            { label: '30 a 39 anos', valor: '2.149.086 (18,1%)' },
            { label: '40 a 49 anos', valor: '1.761.347 (14,8%)' },
            { label: '50 a 59 anos', valor: '1.376.467 (11,6%)' },
          ],
        },
        {
          label: 'Idosos (60 anos ou mais)',
          valor: '2.193.419 (18,4%)',
          subitens: [
            { label: '60 a 64 anos', valor: '693.671 (5,8%)' },
            { label: '65 a 69 anos', valor: '495.422 (4,2%)' },
            { label: '70 anos ou mais', valor: '1.004.326 (8,4%)' },
          ],
        },
      ],
    },
    {
      titulo: 'Bens e Serviços',
      dados: [
        { label: 'Domicílios com automóvel', valor: '2.950.394 (60,1%)' },
        { label: 'Domicílios com moto', valor: '288.060 (5,9%)' },
        { label: 'Domicílios com internet', valor: '4.738.287 (96,5%)' },
        { label: 'Domicílios com celular', valor: '4.823.278 (98,2%)' },
      ],
    },
  ],
};


const DadosCarrossel: React.FC<FiltrosProps> = ({ filtros }) => {
  const [index, setIndex] = useState<number>(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [popup, setPopup] = useState<{ visible: boolean; label: string }>({
    visible: false,
    label: '',
  });

  // Resetar índice e expandeds quando o município mudar
  useEffect(() => {
    setIndex(0);
    setExpanded({});
  }, [filtros?.municipio]);

  const dadosMunicipio = filtros?.municipio
    ? dadosPorMunicipio[filtros.municipio]
    : [];

  const dadoAtual = dadosMunicipio?.[index];

  const handlePrev = () => {
    setIndex(prev => (prev === 0 ? dadosMunicipio.length - 1 : prev - 1));
    setExpanded({});
  };

  const handleNext = () => {
    setIndex(prev => (prev === dadosMunicipio.length - 1 ? 0 : prev + 1));
    setExpanded({});
  };

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInfoClick = (label: string) => {
    const explicacoes: Record<string, string> = {
        Habitantes: 'Número total de pessoas residentes em uma determinada área geográfica.',
        Homens: 'Número total de pessoas residentes do sexo masculino.',
        Mulheres: 'Número total de pessoas residentes do sexo feminino.',
        Casados: 'Número total de pessoas residentes em uma determinada área geográfica que declararam estado civil como "casado(a)" ou "união estável"',
        Área: 'Extensão territorial de uma determinada região ou unidade geográfica, expressa geralmente em quilômetros quadrados (km²).',
        'Densidade pop.': 'Indicador que representa a média de habitantes por quilômetro quadrado em uma determinada área geográfica.',
        'Densidade dom.': 'Indicador que expressa a quantidade média de domicílios por quilômetro quadrado em uma determinada área geográfica.',
        'Produto Interno Bruto (PIB)': 'Valor total, em milhões de reais, de todos os bens e serviços finais produzidos em uma determinada região durante um período específico.',
        'índice de desenvolvimento Humano (IDH)': 'Índice que mede o desenvolvimento humano de uma região, considerando renda, educação e longevidade.',
        'Total': 'Número total de domicílios na região.',
        'Apartamentos': 'Número de domicílios que são apartamentos.',
        'Alugados': 'Número de domicílios que são alugados.',
        'Em favela': 'Número de domicílios localizados em favelas.',
        'Média de pessoas por domicílio': 'Média de habitantes por domicílio.',
        'Distribuição por domicílio': 'Distribuição percentual de domicílios com base no número de moradores.',
        'Média per capita': 'Média de renda por pessoa.',
        'Média por domicílio': 'Média de renda por domicílio.',
        'Classe A': 'Renda média mensal do grupo de domicílios classificados como A.',
        'Classe B': 'Renda média mensal do grupo de domicílios classificados como B.',
        'Classe C': 'Renda média mensal do grupo de domicílios classificados como C.',
        'Classe D/E': 'Renda média mensal do grupo de domicílios classificados como D e E.',
        'Total (R$ milhões)': 'Total da renda mensal gerada, em milhões de reais, e sua distribuição por classe de renda.',
        'Domicílios por Classe de Renda': 'Distribuição de domicílios por classe de renda.',
        'Crianças (0 a 14 anos)': 'População na faixa etária de 0 a 14 anos.',
        'Jovens (15 a 29 anos)': 'População na faixa etária de 15 a 29 anos.',
        'Adultos (30 a 59 anos)': 'População na faixa etária de 30 a 59 anos.',
        'Idosos (60 anos ou mais)': 'População na faixa etária de 60 anos ou mais.',
        'Domicílios com automóvel': 'Número de domicílios que possuem pelo menos um automóvel.',
        'Domicílios com moto': 'Número de domicílios que possuem pelo menos uma moto.',
        'Domicílios com internet': 'Número de domicílios com acesso à internet.',
        'Domicílios com celular': 'Número de domicílios com acesso a telefone celular.',
    };

    const descricao = explicacoes[label] ?? 'Descrição não disponível.';

    setPopup({
      visible: true,
      label: descricao,
    });
  };

  const fecharPopup = () => {
    setPopup({ visible: false, label: '' });
  };

  const renderItem = (item: Subitem, depth = 0, path = ''): React.ReactNode => {
    const key = `${path}${item.label}`;

    return (
      <React.Fragment key={key}>
        <li className={`item level-${depth}`}>
          <span className="label">
            {item.subitens && (
              <button
                className="toggle-btn"
                onClick={() => toggleExpand(key)}
                aria-expanded={!!expanded[key]}
                aria-controls={`${key}-subitems`}
              >
                {expanded[key] ? <ChevronUp /> : <ChevronDown />}
              </button>
            )}
            {item.label}:
          </span>
          <span className="valor">
            {item.valor}
            <Info className="info-btn" onClick={() => handleInfoClick(item.label)} />
          </span>
        </li>
        {item.subitens && expanded[key] && (
          <ul id={`${key}-subitems`}>
            {item.subitens.map(sub => renderItem(sub, depth + 1, key + '/'))}
          </ul>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="carrossel-wrapper">
      <button className="nav-button left" onClick={handlePrev}>
        <ChevronLeft size={24} />
      </button>

      {dadoAtual ? (
        <div className="card">
          <h3>{dadoAtual.titulo}</h3>
          <ul>{dadoAtual.dados.map(item => renderItem(item))}</ul>
        </div>
      ) : (
        <div className="card">
          <p>Selecione um município para visualizar os dados.</p>
        </div>
      )}

      <button className="nav-button right" onClick={handleNext}>
        <ChevronRight size={24} />
      </button>

      {popup.visible && (
        <div className="info-popup-overlay" onClick={fecharPopup}>
          <div className="info-popup" onClick={e => e.stopPropagation()}>
            <h4>Explicação</h4>
            <p>{popup.label}</p>
            <button onClick={fecharPopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DadosCarrossel;
