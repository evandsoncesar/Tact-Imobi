import React, { useState } from "react";
import StepIndicator from "./StepIndicator";

interface FormData {
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  endereco: string;
  inscricaoMunicipal: string;
  inscricaoEstadual: string;
  cidades: string;
  respLegalNome: string;
  respLegalEmail: string;
  respLegalCargo: string;
  respLegalCPF: string;
  respFinanceiroNome: string;
  respFinanceiroEmail: string;
  respFinanceiroTelefone: string;
  meioPagamento: string;
  usuarioEmail: string;
  senha: string;
  confirmarSenha: string;
}

export default function CadastroForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    endereco: "",
    inscricaoMunicipal: "",
    inscricaoEstadual: "",
    cidades: "",
    respLegalNome: "",
    respLegalEmail: "",
    respLegalCargo: "",
    respLegalCPF: "",
    respFinanceiroNome: "",
    respFinanceiroEmail: "",
    respFinanceiroTelefone: "",
    meioPagamento: "",
    usuarioEmail: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // valida o campo em tempo real
    setErrors({ ...errors, [name]: validateField(name as keyof FormData, value) });
  };

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "cnpj":
        return /^\d{14}$/.test(value) ? "" : "CNPJ deve ter 14 números";
      case "respLegalEmail":
      case "respFinanceiroEmail":
      case "usuarioEmail":
        return /\S+@\S+\.\S+/.test(value) ? "" : "E-mail inválido";
      case "senha":
      case "confirmarSenha":
        return value.length >= 6 ? "" : "Senha deve ter pelo menos 6 caracteres";
      case "respLegalCPF":
        return /^\d{11}$/.test(value) ? "" : "CPF deve ter 11 números";
      default:
        return value.trim() ? "" : "Campo obrigatório";
    }
  };

  const handleNext = () => {
    // valida todos os campos da etapa atual antes de avançar
    const currentStepFields: (keyof FormData)[] =
      step === 1
        ? ["razaoSocial","nomeFantasia","cnpj","endereco","inscricaoMunicipal","inscricaoEstadual","cidades"]
        : step === 2
        ? ["respLegalNome","respLegalEmail","respLegalCargo","respLegalCPF"]
        : step === 3
        ? ["respFinanceiroNome","respFinanceiroEmail","respFinanceiroTelefone","meioPagamento"]
        : [];
    const stepErrors: Partial<FormData> = {};
    currentStepFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) stepErrors[field] = error;
    });
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validação final da etapa 4
    const finalErrors: Partial<FormData> = {};
    ["usuarioEmail","senha","confirmarSenha"].forEach((field) => {
      const error = validateField(field as keyof FormData, formData[field as keyof FormData]);
      if (error) finalErrors[field as keyof FormData] = error;
    });
    if (formData.senha !== formData.confirmarSenha) {
      finalErrors.confirmarSenha = "Senhas não conferem";
    }
    setErrors(finalErrors);
    if (Object.keys(finalErrors).length === 0) {
      console.log("Dados enviados:", formData);
      alert("Cadastro realizado com sucesso!");
    }
  };

  return (
    <form className="cadastro-form" onSubmit={handleSubmit}>
      <StepIndicator totalSteps={4} currentStep={step} />

      <div className="form-inner">
        {step === 1 && (
          <>
            <h2 className="form-title">Etapa 1 - Dados da Empresa</h2>

            <div className="form-group">
              <label>Razão Social</label>
              <input
                name="razaoSocial"
                placeholder="Digite a razão social"
                value={formData.razaoSocial}
                onChange={handleChange}
              />
              {errors.razaoSocial && <span className="error">{errors.razaoSocial}</span>}
            </div>

            <div className="form-group">
              <label>Nome Fantasia</label>
              <input
                name="nomeFantasia"
                placeholder="Digite o nome fantasia"
                value={formData.nomeFantasia}
                onChange={handleChange}
              />
              {errors.nomeFantasia && <span className="error">{errors.nomeFantasia}</span>}
            </div>

            <div className="form-group">
              <label>CNPJ</label>
              <input
                name="cnpj"
                placeholder="Apenas números, 14 dígitos"
                value={formData.cnpj}
                onChange={handleChange}
              />
              {errors.cnpj && <span className="error">{errors.cnpj}</span>}
            </div>

            <div className="form-group">
              <label>Endereço</label>
              <input
                name="endereco"
                placeholder="Digite o endereço"
                value={formData.endereco}
                onChange={handleChange}
              />
              {errors.endereco && <span className="error">{errors.endereco}</span>}
            </div>

            <div className="form-group">
              <label>Inscrição Municipal</label>
              <input
                name="inscricaoMunicipal"
                placeholder="Digite a inscrição municipal"
                value={formData.inscricaoMunicipal}
                onChange={handleChange}
              />
              {errors.inscricaoMunicipal && <span className="error">{errors.inscricaoMunicipal}</span>}
            </div>

            <div className="form-group">
              <label>Inscrição Estadual</label>
              <input
                name="inscricaoEstadual"
                placeholder="Digite a inscrição estadual"
                value={formData.inscricaoEstadual}
                onChange={handleChange}
              />
              {errors.inscricaoEstadual && <span className="error">{errors.inscricaoEstadual}</span>}
            </div>

            <div className="form-group">
              <label>Cidades</label>
              <input
                name="cidades"
                placeholder="Digite as cidades atendidas"
                value={formData.cidades}
                onChange={handleChange}
              />
              {errors.cidades && <span className="error">{errors.cidades}</span>}
            </div>

            <div className="button-group">
            <button type="button" onClick={handleNext} className="cadastro-button">
                Próxima Etapa
            </button>
            </div>
          </>
        )}

      {step === 2 && (
        <>
            <h2 className="form-title">Etapa 2 - Responsável Legal</h2>

            <div className="form-group">
            <label>Nome completo</label>
            <input
                name="respLegalNome"
                placeholder="Digite o nome completo"
                value={formData.respLegalNome}
                onChange={handleChange}
            />
            {errors.respLegalNome && <span className="error">{errors.respLegalNome}</span>}
            </div>

            <div className="form-group">
            <label>E-mail</label>
            <input
                name="respLegalEmail"
                placeholder="Digite o e-mail"
                value={formData.respLegalEmail}
                onChange={handleChange}
            />
            {errors.respLegalEmail && <span className="error">{errors.respLegalEmail}</span>}
            </div>

            <div className="form-group">
            <label>Cargo</label>
            <input
                name="respLegalCargo"
                placeholder="Digite o cargo"
                value={formData.respLegalCargo}
                onChange={handleChange}
            />
            {errors.respLegalCargo && <span className="error">{errors.respLegalCargo}</span>}
            </div>

            <div className="form-group">
            <label>CPF</label>
            <input
                name="respLegalCPF"
                placeholder="Apenas números, 11 dígitos"
                value={formData.respLegalCPF}
                onChange={handleChange}
            />
            {errors.respLegalCPF && <span className="error">{errors.respLegalCPF}</span>}
            </div>

            <div className="button-group">
            <button type="button" onClick={handleBack} className="cadastro-button secondary">
                Voltar
            </button>
            <button type="button" onClick={handleNext} className="cadastro-button">
                Próxima Etapa
            </button>
            </div>
        </>
        )}


      {step === 3 && (
        <>
            <h2 className="form-title">Etapa 3 - Responsável Financeiro e Meio de Pagamento</h2>

            <div className="form-group">
            <label>Nome</label>
            <input
                name="respFinanceiroNome"
                placeholder="Digite o nome"
                value={formData.respFinanceiroNome}
                onChange={handleChange}
            />
            {errors.respFinanceiroNome && <span className="error">{errors.respFinanceiroNome}</span>}
            </div>

            <div className="form-group">
            <label>E-mail</label>
            <input
                name="respFinanceiroEmail"
                placeholder="Digite o e-mail"
                value={formData.respFinanceiroEmail}
                onChange={handleChange}
            />
            {errors.respFinanceiroEmail && <span className="error">{errors.respFinanceiroEmail}</span>}
            </div>

            <div className="form-group">
            <label>Telefone</label>
            <input
                name="respFinanceiroTelefone"
                placeholder="Digite o telefone"
                value={formData.respFinanceiroTelefone}
                onChange={handleChange}
            />
            {errors.respFinanceiroTelefone && <span className="error">{errors.respFinanceiroTelefone}</span>}
            </div>

            <div className="form-group">
            <label>Meio de Pagamento</label>
            <select name="meioPagamento" value={formData.meioPagamento} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="boleto">Boleto</option>
                <option value="pix">PIX</option>
            </select>
            {errors.meioPagamento && <span className="error">{errors.meioPagamento}</span>}
            </div>

            <div className="button-group">
            <button type="button" onClick={handleBack} className="cadastro-button secondary">
                Voltar
            </button>
            <button type="button" onClick={handleNext} className="cadastro-button">
                Próxima Etapa
            </button>
            </div>
        </>
        )}

      {step === 4 && (
        <>
            <h2 className="form-title">Etapa 4 - Cadastro na Plataforma</h2>

            <div className="form-group">
            <label>E-mail</label>
            <input
                name="usuarioEmail"
                placeholder="Digite seu e-mail"
                value={formData.usuarioEmail}
                onChange={handleChange}
            />
            {errors.usuarioEmail && <span className="error">{errors.usuarioEmail}</span>}
            </div>

            <div className="form-group">
            <label>Senha</label>
            <input
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
            />
            {errors.senha && <span className="error">{errors.senha}</span>}
            </div>

            <div className="form-group">
            <label>Confirmar Senha</label>
            <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
            />
            {errors.confirmarSenha && <span className="error">{errors.confirmarSenha}</span>}
            </div>

            <div className="button-group">
            <button type="button" onClick={handleBack} className="cadastro-button secondary">
                Voltar
            </button>
            <button type="submit" className="cadastro-button">
                Finalizar Cadastro
            </button>
            </div>
        </>
        )}
      </div>
    </form>
  );
}
