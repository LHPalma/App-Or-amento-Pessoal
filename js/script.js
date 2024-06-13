class Bd {
	constructor() {
		if (localStorage.getItem("id") === null) localStorage.setItem("id", 0);
	}

	getProximoId() {
		let proximoId = localStorage.getItem("id");
		return parseInt(proximoId) + 1;
	}

	Gravar(despesa) {
		let id = this.getProximoId();
		localStorage.setItem(id, JSON.stringify(despesa));
		localStorage.setItem("id", id);
	}

	recuperarTodosRegistros() {
		// array de despesas
		let despesas = Array();

		let id = localStorage.getItem("id");

		// Recupera todas as despesas no localStorage
		for (let i = 1; i <= id; i++) {
			// Recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i));

			// Pulando despesas vazias/indices vazios
			if (despesa == null) {
				continue; // Pula para a próxima iteração do laço
			}

			despesas.push(despesa);
		}

		return despesas;
	}
}
let bd = new Bd();

class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano;
		this.mes = mes;
		this.dia = dia;
		this.tipo = tipo;
		this.descricao = descricao;
		this.valor = valor;
	}

	validarDados() {
		for (let i in this) {
			if (this[i] == undefined || this[i] == "" || this[i] == null) {
				return false;
			}
		}

		return true;
	}
}

function cadastrarDespesa() {
	let ano = document.getElementById("ano");
	let mes = document.getElementById("mes");
	let dia = document.getElementById("dia");
	let tipo = document.getElementById("tipo");
	let descricao = document.getElementById("descricao");
	let valor = document.getElementById("valor");

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	);

	if (despesa.validarDados()) {
		bd.Gravar(despesa);
		$("#modal_titulo_div").addClass("modal-header text-success");
		$("#modal_titulo").text("Despesa gravada com sucesso!");
		$("#modal_conteudo").text("Despesa foi cadastrada com sucesso!");
		$("#modal_botao").text("Voltar");
		$("#modal_botao").addClass("btn-success");

		$("#modalRegistraDespesa").modal("show");
	} else {
		$("#modal_titulo_div").addClass("modal-header text-danger");
		$("#modal_titulo").text("Erro na inclusão do registro");
		$("#modal_conteudo").text(
			"Erro na gravação! Verifique se todos os campos foram preenchidos."
		);
		$("#modal_botao").text("Voltar e corrigir");
		$("#modal_botao").addClass("btn-danger");

		$("#modalRegistraDespesa").modal("show");
	}
}

function carregaListaDespesas() {
	let despesa = Array();
	despesas = bd.recuperarTodosRegistros();
}
