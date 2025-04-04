# Calculador de Horários de Remédio

Este é um web app simples desenvolvido com HTML, CSS e JavaScript, apenas orientando a IA Gemini no processo de criação, para ajudar os usuários a calcular e visualizar os horários em que precisam tomar seus medicamentos, 
com base na frequência prescrita pelo médico e no horário inicial de administração. Os dados dos medicamentos 
são armazenados localmente no navegador utilizando `localStorage`, permitindo que o usuário consulte os horários mesmo após fechar o navegador.

## Funcionalidades

* **Adição de múltiplos medicamentos:** Permite ao usuário adicionar informações sobre diversos medicamentos, incluindo nome, frequência (em horas), horário inicial e duração do tratamento (em dias).
* **Cálculo automático dos horários:** Com base nas informações fornecidas, o aplicativo calcula os próximos horários de tomada para cada medicamento durante o período especificado.
* **Visualização em formato de grid:** Os horários são exibidos em uma tabela clara, mostrando o dia do mês, dia da semana, horário e o nome do medicamento (em destaque).
* **Persistência local dos dados:** As informações dos medicamentos são salvas no navegador do usuário utilizando `localStorage`. Isso significa que os dados serão mantidos mesmo após o fechamento do navegador, facilitando consultas futuras.
* **Interface responsiva:** O layout da página foi projetado para se adaptar a diferentes tamanhos de tela, desde dispositivos móveis até desktops.

## Como Usar

1.  Abra o arquivo `index.html` no seu navegador web.
2.  No formulário "Novo Medicamento", insira o nome do medicamento, a frequência com que ele deve ser tomado (em horas), o horário inicial da primeira dose (data e hora) e a duração do tratamento (em dias).
3.  Se você precisar adicionar mais medicamentos, clique no botão "Adicionar Outro Medicamento" e preencha os campos para o novo medicamento.
4.  Após inserir todos os medicamentos, clique no botão "Calcular Horários".
5.  A tabela abaixo exibirá os horários de tomada para cada medicamento durante o período especificado.
6.  Ao fechar e reabrir a página, os medicamentos que você cadastrou anteriormente serão carregados automaticamente, e os horários serão recalculados e exibidos.

## Tecnologias Utilizadas

* HTML
* CSS
* JavaScript
* `localStorage` para persistência de dados

## Estrutura de Arquivos

calculador-de-remedios/
├── index.html
├── style.css
└── script.js
└── README.md


* `index.html`: Contém a estrutura HTML da página web.
* `style.css`: Define os estilos visuais da página.
* `script.js`: Contém a lógica JavaScript para o cálculo dos horários e a interação com o `localStorage`.
* `README.md`: Este arquivo, com informações sobre o projeto.
* `Documentação do Projeto.docx`: Arquivo contendo toda a documentação do Projeto.

## Próximos Passos (Sugestões de Melhorias)

* Permitir ao usuário editar ou remover medicamentos já cadastrados.
* Implementar notificações (lembretes) para os horários de tomada.
* Opção para exportar os horários para um arquivo (por exemplo, CSV ou PDF).
* Melhorias na interface do usuário e na experiência do usuário.

## Contribuição

Contribuições são bem-vindas! Se você tiver alguma sugestão de melhoria ou encontrar algum problema, por favor, abra uma issue ou envie um pull request.

## Autor

[Rodrigo Alves da Rosa/ DeRodrigo]