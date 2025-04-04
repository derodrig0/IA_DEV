// script.js

document.addEventListener('DOMContentLoaded', function() {
  const medicamentosContainer = document.getElementById('medicamentos-container');
  const adicionarMedicamentoBotao = document.getElementById('adicionar-medicamento');
  const calcularHorariosBotao = document.getElementById('calcular-horarios');
  const horariosContainer = document.getElementById('horarios-container').getElementsByTagName('tbody')[0];

  let contadorMedicamentos = 1; // Contador para gerar IDs únicos para os novos formulários

  // Função para criar um novo formulário de medicamento
  function criarFormularioMedicamento() {
      contadorMedicamentos++;
      const novoFormulario = document.createElement('div');
      novoFormulario.classList.add('medicamento-form');
      novoFormulario.innerHTML = `
          <h2>Novo Medicamento</h2>
          <label for="nome-${contadorMedicamentos}">Nome do Medicamento:</label>
          <input type="text" id="nome-${contadorMedicamentos}" name="nome-${contadorMedicamentos}" required>

          <label for="frequencia-${contadorMedicamentos}">Frequência (em horas):</label>
          <input type="number" id="frequencia-${contadorMedicamentos}" name="frequencia-${contadorMedicamentos}" min="1" required>

          <label for="horario-inicial-${contadorMedicamentos}">Horário Inicial:</label>
          <input type="datetime-local" id="horario-inicial-${contadorMedicamentos}" name="horario-inicial-${contadorMedicamentos}" required>

          <label for="duracao-${contadorMedicamentos}">Duração (em dias):</label>
          <input type="number" id="duracao-${contadorMedicamentos}" name="duracao-${contadorMedicamentos}" min="1" required>
      `;
      return novoFormulario;
  }

  // Adiciona um novo formulário de medicamento ao clicar no botão
  adicionarMedicamentoBotao.addEventListener('click', function() {
      const novoFormulario = criarFormularioMedicamento();
      medicamentosContainer.appendChild(novoFormulario);
  });

  // Adiciona um ouvinte de evento para o botão de calcular horários
  calcularHorariosBotao.addEventListener('click', calcularEExibirHorarios);

  // Função que será chamada ao clicar no botão "Calcular Horários"
  function calcularEExibirHorarios() {
      // Coleta os dados dos medicamentos dos formulários ATUAIS
      const medicamentosFormulario = [];
      const formulariosMedicamentos = medicamentosContainer.querySelectorAll('.medicamento-form');

      formulariosMedicamentos.forEach(formulario => {
          const nomeMedicamento = formulario.querySelector('[name^="nome"]').value;
          const frequencia = parseInt(formulario.querySelector('[name^="frequencia"]').value);
          const horarioInicialInput = formulario.querySelector('[name^="horario-inicial"]').value;
          const duracaoDias = parseInt(formulario.querySelector('[name^="duracao"]').value);

          if (nomeMedicamento && !isNaN(frequencia) && horarioInicialInput && !isNaN(duracaoDias)) {
              medicamentosFormulario.push({
                  nome: nomeMedicamento,
                  frequencia: frequencia,
                  horarioInicial: horarioInicialInput,
                  duracao: duracaoDias
              });
          }
      });

      // Carrega os medicamentos salvos do localStorage
      const medicamentosSalvosJSON = localStorage.getItem('medicamentos');
      let medicamentosSalvos = [];
      if (medicamentosSalvosJSON) {
          medicamentosSalvos = JSON.parse(medicamentosSalvosJSON);
      }

      // Combina os medicamentos do formulário com os salvos
      const todosMedicamentos = [...medicamentosSalvos, ...medicamentosFormulario];

      // Salva todos os medicamentos no localStorage (incluindo os novos)
      if (todosMedicamentos.length > 0) {
          localStorage.setItem('medicamentos', JSON.stringify(todosMedicamentos));
      } else {
          localStorage.removeItem('medicamentos'); // Remove se não houver medicamentos
      }

      // Limpa a tabela de horários antes de exibir novos resultados
      horariosContainer.innerHTML = '';
      const todosHorarios = [];

      todosMedicamentos.forEach(medicamento => {
          const { nome, frequencia, horarioInicial, duracao } = medicamento;

          if (nome && !isNaN(frequencia) && horarioInicial && !isNaN(duracao)) {
              const horarioInicialDate = new Date(horarioInicial);
              const dataFinal = new Date(horarioInicialDate);
              dataFinal.setDate(horarioInicialDate.getDate() + duracao - 1);

              let horarioAtual = new Date(horarioInicialDate);

              while (horarioAtual <= dataFinal) {
                  todosHorarios.push({
                      medicamento: nome,
                      horario: new Date(horarioAtual)
                  });
                  horarioAtual.setTime(horarioAtual.getTime() + frequencia * 60 * 60 * 1000);
              }
          }
      });

      // Ordena os horários cronologicamente
      todosHorarios.sort((a, b) => a.horario - b.horario);

      // Exibe os horários na tabela
      todosHorarios.forEach(item => {
          const linha = horariosContainer.insertRow();
          const diaMesCelula = linha.insertCell();
          const diaSemanaCelula = linha.insertCell();
          const horarioCelula = linha.insertCell();
          const medicamentoCelula = linha.insertCell();

          const data = item.horario;
          const diaMes = data.getDate();
          const diaSemana = obterDiaSemana(data.getDay());
          const horarioFormatado = formatarHorario(data);

          diaMesCelula.textContent = diaMes < 10 ? `0${diaMes}` : diaMes;
          diaSemanaCelula.textContent = diaSemana;
          horarioCelula.textContent = horarioFormatado;
          medicamentoCelula.textContent = item.medicamento;
          medicamentoCelula.classList.add('medicamento-destaque');
      });

      if (todosHorarios.length === 0 && todosMedicamentos.length > 0) {
          alert('Por favor, verifique se os dados dos medicamentos salvos estão corretos.');
      } else if (todosMedicamentos.length === 0) {
          alert('Por favor, adicione pelo menos um medicamento para calcular os horários.');
      }

      // Limpa o formulário inicial após o cálculo
      if (formulariosMedicamentos.length > 0) {
          formulariosMedicamentos[0].querySelector('[name^="nome"]').value = '';
          formulariosMedicamentos[0].querySelector('[name^="frequencia"]').value = '';
          formulariosMedicamentos[0].querySelector('[name^="horario-inicial"]').value = '';
          formulariosMedicamentos[0].querySelector('[name^="duracao"]').value = '';

          // Remove os formulários adicionais, mantendo apenas o primeiro vazio
          for (let i = formulariosMedicamentos.length - 1; i > 0; i--) {
              medicamentosContainer.removeChild(formulariosMedicamentos[i]);
              contadorMedicamentos--;
          }
      }
  }

  // Função auxiliar para obter o dia da semana por extenso
  function obterDiaSemana(dia) {
      const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      return dias[dia];
  }

  // Função auxiliar para formatar a hora no formato HH:MM
  function formatarHorario(data) {
      const horas = data.getHours().toString().padStart(2, '0');
      const minutos = data.getMinutes().toString().padStart(2, '0');
      return `${horas}:${minutos}`;
  }

  // Carrega os dados dos medicamentos do localStorage ao carregar a página e calcula os horários
  function carregarMedicamentosSalvosEExibir() {
      const medicamentosSalvosJSON = localStorage.getItem('medicamentos');
      if (medicamentosSalvosJSON) {
          // Os dados serão carregados e usados diretamente na função calcularEExibirHorarios
      }
      calcularEExibirHorarios(); // Chama para exibir os horários com base nos dados carregados (e possíveis novos)
  }

  // Chama a função para carregar e exibir ao carregar a página
  carregarMedicamentosSalvosEExibir();
});