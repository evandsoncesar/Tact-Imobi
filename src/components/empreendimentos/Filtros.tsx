export interface Filtros {
  pesquisa: string;
  estado: string;
  municipio: string;
  precoMin?: number;
  precoMax?: number;
  metragemMin?: number;
  metragemMax?: number;
  quartos?: number[];
  suites?: number[];
  vagasSelecionadas?: number[];
  tipoSelecionado?: string[];
  faseSelecionada?: string[];
  segmentoSelecionado?: string[];
}

export type FiltrosSemPesquisa = Omit<Filtros, 'pesquisa'>;