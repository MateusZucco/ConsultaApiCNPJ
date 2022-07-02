var button = document.getElementById("find");
button.addEventListener("click", findCNPJ);

async function findCNPJ() {
  var cnpj = document.getElementById("cnpj");
  try {
    const formattedCnpj = cnpj.value.replace(/[^0-9]/g, '')
    console.log(formattedCnpj)
    const response = await fetch(`https://publica.cnpj.ws/cnpj/${formattedCnpj}`);
    const data = await response.json();
    print(data);
    return data;
  } catch (error) {
    print("erro");
    console.error(error);
  }
}

function print(data) {
  var infosBox = document.getElementById("infos");
  infosBox.innerHTML = "";
  if (data == "erro") {
    var errorBox = document.createElement("div");
    errorBox.className = "err";
    errorBox.innerText = "CNPJ inválido";
    infosBox.appendChild(errorBox);
    return;
  }
  var cnpjBox = document.createElement("div");
  var cnpjInfos = document.createElement("div");
  cnpjInfos.className = "infos";

  let infos = `${data.estabelecimento.cnpj}, ${data.razao_social} \n \n`;

  if (data.estabelecimento) {
    if (
      data.estabelecimento.tipo != undefined &&
      data.estabelecimento.tipo != null
    ) {
      infos += `${data.estabelecimento.tipo}`;
    }
    if (
      data.estabelecimento.pais.nome != undefined &&
      data.estabelecimento.pais.nome != null
    ) {
      infos += ` - ${data.estabelecimento.pais.nome}`;
    }
    if (
      data.estabelecimento.estado.sigla != undefined &&
      data.estabelecimento.estado.sigla != null
    ) {
      infos += ` - ${data.estabelecimento.estado.sigla}`;
    }
    if (
      data.estabelecimento.cidade.nome != undefined &&
      data.estabelecimento.cidade.nome != null
    ) {
      infos += `, ${data.estabelecimento.cidade.nome}`;
    }
    if (
      data.estabelecimento.bairro != undefined &&
      data.estabelecimento.bairro != null
    ) {
      infos += `, ${data.estabelecimento.bairro} \n \n`;
    }
  }

  if (data.socios) {
    infos += `Socios: `;
    data.socios.map((socio) => {
      if (socio.nome) {
        infos += `${socio.nome}, `;
      }
    });
  }

  cnpjInfos.innerText = infos;

  cnpjBox.appendChild(cnpjInfos);

  infosBox.appendChild(cnpjBox);
  return;
}
