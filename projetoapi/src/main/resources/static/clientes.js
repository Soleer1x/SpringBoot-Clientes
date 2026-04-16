(function() {
    'use strict';

    // Configuração da API
    const API_BASE_URL = 'http://localhost:8080/clientes';

    // Estado global
    let clientes = [];
    let clientesFiltrados = [];
    let paginaAtual = 1;
    const ITENS_POR_PAGINA = 10;
    let ordenacao = { campo: 'nome', direcao: 'asc' };
    let termoBusca = '';

    // Elementos DOM
    const tbody = document.getElementById('clientesTableBody');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const emptyState = document.getElementById('emptyState');
    const paginacaoContainer = document.getElementById('paginacaoContainer');
    const rangeInicio = document.getElementById('rangeInicio');
    const rangeFim = document.getElementById('rangeFim');
    const totalRegistros = document.getElementById('totalRegistros');
    const paginaAtualSpan = document.getElementById('paginaAtual');
    const btnPaginaAnterior = document.getElementById('btnPaginaAnterior');
    const btnPaginaProxima = document.getElementById('btnPaginaProxima');
    const btnNovo = document.getElementById('btnNovoCliente');
    const btnGerarPDF = document.getElementById('btnGerarPDF');
    const btnExportarExcel = document.getElementById('btnExportarExcel');
    const inputBusca = document.getElementById('inputBusca');
    const btnLimparBusca = document.getElementById('btnLimparBusca');

    // Modais
    const modal = document.getElementById('clienteModal');
    const confirmModal = document.getElementById('confirmModal');
    const modalTitle = document.getElementById('modalTitle');
    const clienteForm = document.getElementById('clienteForm');
    const clienteIdInput = document.getElementById('clienteId');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const btnCancelarModal = document.getElementById('btnCancelarModal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');

    // Exclusão
    let clienteParaExcluir = null;
    const nomeClienteExcluirSpan = document.getElementById('nomeClienteExcluir');
    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao');
    const btnCancelarExclusao = document.getElementById('btnCancelarExclusao');

    // Inicialização
    document.addEventListener('DOMContentLoaded', () => {
        carregarClientes();
        setupEventListeners();
        setupOrdenacao();
    });

    function setupEventListeners() {
        btnNovo.addEventListener('click', abrirModalNovo);
        btnCancelarModal.addEventListener('click', fecharModal);
        modalCloseBtns.forEach(btn => btn.addEventListener('click', fecharModal));
        clienteForm.addEventListener('submit', handleFormSubmit);
        btnGerarPDF.addEventListener('click', gerarPDF);
        btnExportarExcel.addEventListener('click', exportarExcel);

        inputBusca.addEventListener('input', debounce(handleBusca, 300));
        btnLimparBusca.addEventListener('click', limparBusca);

        btnPaginaAnterior.addEventListener('click', () => mudarPagina(paginaAtual - 1));
        btnPaginaProxima.addEventListener('click', () => mudarPagina(paginaAtual + 1));

        // Modais de fechar ao clicar fora
        modal.addEventListener('click', (e) => { if (e.target === modal) fecharModal(); });
        confirmModal.addEventListener('click', (e) => { if (e.target === confirmModal) fecharConfirmModal(); });

        btnCancelarExclusao.addEventListener('click', fecharConfirmModal);
        btnConfirmarExclusao.addEventListener('click', confirmarExclusao);

        // Máscara telefone
        telefoneInput.addEventListener('input', aplicarMascaraTelefone);
    }

    function setupOrdenacao() {
        document.querySelectorAll('.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const campo = th.dataset.sort;
                if (ordenacao.campo === campo) {
                    ordenacao.direcao = ordenacao.direcao === 'asc' ? 'desc' : 'asc';
                } else {
                    ordenacao.campo = campo;
                    ordenacao.direcao = 'asc';
                }
                atualizarIndicadoresOrdenacao();
                aplicarOrdenacao();
                paginaAtual = 1;
                renderizarTabela();
            });
        });
    }

    function atualizarIndicadoresOrdenacao() {
        document.querySelectorAll('.sortable').forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
            if (th.dataset.sort === ordenacao.campo) {
                th.classList.add(ordenacao.direcao === 'asc' ? 'sorted-asc' : 'sorted-desc');
            }
        });
    }

    // API calls
    async function carregarClientes() {
        showLoading(true);
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Erro ao buscar clientes');
            clientes = await response.json();
            aplicarFiltrosEOrdenacao();
            atualizarStats();
        } catch (error) {
            console.error(error);
            mostrarToast('Falha ao carregar clientes. Verifique o servidor.', 'error');
            clientes = [];
            clientesFiltrados = [];
            renderizarTabela();
        } finally {
            showLoading(false);
        }
    }

    async function salvarCliente(cliente) {
        const isEdit = !!cliente.id;
        const url = isEdit ? `${API_BASE_URL}/${cliente.id}` : API_BASE_URL;
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            });
            if (!response.ok) throw new Error(await response.text());
            mostrarToast(isEdit ? 'Cliente atualizado com sucesso!' : 'Cliente cadastrado com sucesso!', 'success');
            await carregarClientes();
            fecharModal();
        } catch (error) {
            mostrarToast('Erro ao salvar: ' + error.message, 'error');
        }
    }

    async function deletarCliente(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Erro ao deletar');
            mostrarToast('Cliente excluído com sucesso!', 'success');
            await carregarClientes();
            fecharConfirmModal();
        } catch (error) {
            mostrarToast('Erro ao excluir cliente.', 'error');
        }
    }

    // Lógica de filtros e ordenação
    function aplicarFiltrosEOrdenacao() {
        // Filtro de busca
        if (termoBusca.trim() === '') {
            clientesFiltrados = [...clientes];
        } else {
            const termo = termoBusca.toLowerCase();
            clientesFiltrados = clientes.filter(c =>
                (c.nome || '').toLowerCase().includes(termo) ||
                (c.email || '').toLowerCase().includes(termo) ||
                (c.telefone || '').toLowerCase().includes(termo)
            );
        }
        aplicarOrdenacao();
        paginaAtual = 1;
        renderizarTabela();
        atualizarStats();
    }

    function aplicarOrdenacao() {
        clientesFiltrados.sort((a, b) => {
            let valA = a[ordenacao.campo] || '';
            let valB = b[ordenacao.campo] || '';
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            if (valA < valB) return ordenacao.direcao === 'asc' ? -1 : 1;
            if (valA > valB) return ordenacao.direcao === 'asc' ? 1 : -1;
            return 0;
        });
    }

    function handleBusca() {
        termoBusca = inputBusca.value;
        btnLimparBusca.style.display = termoBusca ? 'block' : 'none';
        aplicarFiltrosEOrdenacao();
    }

    function limparBusca() {
        inputBusca.value = '';
        termoBusca = '';
        btnLimparBusca.style.display = 'none';
        aplicarFiltrosEOrdenacao();
    }

    function mudarPagina(novaPagina) {
        const totalPaginas = Math.ceil(clientesFiltrados.length / ITENS_POR_PAGINA);
        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            paginaAtual = novaPagina;
            renderizarTabela();
        }
    }

    // Renderização da tabela com paginação
    function renderizarTabela() {
        if (!tbody) return;

        const total = clientesFiltrados.length;
        if (total === 0) {
            tbody.innerHTML = '';
            emptyState.style.display = 'block';
            paginacaoContainer.style.display = 'none';
            return;
        }

        emptyState.style.display = 'none';
        paginacaoContainer.style.display = 'flex';

        const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
        const fim = Math.min(inicio + ITENS_POR_PAGINA, total);
        const paginaClientes = clientesFiltrados.slice(inicio, fim);

        let html = '';
        paginaClientes.forEach(cliente => {
            html += `
                <tr>
                    <td><strong>${escapeHtml(cliente.nome)}</strong></td>
                    <td>${escapeHtml(cliente.email)}</td>
                    <td>${escapeHtml(cliente.telefone || '—')}</td>
                    <td class="actions-cell">
                        <button class="btn-table-action edit" data-id="${cliente.id}" data-nome="${escapeHtml(cliente.nome)}" data-email="${escapeHtml(cliente.email)}" data-telefone="${escapeHtml(cliente.telefone || '')}" title="Editar">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="btn-table-action delete" data-id="${cliente.id}" data-nome="${escapeHtml(cliente.nome)}" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = html;

        // Atualizar informações de paginação
        rangeInicio.textContent = inicio + 1;
        rangeFim.textContent = fim;
        totalRegistros.textContent = total;
        paginaAtualSpan.textContent = paginaAtual;

        const totalPaginas = Math.ceil(total / ITENS_POR_PAGINA);
        btnPaginaAnterior.disabled = paginaAtual === 1;
        btnPaginaProxima.disabled = paginaAtual === totalPaginas;

        // Reattach event listeners para botões de ação
        document.querySelectorAll('.btn-table-action.edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const nome = btn.dataset.nome;
                const email = btn.dataset.email;
                const telefone = btn.dataset.telefone;
                abrirModalEdicao({ id, nome, email, telefone });
            });
        });

        document.querySelectorAll('.btn-table-action.delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const nome = btn.dataset.nome;
                abrirConfirmModal(id, nome);
            });
        });
    }

    function atualizarStats() {
        document.getElementById('totalClientes').textContent = clientes.length;
        const emailsUnicos = new Set(clientes.map(c => c.email?.toLowerCase()).filter(Boolean)).size;
        document.getElementById('totalEmails').textContent = emailsUnicos;
        const comTelefone = clientes.filter(c => c.telefone && c.telefone.trim() !== '').length;
        document.getElementById('comTelefone').textContent = comTelefone;
    }

    function showLoading(show) {
        loadingIndicator.style.display = show ? 'block' : 'none';
    }

    // Modal de cliente
    function abrirModalNovo() {
        modalTitle.textContent = 'Novo Cliente';
        clienteForm.reset();
        clienteIdInput.value = '';
        limparErros();
        modal.classList.add('show');
        nomeInput.focus();
    }

    function abrirModalEdicao(cliente) {
        modalTitle.textContent = 'Editar Cliente';
        clienteIdInput.value = cliente.id;
        nomeInput.value = cliente.nome || '';
        emailInput.value = cliente.email || '';
        telefoneInput.value = cliente.telefone || '';
        limparErros();
        modal.classList.add('show');
        nomeInput.focus();
    }

    function fecharModal() {
        modal.classList.remove('show');
        clienteForm.reset();
        limparErros();
    }

    function limparErros() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }

    function validarFormulario() {
        let valido = true;
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        limparErros();

        if (!nome) {
            mostrarErro('nome', 'Nome é obrigatório.');
            valido = false;
        }
        if (!email) {
            mostrarErro('email', 'E-mail é obrigatório.');
            valido = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            mostrarErro('email', 'E-mail inválido.');
            valido = false;
        }
        return valido;
    }

    function mostrarErro(campo, mensagem) {
        const errorEl = document.querySelector(`.error-message[data-for="${campo}"]`);
        if (errorEl) errorEl.textContent = mensagem;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!validarFormulario()) return;

        const cliente = {
            id: clienteIdInput.value || undefined,
            nome: nomeInput.value.trim(),
            email: emailInput.value.trim(),
            telefone: telefoneInput.value.trim()
        };
        salvarCliente(cliente);
    }

    // Modal de confirmação
    function abrirConfirmModal(id, nome) {
        clienteParaExcluir = { id, nome };
        nomeClienteExcluirSpan.textContent = nome;
        confirmModal.classList.add('show');
    }

    function fecharConfirmModal() {
        confirmModal.classList.remove('show');
        clienteParaExcluir = null;
    }

    function confirmarExclusao() {
        if (clienteParaExcluir) {
            deletarCliente(clienteParaExcluir.id);
        }
    }

    // Toast notifications
    function mostrarToast(mensagem, tipo = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${tipo}`;
        let icone = 'info-circle';
        if (tipo === 'success') icone = 'check-circle';
        if (tipo === 'error') icone = 'exclamation-circle';
        toast.innerHTML = `<i class="fas fa-${icone}"></i><span class="toast-message">${mensagem}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    // Utilitários
    function escapeHtml(text) {
        if (!text) return text;
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function aplicarMascaraTelefone(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0,11);
        if (value.length > 10) {
            e.target.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            e.target.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            e.target.value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            e.target.value = value;
        }
    }

    // Exportações
    function gerarPDF() {
        if (clientesFiltrados.length === 0) {
            mostrarToast('Nenhum cliente para exportar.', 'info');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const primaryColor = '#2563eb';

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(primaryColor);
        doc.text('Relatório de Clientes', 14, 25);

        const hoje = new Date();
        doc.setFontSize(10);
        doc.setTextColor('#64748b');
        doc.setFont('helvetica', 'normal');
        doc.text(`Gerado em: ${hoje.toLocaleDateString('pt-BR')} às ${hoje.toLocaleTimeString('pt-BR')}`, 14, 35);
        doc.setDrawColor(primaryColor);
        doc.line(14, 40, 196, 40);

        const body = clientesFiltrados.map(c => [c.id || '—', c.nome || '—', c.email || '—', c.telefone || '—']);

        doc.autoTable({
            startY: 48,
            head: [['ID', 'Nome', 'E-mail', 'Telefone']],
            body: body,
            theme: 'grid',
            headStyles: { fillColor: primaryColor, textColor: '#fff', fontStyle: 'bold' },
            alternateRowStyles: { fillColor: '#f8fafc' },
            margin: { left: 14, right: 14 },
            didDrawPage: (data) => {
                doc.setFontSize(9);
                doc.setTextColor('#64748b');
                doc.text(`Página ${data.pageNumber}`, 196, 285, { align: 'right' });
            }
        });

        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(11);
        doc.setTextColor('#0f172a');
        doc.setFont('helvetica', 'bold');
        doc.text(`Total de clientes: ${clientesFiltrados.length}`, 14, finalY);
        doc.save(`clientes_${hoje.toISOString().slice(0,10)}.pdf`);
        mostrarToast('PDF gerado com sucesso!', 'success');
    }

    function exportarExcel() {
        if (clientesFiltrados.length === 0) {
            mostrarToast('Nenhum dado para exportar.', 'info');
            return;
        }

        let csv = 'ID,Nome,E-mail,Telefone\n';
        clientesFiltrados.forEach(c => {
            csv += `"${c.id || ''}","${c.nome || ''}","${c.email || ''}","${c.telefone || ''}"\n`;
        });

        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `clientes_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        mostrarToast('Exportado para CSV com sucesso!', 'success');
    }
})();