// Pega os elementos da tela
const input = document.getElementById('taskInput');
const addButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const button1 = document.getElementById('sortAlphabetical');
const button2 = document.getElementById('sortByInsertion');

let insertionCounter = 0;

// Função que adiciona uma tarefa

function sortTaskList() {
  // 1. Captura todos os <li> atuais
  const items = Array.from(taskList.querySelectorAll('li'));

  // 2. Ordena pelo texto, ignorando maiúsculas/minúsculas
  items.sort((a, b) =>
    a.textContent.trim()
     .localeCompare(b.textContent.trim(), 'pt-BR', { sensitivity: 'base' })
  );

  // 3. Reinsere os itens na ordem correta
  items.forEach(li => taskList.appendChild(li));
}

function restoreInsertionOrder() {
  // 1. Pega todos os <li> como array
  const items = Array.from(taskList.querySelectorAll('li'));

  // 2. Ordena pelo atributo data-order (número de inserção)
  items.sort((a, b) =>
    Number(a.dataset.order) - Number(b.dataset.order)
  );

  // 3. Reanexa na ordem correta
  items.forEach(li => taskList.appendChild(li));
}

// Verifica se existe algo dentro da "taskList" caso verdadeiro altera a visibildiade dos botões
function buttonVisibility() {
  const items = taskList.getElementsByTagName('li');
  const displayValue = items.length > 0 ? 'block' : 'none';

  // faz button1.style.display = displayValue e depois button2.style.display = displayValue
  button1.style.display = button2.style.display = displayValue;
}

function addTask() {
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Por favor, digite uma tarefa!');
    return;
  }

  const formattedText =
  taskText.charAt(0).toUpperCase()
  + taskText.slice(1);

  // Cria um novo item de lista
  const li = document.createElement('li');
  li.textContent = formattedText;

  // salva a ordem original
  li.dataset.order = insertionCounter++;

  // Cria um botão de remover
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remover';

  // Evento para remover a tarefa
  removeBtn.addEventListener('click', function() {
    taskList.removeChild(li);
    buttonVisibility();
  });

  // Adiciona o item na lista
  taskList.appendChild(li);

  // Adiciona o botão de remover no item da lista
  li.appendChild(removeBtn);

  // Limpa o input
  input.value = '';
  buttonVisibility();
}

// Recebe o botão clicado e marca como ativo, removendo de todos os demais
function setActiveButton(activeBtn) {
  [ sortAlphabetical, sortByInsertion ].forEach(btn => {
    if (btn === activeBtn) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

// Quando clicar no botão, adiciona a tarefa
addButton.addEventListener('click', function() {
  addTask();
  buttonVisibility();
});

// Quando pressionar "Enter" no input, também adiciona a tarefa
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
    buttonVisibility();
  }
}); 

// “Ordenar A → Z”
sortAlphabetical.addEventListener('click', () => {
  sortTaskList();
  setActiveButton(sortAlphabetical);
});

// “Ordem de Inserção”
sortByInsertion.addEventListener('click', () => {
  restoreInsertionOrder();
  setActiveButton(sortByInsertion);
});