<div align="center">

<pre>
 ██████╗ ██████╗ ██████╗ ██╗███╗   ██╗ ██████╗     ██████╗  ██████╗  ██████╗ ████████╗
██╔════╝ ██╔══██╗██╔══██╗██║████╗  ██║██╔════╝     ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝
╚█████╗  ██████╔╝██████╔╝██║██╔██╗ ██║██║  ███╗    ██████╔╝██║   ██║██║   ██║   ██║   
 ╚═══██╗ ██╔═══╝ ██╔══██╗██║██║╚██╗██║██║   ██║    ██╔══██╗██║   ██║██║   ██║   ██║   
██████╔╝ ██║     ██║  ██║██║██║ ╚████║╚██████╔╝    ██████╔╝╚██████╔╝╚██████╔╝   ██║   
╚═════╝  ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═════╝  ╚══════╝ ╚══════╝   ╚═╝   

 ░░░  C L I E N T E S  ░░░
</pre>

<br/>

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg" width="90"/>

<br/><br/>

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-000000?style=for-the-badge&logo=openjdk&logoColor=ED8B00)](https://openjdk.org/)
[![H2 Database](https://img.shields.io/badge/Database-H2-0a0a0a?style=for-the-badge)](http://localhost:8080/h2-console)
[![Architecture](https://img.shields.io/badge/Architecture-Microservices-1a1a2e?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)](#)

<br/>

> *"Depois de entender a pedra, é hora de construir a metrópole."*

</div>

---

![Logo do Projeto](https://via.placeholder.com/150)

---

## 🚀 O Manifesto

Se o Bare Metal representa **controle**, o Spring Boot representa **velocidade, produtividade e escalabilidade**.

Este projeto foca no que realmente importa: **regra de negócio e geração de valor**, eliminando complexidades desnecessárias de configuração.

A arquitetura foi construída utilizando:

- **Java + Spring Boot**
- **PostMan** 
- **HTML, CSS e JavaScript** no frontend
- **Banco de dados H2** para desenvolvimento e testes  
  → Acesse o console: http://localhost:8080/h2-console

O objetivo não é apenas fazer funcionar, mas criar uma base sólida, organizada e pronta para evoluir.

---

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
