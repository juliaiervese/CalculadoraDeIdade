import React, { useState } from "react";
import "../styles/style.css";

const CalculadoraIdade = () => {
    const [dataNascimento, setDataNascimento] = useState("");
    const [idade, setIdade] = useState(null);
    const [erro, setErro] = useState("");

    const calcularIdade = () => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);

        if (nascimento > hoje) {
            setErro("A data não pode estar no futuro!");
            setIdade(null);
            return;
        }

        setErro(""); 
        const diferenca = hoje - nascimento;
        const idadeCalculada = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
        setIdade(idadeCalculada);
    };

    return (
        <div className="calculadora">
            <h2>Calculadora de Idade</h2>
            <input 
                type="date" 
                value={dataNascimento} 
                onChange={(e) => setDataNascimento(e.target.value)}
            />
            <button onClick={calcularIdade}>Calcular</button>
            {erro && <p className="erro">{erro}</p>}
            {idade !== null && <p>Sua idade é: {idade} anos</p>}
        </div>
    );
};

export default CalculadoraIdade;
