-- Schema do Sistema de Gestão de Atendimento Médico
-- PostgreSQL 14+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Usuários (autenticação)
CREATE TABLE usuario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'medico', 'recepcionista')),
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    ativo BOOLEAN DEFAULT true
);

-- Tabela de Pacientes
CREATE TABLE paciente (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuario(id),
    nome VARCHAR(200) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(150),
    endereco VARCHAR(300),
    alergias TEXT,
    medicamentos_uso TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Médicos
CREATE TABLE medico (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuario(id),
    nome VARCHAR(200) NOT NULL,
    crm VARCHAR(20) UNIQUE NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Agendamentos
CREATE TABLE agendamento (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES paciente(id),
    medico_id UUID NOT NULL REFERENCES medico(id),
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'agendado' CHECK (status IN ('agendado', 'confirmado', 'em_atendimento', 'concluido', 'cancelado')),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Prontuários
CREATE TABLE prontuario (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES paciente(id),
    medico_id UUID NOT NULL REFERENCES medico(id),
    agendamento_id UUID REFERENCES agendamento(id),
    data_atendimento DATE NOT NULL,
    anamnese TEXT,
    exame_fisico TEXT,
    diagnostico_cid VARCHAR(20),
    prescricao TEXT,
    exames_solicitados TEXT,
    assinatura_digital TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Registros Financeiros
CREATE TABLE registro_financeiro (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agendamento_id UUID REFERENCES agendamento(id),
    paciente_id UUID NOT NULL REFERENCES paciente(id),
    valor DECIMAL(10,2) NOT NULL,
    forma_pagamento VARCHAR(20) CHECK (forma_pagamento IN ('dinheiro', 'cartao_credito', 'cartao_debito', 'pix', 'convenio')),
    status_pagamento VARCHAR(20) DEFAULT 'pendente' CHECK (status_pagamento IN ('pendente', 'pago', 'cancelado')),
    data_vencimento DATE,
    data_pagamento DATE,
    convenio VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Logs de Auditoria
CREATE TABLE log_auditoria (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuario(id),
    acao VARCHAR(50) NOT NULL,
    entidade VARCHAR(50) NOT NULL,
    entidade_id UUID,
    dados_anteriores TEXT,
    dados_novos TEXT,
    ip_origem VARCHAR(45),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_agendamento_data ON agendamento(data);
CREATE INDEX idx_agendamento_medico ON agendamento(medico_id);
CREATE INDEX idx_prontuario_paciente ON prontuario(paciente_id);
CREATE INDEX idx_log_auditoria_usuario ON log_auditoria(usuario_id);
CREATE INDEX idx_log_auditoria_entidade ON log_auditoria(entidade, entidade_id);
