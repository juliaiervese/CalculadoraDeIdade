import React, { useState } from "react";
import "./style.css";
 
const CalculadoraIdade = () => {
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [anos, setAnos] = useState("--");
    const [meses, setMeses] = useState("--");
    const [dias, setDias] = useState("--");
    const [erro, setErro] = useState("");
 
    const calcularIdade = () => {
        const d = parseInt(dia);
        const m = parseInt(mes);
        const a = parseInt(ano);
 
        if (!dataValida(d, m, a)) {
            setErro("Data inválida! Verifique os valores inseridos.");
            setAnos("--");
            setMeses("--");
            setDias("--");
            return;
        }
 
        const dataNascimento = new Date(a, m - 1, d);
        const hoje = new Date();
 
        if (dataNascimento > hoje) {
            setErro("A data não pode estar no futuro!");
            return;
        }
 
        let idadeAnos = hoje.getFullYear() - dataNascimento.getFullYear();
        let idadeMeses = hoje.getMonth() - dataNascimento.getMonth();
        let idadeDias = hoje.getDate() - dataNascimento.getDate();
 
        if (idadeDias < 0) {
            idadeMeses--;
            idadeDias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
        }
        if (idadeMeses < 0) {
            idadeAnos--;
            idadeMeses += 12;
        }
 
        setErro("");
        animarNumero(setAnos, idadeAnos);
        animarNumero(setMeses, idadeMeses);
        animarNumero(setDias, idadeDias);
    };
 
    const dataValida = (dia, mes, ano) => {
        if (!dia || !mes || !ano) return false;
        if (mes < 1 || mes > 12) return false;
        if (dia < 1 || dia > 31) return false;
        const testeData = new Date(ano, mes - 1, dia);
        return (
            testeData.getFullYear() === ano &&
            testeData.getMonth() === mes - 1 &&
            testeData.getDate() === dia
        );
    };
 
    const animarNumero = (setValor, final) => {
        let inicio = 0;
        let incremento = final / 50;
        let intervalo = setInterval(() => {
            inicio += incremento;
            setValor(Math.floor(inicio));
            if (inicio >= final) {
                setValor(final);
                clearInterval(intervalo);
            }
        }, 20);
    };
 
    return (
<div className="container">
<h1>Calculadora de Idade</h1>
<div className="input-group">
<label>Dia</label>
<input type="number" value={dia} onChange={(e) => setDia(e.target.value)} placeholder="DD" min="1" max="31" />
<label>Mês</label>
<input type="number" value={mes} onChange={(e) => setMes(e.target.value)} placeholder="MM" min="1" max="12" />
<label>Ano</label>
<input type="number" value={ano} onChange={(e) => setAno(e.target.value)} placeholder="YYYY" />
</div>
            {erro && <p className="erro">{erro}</p>}
<button onClick={calcularIdade}>Calcular</button>
<div className="result">
<span>{anos}</span> anos
<p><span>{meses}</span> meses</p>
<p><span>{dias}</span> dias</p>
</div>
</div>
    );
};
 
export default CalculadoraIdade;