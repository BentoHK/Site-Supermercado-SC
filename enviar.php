<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  // Pega os dados do formulário
  $nome = $_POST["nome"];
  $email = $_POST["email"];
  $telefone = $_POST["telefone"];
  $cep = $_POST["cep"];
  $estado = $_POST["estado"];
  $cidade = $_POST["cidade"];
  $endereco = $_POST["endereco"];
  $cargo = $_POST["cargo"];

  // Prepara o e-mail
  $destinatario = "erivaldo.gabriel9@gmail.com";
  $assunto = "Novo formulário enviado";
  $mensagem = "
    <strong>Nome:</strong> $nome<br>
    <strong>Email:</strong> $email<br>
    <strong>Telefone:</strong> $telefone<br>
    <strong>CEP:</strong> $cep<br>
    <strong>Estado:</strong> $estado<br>
    <strong>Cidade:</strong> $cidade<br>
    <strong>Endereço:</strong> $endereco<br>
    <strong>Cargo desejado:</strong> $cargo<br>
  ";

  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=UTF-8\r\n";
  $headers .= "From: $email\r\n";

  $arquivoAnexo = $_FILES['curriculo'];
  $arquivoTmp = $arquivoAnexo['tmp_name'];
  $arquivoNome = $arquivoAnexo['name'];

  if ($arquivoTmp != "") {
    // Lê o conteúdo do arquivo e codifica em base64
    $conteudo = chunk_split(base64_encode(file_get_contents($arquivoTmp)));
    $boundary = "----=Part_" . md5(time());

    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $mensagemFinal  = "--$boundary\r\n";
    $mensagemFinal .= "Content-Type: text/html; charset=UTF-8\r\n";
    $mensagemFinal .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $mensagemFinal .= $mensagem . "\r\n";

    $mensagemFinal .= "--$boundary\r\n";
    $mensagemFinal .= "Content-Type: application/octet-stream; name=\"$arquivoNome\"\r\n";
    $mensagemFinal .= "Content-Transfer-Encoding: base64\r\n";
    $mensagemFinal .= "Content-Disposition: attachment; filename=\"$arquivoNome\"\r\n\r\n";
    $mensagemFinal .= $conteudo . "\r\n";
    $mensagemFinal .= "--$boundary--";

    $mensagem = $mensagemFinal;
  }

  // Envia o e-mail
  if (mail($destinatario, $assunto, $mensagem, $headers)) {
    echo "<h2>Mensagem enviada com sucesso!</h2>";
  } else {
    echo "<h2>Erro ao enviar a mensagem.</h2>";
  }

} else {
  echo "<h2>Requisição inválida.</h2>";
}
?>
