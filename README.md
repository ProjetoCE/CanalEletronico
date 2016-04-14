# Canal Eletrônico
Sistema de tráfego online de denúncias criminais.

## Sinopse

Canal Eletrônico é um sistema online gratuito para encaminhamento de denúncias criminais aberto ao público, adaptável a qualquer instituição de polícia judiciária do Brasil.

## Estrutura básica

Estruturalmente, o sistema é uma aplicação web desenvolvida em Java e Javascript, utilizando MySQL como base de dados.

A codificação backend Java utiliza dependências administradas por Maven, como Spring MVC. Outras dependências são o antivírus ClamAV, o servidor de aplicações Wildfly 9.X ou superior e o framework para interfaces gráficas Bootstrap 3.

## Exemplos

A codificação publicada atualmente consiste-se no protótipo do sistema – brach “prototype” [https://github.com/ProjetoCE/CanalEletronico/tree/prototype] -, que apresenta uma amostra da proposta de interface gráfica interação com usuário.

O exemplo apresenta o layout adaptado para acesso por dispositivos móveis, possibilitando a avaliação de sua legibilidade e adequação a seus propósitos.

## Motivação

O projeto do sistema foi criado para a participação no Concurso de Aplicativos para enfrentamento da corrupção – HACKATON PARTICIPAÇÃO NO COMBATE À CORRUPÇÃO - promovido pelo LabPI do Ministério da Justiça.

Além do fomentado pelo Concurso, o sistema é parametrizado por necessidades atuais das instituições policiais federais ou estaduais do País, entre as quais a demanda de recursos atualizados com foco no gerenciamento das atividades investigativas.

Paralelamente o sistema também atende à necessidade pública de acesso facilitado aos mecanismos de consolidação da segurança pública, especialmente no caso daqueles indivíduos que encontram obstáculos como distanciamento geográfico, desconhecimento dos instrumentos normativos aplicáveis ou, até mesmo, risco à integridade pessoal.

## Instalação

Para a instação do protótipo, basta copiar os arquivos do branch “prototype” do repositório e acessar o arquivo “index.html” do diretório “webapp” em um navegador de internet.

Os subdiretórios “webapp/css”, “webapp/images”, “webapp/fonts” e “webapp/js” devem ser mantidos na estrutura definida no repositório.

Atenção! Apesar de o sistema ser projetado para adaptar-se a qualquer tipo de dispositivo de interação gráfica, o protótipo foi desenvolvido para visualização em dispositivos móveis. Em dispositivos estácionários, como desktops, recomenda-se utilizar os recursos de visualização adaptável ou redimensionar o navegado utilizado.

## Referências

Apresentação em vídeo:
https://www.youtube.com/watch?v=YrlQ18Itf3s


## Licença

GNU GENERAL PUBLIC LICENSE, Version 2.

