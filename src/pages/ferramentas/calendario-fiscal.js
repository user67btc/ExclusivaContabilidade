import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import SEOHead from '../../components/SEOHead';
import { useInView } from 'react-intersection-observer';
import ShareTools from '../../components/common/ShareTools';

const CalendarioFiscal = () => {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [eventos, setEventos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [loading, setLoading] = useState(true);

  // Hook de animação para elementos que entram na viewport
  const { ref: titleRef, inView: titleVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Nomes dos meses em português
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Carregar eventos para o mês e ano selecionados
  useEffect(() => {
    setLoading(true);
    
    // Simular carregamento de dados (em produção, isso seria uma chamada de API)
    setTimeout(() => {
      setEventos(gerarEventosMes(mesAtual, anoAtual));
      setLoading(false);
    }, 600);
    
    // Registro de evento no Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calendario_fiscal_view', {
        'event_category': 'engagement',
        'event_label': `${meses[mesAtual]}_${anoAtual}`,
      });
    }
  }, [mesAtual, anoAtual]);

  // Função para gerar eventos fiscais para o mês/ano selecionados
  const gerarEventosMes = (mes, ano) => {
    // Esta é uma versão simplificada. Em produção, esses dados viriam de uma API ou banco de dados
    const eventosBase = [
      // Eventos mensais (acontecem todo mês)
      { 
        dia: 7, 
        titulo: 'FGTS', 
        descricao: 'Pagamento do FGTS referente à competência anterior',
        tipo: 'trabalhista',
        link: 'https://www.gov.br/receitafederal/pt-br',
        importante: false
      },
      { 
        dia: 10, 
        titulo: 'IPI', 
        descricao: 'Pagamento do IPI apurado no mês anterior',
        tipo: 'federal',
        link: 'https://www.gov.br/receitafederal/pt-br',
        importante: false
      },
      { 
        dia: 15, 
        titulo: 'PIS/COFINS', 
        descricao: 'Recolhimento de PIS/COFINS - Regime não cumulativo',
        tipo: 'federal',
        link: 'https://www.gov.br/receitafederal/pt-br',
        importante: true
      },
      { 
        dia: 20, 
        titulo: 'INSS', 
        descricao: 'Recolhimento das contribuições previdenciárias de pessoas jurídicas',
        tipo: 'previdenciario',
        link: 'https://www.gov.br/inss/pt-br',
        importante: true
      },
      { 
        dia: 20, 
        titulo: 'IRRF', 
        descricao: 'Recolhimento do Imposto de Renda Retido na Fonte',
        tipo: 'federal',
        link: 'https://www.gov.br/receitafederal/pt-br',
        importante: true
      },
      { 
        dia: 20, 
        titulo: 'Simples Nacional', 
        descricao: 'Pagamento unificado de impostos do Simples Nacional',
        tipo: 'federal',
        link: 'https://www8.receita.fazenda.gov.br/SimplesNacional/',
        importante: true
      },
      { 
        dia: 25, 
        titulo: 'ICMS', 
        descricao: 'Recolhimento do ICMS para contribuintes em geral',
        tipo: 'estadual',
        link: 'https://www.sefaz.ms.gov.br/',
        importante: true
      },
    ];

    // Eventos específicos por mês
    const eventosEspecificos = {
      // Janeiro
      0: [
        { 
          dia: 31, 
          titulo: 'IRPJ/CSLL - Trimestral', 
          descricao: 'Pagamento da 1ª quota ou quota única do IRPJ e CSLL - 4º trimestre do ano anterior',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: true
        },
        { 
          dia: 31, 
          titulo: 'DIRF', 
          descricao: 'Entrega da Declaração do Imposto de Renda Retido na Fonte',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: true
        },
      ],
      // Fevereiro
      1: [
        { 
          dia: 28, 
          titulo: 'Comprovante de Rendimentos', 
          descricao: 'Fornecimento do Comprovante de Rendimentos Pagos e Retenções do ano anterior',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: true
        },
      ],
      // Março
      2: [
        { 
          dia: 31, 
          titulo: 'Declaração de Capitais Brasileiros', 
          descricao: 'Entrega da Declaração de Capitais Brasileiros no Exterior (CBE) ao Banco Central',
          tipo: 'federal',
          link: 'https://www.bcb.gov.br/',
          importante: true
        },
      ],
      // Abril
      3: [
        { 
          dia: 30, 
          titulo: 'IRPJ/CSLL - Trimestral', 
          descricao: 'Pagamento da 1ª quota ou quota única do IRPJ e CSLL - 1º trimestre',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: true
        },
        { 
          dia: 30, 
          titulo: 'DEFIS', 
          descricao: 'Entrega da Declaração de Informações Socioeconômicas e Fiscais (DEFIS)',
          tipo: 'federal',
          link: 'https://www8.receita.fazenda.gov.br/SimplesNacional/',
          importante: true
        },
      ],
      // Maio
      4: [
        { 
          dia: 31, 
          titulo: 'ECD', 
          descricao: 'Entrega da Escrituração Contábil Digital (ECD)',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: true
        },
      ],
      // Junho
      5: [
        { 
          dia: 30, 
          titulo: 'ECF', 
          descricao: 'Entrega da Escrituração Contábil Fiscal (ECF)',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: true
        },
      ],
      // Julho
      6: [
        { 
          dia: 31, 
          titulo: 'IRPJ/CSLL - Trimestral', 
          descricao: 'Pagamento da 1ª quota ou quota única do IRPJ e CSLL - 2º trimestre',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: true
        },
      ],
      // Agosto
      7: [],
      // Setembro
      8: [
        { 
          dia: 30, 
          titulo: 'DCTF-Web anual', 
          descricao: 'Entrega da DCTF-Web anual para entidades isentas',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: false
        },
      ],
      // Outubro
      9: [
        { 
          dia: 31, 
          titulo: 'IRPJ/CSLL - Trimestral', 
          descricao: 'Pagamento da 1ª quota ou quota única do IRPJ e CSLL - 3º trimestre',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: true
        },
      ],
      // Novembro
      10: [
        { 
          dia: 30, 
          titulo: 'DIPJ - IMUNES', 
          descricao: 'Entrega da DIPJ para entidades imunes e isentas',
          tipo: 'federal',
          link: 'https://www.gov.br/receitafederal/pt-br',
          importante: false
        },
      ],
      // Dezembro
      11: [
        { 
          dia: 20, 
          titulo: '13º Salário', 
          descricao: 'Pagamento da 2ª parcela do 13º salário',
          tipo: 'trabalhista',
          link: 'https://www.gov.br/trabalho/pt-br',
          importante: true
        },
      ],
    };

    // Combinar eventos base com eventos específicos
    let eventosMes = [...eventosBase];
    
    if (eventosEspecificos[mes]) {
      eventosMes = [...eventosMes, ...eventosEspecificos[mes]];
    }
    
    // Ajustar datas para evitar fins de semana (simplificado)
    return eventosMes
      .sort((a, b) => a.dia - b.dia)
      .map(evento => {
        // Criar objeto Date para o evento
        const dataEvento = new Date(ano, mes, evento.dia);
        
        // Verificar se cai em fim de semana
        const diaSemana = dataEvento.getDay(); // 0 = Domingo, 6 = Sábado
        
        // Ajustar para próximo dia útil se for fim de semana
        if (diaSemana === 0) { // Domingo
          evento.diaOriginal = evento.dia;
          evento.dia += 1; // Passa para segunda
          evento.observacao = "Data ajustada: cai no domingo, prorrogado para segunda-feira";
        } else if (diaSemana === 6) { // Sábado
          evento.diaOriginal = evento.dia;
          evento.dia += 2; // Passa para segunda
          evento.observacao = "Data ajustada: cai no sábado, prorrogado para segunda-feira";
        }
        
        return evento;
      });
  };

  // Trocar para mês anterior
  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  };

  // Trocar para próximo mês
  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  };

  // Filtra eventos pelo tipo
  const eventosFiltrados = filtro === 'todos'
    ? eventos
    : eventos.filter(evento => evento.tipo === filtro);

  // Verifica se há eventos hoje
  const hoje = new Date();
  const eventosHoje = eventos.filter(
    evento => evento.dia === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear()
  );

  return (
    <Layout>
      <SEOHead
        title="Calendário Fiscal | Exclusiva Contabilidade"
        description="Calendário atualizado de obrigações fiscais, tributárias e trabalhistas para empresas. Não perca prazos importantes com este guia completo."
        canonicalUrl="/ferramentas/calendario-fiscal"
        ogType="website"
      />
      
      <div className="container py-5">
        <div 
          ref={titleRef}
          className={`mb-5 text-center ${titleVisible ? 'animate__animated animate__fadeInDown' : ''}`}
        >
          <h1 className="display-5 fw-bold text-primary mb-3">Calendário Fiscal</h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Acompanhe os prazos das principais obrigações fiscais, tributárias e trabalhistas.
            Mantenha sua empresa em dia com o governo.
          </p>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon">
              <i className="far fa-calendar-check"></i>
            </div>
            <div className="divider-custom-line"></div>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Controles do calendário */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex align-items-center mb-3 mb-md-0">
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={mesAnterior}
                    >
                      <i className="far fa-chevron-left"></i>
                    </button>
                    
                    <h2 className="h3 mb-0 text-primary fw-bold">
                      {meses[mesAtual]} de {anoAtual}
                    </h2>
                    
                    <button
                      className="btn btn-outline-primary ms-2"
                      onClick={proximoMes}
                    >
                      <i className="far fa-chevron-right"></i>
                    </button>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <label htmlFor="filtroTipo" className="me-2 fw-medium text-muted">Filtrar por:</label>
                    <select
                      id="filtroTipo"
                      className="form-select"
                      value={filtro}
                      onChange={(e) => setFiltro(e.target.value)}
                    >
                      <option value="todos">Todos os tipos</option>
                      <option value="federal">Federais</option>
                      <option value="estadual">Estaduais</option>
                      <option value="municipal">Municipais</option>
                      <option value="trabalhista">Trabalhistas</option>
                      <option value="previdenciario">Previdenciários</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas de eventos para hoje */}
            {eventosHoje.length > 0 && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear() && (
              <div className="alert alert-warning mb-4" role="alert">
                <div className="d-flex">
                  <div className="me-3">
                    <i className="far fa-exclamation-circle fa-2x text-warning"></i>
                  </div>
                  <div>
                    <h5 className="alert-heading">Vencimentos hoje!</h5>
                    <p className="mb-1">Você tem {eventosHoje.length} obrigação(ões) com vencimento hoje:</p>
                    <ul className="mb-0 ps-3">
                      {eventosHoje.map((evento, index) => (
                        <li key={`hoje-${index}`}><strong>{evento.titulo}</strong> - {evento.descricao}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Lista de eventos */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3 border-0">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <h3 className="h5 fw-bold mb-0">
                    <i className="far fa-clipboard-list me-2 text-primary"></i>
                    Obrigações do mês
                  </h3>
                  
                  <div className="legend d-flex flex-wrap gap-3">
                    <span className="badge-legend">
                      <span className="badge bg-danger">!</span> Importante
                    </span>
                    <span className="badge-legend">
                      <span className="badge bg-federal"></span> Federal
                    </span>
                    <span className="badge-legend">
                      <span className="badge bg-estadual"></span> Estadual
                    </span>
                    <span className="badge-legend">
                      <span className="badge bg-trabalhista"></span> Trabalhista
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="mt-3 text-muted">Carregando obrigações...</p>
                  </div>
                ) : eventosFiltrados.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="far fa-calendar-xmark fa-3x text-muted mb-3"></i>
                    <h4 className="text-muted">Nenhuma obrigação encontrada</h4>
                    <p>Não foram encontradas obrigações para o filtro selecionado.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th style={{width: "70px"}}>Dia</th>
                          <th style={{width: "160px"}}>Obrigação</th>
                          <th>Descrição</th>
                          <th style={{width: "120px"}}>Tipo</th>
                          <th style={{width: "100px"}} className="text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventosFiltrados.map((evento, index) => {
                          // Verificar se a data é hoje
                          const isHoje = evento.dia === hoje.getDate() && 
                                       mesAtual === hoje.getMonth() && 
                                       anoAtual === hoje.getFullYear();
                                       
                          // Definir classe CSS com base no tipo
                          let tipoBadgeClass = 'bg-light text-dark';
                          if (evento.tipo === 'federal') tipoBadgeClass = 'bg-federal';
                          if (evento.tipo === 'estadual') tipoBadgeClass = 'bg-estadual';
                          if (evento.tipo === 'municipal') tipoBadgeClass = 'bg-municipal';
                          if (evento.tipo === 'trabalhista') tipoBadgeClass = 'bg-trabalhista';
                          if (evento.tipo === 'previdenciario') tipoBadgeClass = 'bg-previdenciario';
                          
                          return (
                            <tr key={index} className={isHoje ? 'table-warning' : ''}>
                              <td className="align-middle">
                                <span className={`dia-badge ${isHoje ? 'bg-warning' : ''}`}>
                                  {evento.dia}
                                </span>
                              </td>
                              <td className="align-middle">
                                <strong>{evento.titulo}</strong>
                                {evento.importante && (
                                  <span className="ms-2 badge bg-danger">!</span>
                                )}
                              </td>
                              <td className="align-middle">
                                {evento.descricao}
                                {evento.observacao && (
                                  <small className="text-muted d-block">
                                    <i className="far fa-info-circle me-1"></i>
                                    {evento.observacao}
                                  </small>
                                )}
                              </td>
                              <td className="align-middle">
                                <span className={`badge ${tipoBadgeClass}`}>
                                  {evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}
                                </span>
                              </td>
                              <td className="align-middle text-center">
                                <a 
                                  href={evento.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-outline-primary"
                                >
                                  <i className="far fa-external-link"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            
            {/* Componente de compartilhamento */}
            <ShareTools 
              title="Calendário Fiscal - Exclusiva Contabilidade" 
              description="Consulte as principais obrigações fiscais, tributárias e trabalhistas do mês."
              className="my-4"
            />

            <div className="mt-2 d-flex flex-column flex-md-row align-items-center justify-content-between">
              <small className="text-muted mb-3 mb-md-0">
                <i className="far fa-info-circle me-1"></i>
                Este calendário é apenas informativo. Consulte seu contador ou os sites oficiais para confirmar as datas.
              </small>
              
              <a 
                href="/contato" 
                className="btn btn-sm btn-primary"
              >
                <i className="far fa-calendar-plus me-2"></i>
                Adicionar lembrete personalizado
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos customizados */}
      <style jsx>{`
        .dia-badge {
          display: inline-block;
          width: 36px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          border-radius: 50%;
          background-color: #f0f0f0;
          font-weight: bold;
        }
        
        .badge-legend {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          color: #6c757d;
        }
        
        .badge-legend .badge {
          margin-right: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }
        
        .bg-federal {
          background-color: #0d6efd !important;
          color: white;
        }
        
        .bg-estadual {
          background-color: #6610f2 !important;
          color: white;
        }
        
        .bg-municipal {
          background-color: #6f42c1 !important;
          color: white;
        }
        
        .bg-trabalhista {
          background-color: #fd7e14 !important;
          color: white;
        }
        
        .bg-previdenciario {
          background-color: #198754 !important;
          color: white;
        }
      `}</style>
    </Layout>
  );
};

export default CalendarioFiscal;
