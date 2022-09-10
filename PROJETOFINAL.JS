fCalcularConversao = (peso, medidaEntrada, medidaSaida) => {
    const kiloLibra = 2.20462;
    const kiloOnca = 35.274;
    const libraKilo = 0.453592;
    const libraOnca = 16;
    const oncaKilo = 0.0283495;
    const oncaLibra = 0.0625;
    let resultado = 0;
    if ((medidaEntrada === 'kilos') && (medidaSaida === 'libras')) {
        resultado = peso * kiloLibra;
        return resultado.toFixed(2);
    } else if ((medidaEntrada === 'kilos') && (medidaSaida === 'onças')) {
        resultado = peso * kiloOnca;
        return resultado.toFixed(2);
    } else if ((medidaEntrada === 'libras') && (medidaSaida === 'kilos')) {
        resultado = peso * libraKilo;
        return resultado.toFixed(2);
    } else if ((medidaEntrada === 'libras') && (medidaSaida === 'onças')) {
        resultado = peso * libraOnca;
        return resultado.toFixed(2);
    } else if ((medidaEntrada === 'onças') && (medidaSaida === 'kilos')) {
        resultado = peso * oncaKilo;
        return resultado.toFixed(2);
    } else if ((medidaEntrada === 'onças') && (medidaSaida === 'libras')) {
        resultado = peso * oncaLibra;
        return resultado.toFixed(2);
    } 
};

module.exports = async function (context, req) {
    let peso = Number(req.query.peso);
    let medidaEntrada = String(req.query.medidaE.toLowerCase());
    let medidaSaida = String(req.query.medidaS.toLowerCase());

    if (!isNaN(medidaEntrada) || !isNaN(medidaSaida) || !Number(peso)) {
        return context.res.status(400).send('Formato de dados incorreto. Os campos medidaE e medidaS aceitam apenas as opções: kilo, libra ou onça. Já o campo peso aceita apenas números.');
    } else if (medidaEntrada === medidaSaida) {
        return context.res.status(400).send("Foram informados os mesmos critérios de entrada e saída, não tendo o que ser convertido"); 
    };

    let resultadoConversao = fCalcularConversao(peso, medidaEntrada, medidaSaida);

    context.res.json({
        peso: peso,
        medidaEntrada: medidaEntrada,
        medidaSaida: medidaSaida,
        resultadoConversao: `O resultado da conversão de ${peso} ${medidaEntrada} para ${medidaSaida} é de ${resultadoConversao}`
    });
};