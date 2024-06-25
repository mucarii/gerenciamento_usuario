// Dados de exemplo
let users = [
    { id: 1, username: 'Bruce Wayne', email: 'bruce.wayne@example.com' },
    { id: 2, username: 'Clark Kent', email: 'c_kent@example.com' },
    { id: 3, username: 'Diana Prince', email: 'diana.prince@example.com' },
    { id: 4, username: 'Barry Allen', email: 'barry.allen@example.com' },
    { id: 5, username: 'Hal Jordan', email: 'hal.jordan@example.com' },
    { id: 6, username: 'Oliver Queen', email: 'oliver.queen@example.com' },
    { id: 7, username: 'Darryl Philbin', email: 'darryl.philbin@example.com' },
    { id: 8, username: 'Jesse Pinkman', email: 'jesse.pinkman@example.com' },
    { id: 9, username: 'Harvey Specter', email: 'harvey.specter@example.com' },
    { id: 10, username: 'Walter White', email: 'walter.white@example.com' }
  ];
  
  const itemsPerPage = 5; // Número de itens por página
  let currentPage = 1; // Página inicial
  
  // Função para renderizar a lista de usuários
  function renderUsers(list) {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // Limpa a lista atual
  
    list.forEach(user => {
      const userItem = document.createElement('div');
      userItem.classList.add('user-item');
      userItem.innerHTML = `
        <p><strong>Nome de usuário:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <button onclick="editUser(${user.id})" class="btn btn-secondary">Editar</button>
        <button onclick="confirmDelete(${user.id})" class="btn btn-danger">Excluir</button>
      `;
      userListElement.appendChild(userItem);
    });
  }
  
  // Função para adicionar um novo usuário
  function addUser(event) {
    event.preventDefault();
  
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
  
    // Validação simples
    if (username === '' || email === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    // Adicionar usuário à lista
    const newUser = { id: Date.now(), username, email };
    users.push(newUser);
  
    // Limpar campos do formulário
    usernameInput.value = '';
    emailInput.value = '';
  
    // Renderizar novamente a lista de usuários atualizada
    renderUsers(users);
  
    // Exibir mensagem de sucesso
    showFeedbackMessage('Usuário adicionado com sucesso.', 'success');
  }
  
  // Função para editar um usuário
  function editUser(id) {
    const user = users.find(u => u.id === id);
  
    if (!user) {
      alert('Usuário não encontrado.');
      return;
    }
  
    // Preencher formulário de edição
    const editUsernameInput = document.getElementById('editUsername');
    const editEmailInput = document.getElementById('editEmail');
    editUsernameInput.value = user.username;
    editEmailInput.value = user.email;
  
    // Abrir modal de edição
    openModal('editModal');
  }
  
  // Função para salvar edição de usuário
  document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const editUsernameInput = document.getElementById('editUsername');
    const editEmailInput = document.getElementById('editEmail');
    const updatedUsername = editUsernameInput.value.trim();
    const updatedEmail = editEmailInput.value.trim();
  
    // Atualizar usuário na lista
    const userIndex = users.findIndex(u => u.id === currentUserId);
    if (userIndex !== -1) {
      users[userIndex].username = updatedUsername;
      users[userIndex].email = updatedEmail;
    }
  
    // Fechar modal de edição
    closeModal('editModal');
  
    // Renderizar novamente a lista de usuários atualizada
    renderUsers(users);
  
    // Exibir mensagem de sucesso
    showFeedbackMessage('Usuário atualizado com sucesso.', 'success');
  });
  
  // Função para confirmar exclusão de usuário
  function confirmDelete(id) {
    currentUserId = id;
    const user = users.find(u => u.id === id);
  
    if (!user) {
      alert('Usuário não encontrado.');
      return;
    }
  
    // Exibir modal de confirmação
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = `Tem certeza que deseja excluir o usuário "${user.username}"?`;
    openModal('confirmModal');
  }
  
  // Função para excluir usuário
  document.getElementById('confirmBtn').addEventListener('click', function() {
    // Remover usuário da lista
    users = users.filter(u => u.id !== currentUserId);
  
    // Fechar modal de confirmação
    closeModal('confirmModal');
  
    // Renderizar novamente a lista de usuários atualizada
    renderUsers(users);
  
    // Exibir mensagem de sucesso
    showFeedbackMessage('Usuário excluído com sucesso.', 'success');
  });
  
  // Função para fechar modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
  }
  
  // Função para abrir modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
  }
  
  // Função para exibir mensagem de feedback
  function showFeedbackMessage(message, className) {
    const feedbackMessage = document.getElementById('feedbackMessage');
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback ${className}`;
  
    // Limpar mensagem após alguns segundos
    setTimeout(() => {
      feedbackMessage.textContent = '';
      feedbackMessage.className = 'feedback';
    }, 3000);
  }
  
  // Função para filtrar usuários por nome
  document.getElementById('filterByName').addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
  
    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm)
    );
  
    renderUsers(filteredUsers);
  });
  
  // Função para ordenar a lista de usuários por nome
  function sortUsersByName() {
    users.sort((a, b) => a.username.localeCompare(b.username)); // Ordena por nome de usuário
    renderUsers(users);
  }
  
  // Event listener para o botão de ordenação
  document.getElementById('sortByNameBtn').addEventListener('click', sortUsersByName);
  
  // Funções para paginar a lista de usuários
  function paginateUsers(pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);
  
    renderUsers(paginatedUsers);
  
    // Atualizar número da página atual
    document.getElementById('currentPage').textContent = `Página ${pageNumber} de ${Math.ceil(users.length / itemsPerPage)}`;
  }
  
  // Botões de navegação de página
  document.getElementById('prevPageBtn').addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage--;
      paginateUsers(currentPage);
    }
  });
  
  document.getElementById('nextPageBtn').addEventListener('click', function() {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      currentPage++;
      paginateUsers(currentPage);
    }
  });
  
  // Inicialização da lista de usuários paginada
  paginateUsers(currentPage);
  