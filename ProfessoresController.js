const professores = [
    {
        "id": "1",
        "nome": "Prof. Carlos",
        "idade": 40,
        "departamento": "Matemática",
        "turmas": [
            { "codigo": "9A", "disciplina": "MAT101", "alunos": ["João", "Maria", "Pedro"] },
            { "codigo": "10A", "disciplina": "MAT201", "alunos": ["Ana", "Luiz"] }
        ]
    },
    {
        "id": "2",
        "nome": "Prof. Ana",
        "idade": 35,
        "departamento": "História",

        "turmas": [
            { "codigo": "9A", "disciplina": "HIS101", "alunos": ["João", "Pedro"] },
            { "codigo": "10B", "disciplina": "HIS201", "alunos": ["Maria", "Carlos", "Luiza"] }
        ]
    },
    {
        "id": "3",
        "nome": "Prof. João",
        "idade": 50,
        "departamento": "Ciências",
        "turmas": [
            { "codigo": "9A", "disciplina": "CIE101", "alunos": ["João", "Maria"] },
            { "codigo": "9B", "disciplina": "CIE101", "alunos": ["Pedro", "Luiz"] }
        ]
    }

];

exports.getAllUsers = (req, res) => {
    res.json(professores);
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  res.json(professor);
};

exports.getUserByIdTurmas = (req, res) => {
  const id = req.params.id;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }
  res.json(professor.turmas);
};

exports.attProfessor = (req, res) => {
  const id = req.params.id;
  const professorIndex = professores.findIndex(p => p.id === id);

  if (professorIndex === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const { nome, idade, departamento } = req.body;
  professores[professorIndex] = {
    ...professores[professorIndex],
    nome: nome ?? professores[professorIndex].nome,
    idade: idade ?? professores[professorIndex].idade,
    departamento: departamento ?? professores[professorIndex].departamento
  };

  res.json({
    mensagem: "Professor atualizado com sucesso",
    professor: professores[professorIndex]
  });
};

exports.addTurma = (req, res) => {
  const id = req.params.id;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const { codigo, disciplina, alunos } = req.body;

  if (!codigo || !disciplina || !alunos) {
    return res.status(400).json({ mensagem: "Campos obrigatórios: codigo, disciplina e alunos" });
  }

  const novaTurma = { codigo, disciplina, alunos };
  professor.turmas.push(novaTurma);

  res.status(201).json({
    mensagem: "Turma adicionada com sucesso",
    turmas: professor.turmas
  });
};

exports.listaDep = (req, res) => {
  const { departamento } = req.params;

  if (!departamento) {
    return res.status(400).json({ mensagem: "Informe o departamento na URL" });
  }

  const filtrados = professores.filter(
    p => p.departamento.toLowerCase() === departamento.toLowerCase()
  );

  if (filtrados.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum professor encontrado nesse departamento" });
  }

  res.json(filtrados);
};

exports.ProfessorDelete = (req, res) => {
  const id = req.params.id;
  const index = professores.findIndex(p => String(p.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  professores.splice(index, 1);

  res.status(200).json({ mensagem: "Professor removido com sucesso" });
};