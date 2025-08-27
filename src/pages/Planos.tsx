import PlanoCard from '../components/planos/CardPlano';
import Sidebar from '../components/SideBar';
import '../styles/planosStyle/Planos.css';
import InfoPlano from '../components/planos/InfoPlano';

export default function Planos() {
  return (
    <div style={{ display: 'flex', background: '#f5f5f5' }}>
      <Sidebar />
      <div className="planos-container">
        <div style={{ padding: '40px 60px' }}>
          <h2>Escolha o Plano Ideal para Você</h2>
          <p>Compare nossos planos e encontre o que melhor atende suas necessidades.</p>
          
          <InfoPlano />

          <div className="cards-wrapper">
            <PlanoCard
              titulo="Básico"
              subtitulo="Para iniciantes"
              tipo="básico"
              beneficios={[
                'Dashboard básico',
                'Até 3 cidades',
                'Relatórios mensais',
                'Suporte por email'
              ]}
              desabilitados={[
                'Mapa interativo',
                'API de integração'
              ]}
              onClick={() => alert('Contato - Básico')}
            />

            <PlanoCard
              titulo="Profissional"
              subtitulo="Para corretores"
              destaque
              tipo="profissional"
              beneficios={[
                'Dashboard completo',
                'Cidades ilimitadas',
                'Relatórios semanais',
                'Suporte prioritário',
                'Mapa interativo'
              ]}
              desabilitados={[
                'API de integração'
              ]}
              onClick={() => alert('Contato - Profissional')}
            />

            <PlanoCard
              titulo="Empresarial"
              subtitulo="Para imobiliárias"
              tipo="empresarial"
              beneficios={[
                'Dashboard premium',
                'Múltiplas cidades',
                'Relatórios diários',
                'Suporte 24/7',
                'Mapa avançado',
                'API de integração'
              ]}
              onClick={() => alert('Contato - Empresarial')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
