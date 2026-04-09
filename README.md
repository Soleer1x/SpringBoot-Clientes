<div align="center">

<pre>
 ██████╗ ██████╗ ██████╗ ██╗███╗   ██╗ ██████╗     ██████╗  ██████╗  ██████╗ ████████╗
██╔════╝ ██╔══██╗██╔══██╗██║████╗  ██║██╔════╝     ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝
╚█████╗  ██████╔╝██████╔╝██║██╔██╗ ██║██║  ███╗    ██████╔╝██║   ██║██║   ██║   ██║   
 ╚═══██╗ ██╔═══╝ ██╔══██╗██║██║╚██╗██║██║   ██║    ██╔══██╗██║   ██║██║   ██║   ██║   
██████╔╝ ██║     ██║  ██║██║██║ ╚████║╚██████╔╝    ██████╔╝╚██████╔╝╚██████╔╝   ██║   
╚═════╝  ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═════╝  ╚══════╝ ╚══════╝   ╚═╝   
 
 ░░░  E N T E R P R I S E  -  G R A D E  -  S Y S T E M S  ░░░
</pre>

<br/>

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg" width="90"/>

<br/><br/>

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java 25](https://img.shields.io/badge/JDK_25-000000?style=for-the-badge&logo=openjdk&logoColor=ED8B00)](https://openjdk.org/)
[![Microservices](https://img.shields.io/badge/Architecture-Microservices-1a1a2e?style=for-the-badge)](https://microservices.io/)
[![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)](#)

<br/>

> *"Depois de entender a pedra, é hora de construir a metrópole."*

</div>

---

## 🚀 O Manifesto

Se o Bare Metal é sobre **controle**, o Spring Boot é sobre **velocidade e resiliência**.

Este repositório é a evolução natural da engenharia. Aqui, não perdemos tempo configurando XML ou instanciando conexões manualmente. Nós focamos no que importa: **Regras de Negócio e Valor.**

O Spring não é "magia"; é o ápice da Inversão de Controle e Injeção de Dependência aplicada para criar sistemas que não apenas funcionam, mas escalam.

```java
@RestController
@RequestMapping("/filosofia")
public class FilosofiaController {
    
    @GetMapping
    public ResponseEntity<String> getPrincipios() {
        var principio = "Automatize a infraestrutura. Foque na estratégia do domínio.";
        return ResponseEntity.ok(">> " + principio);
    }
}
// STATUS 200 OK: >> Automatize a infraestrutura. Foque na estratégia do domínio.
