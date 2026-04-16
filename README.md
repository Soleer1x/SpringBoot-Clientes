<div align="center">

<pre>
 ██████╗ ██████╗ ██████╗ ██╗███╗   ██╗ ██████╗     ██████╗  ██████╗  ██████╗ ████████╗
██╔════╝ ██╔══██╗██╔══██╗██║████╗  ██║██╔════╝     ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝
╚█████╗  ██████╔╝██████╔╝██║██╔██╗ ██║██║  ███╗    ██████╔╝██║   ██║██║   ██║   ██║   
 ╚═══██╗ ██╔═══╝ ██╔══██╗██║██║╚██╗██║██║   ██║    ██╔══██╗██║   ██║██║   ██║   ██║   
██████╔╝ ██║     ██║  ██║██║██║ ╚████║╚██████╔╝    ██████╔╝╚██████╔╝╚██████╔╝   ██║   
╚═════╝  ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═════╝  ╚══════╝ ╚══════╝   ╚═╝   

 ░░░  C R U D - C L I E N T E S  ░░░
</pre>

<br/>

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg" width="90"/>

<br/><br/>

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-000000?style=for-the-badge&logo=openjdk&logoColor=ED8B00)](https://openjdk.org/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![H2 Database](https://img.shields.io/badge/Database-H2-0a0a0a?style=for-the-badge)](http://localhost:8080/h2-console)

<br/>

> *"Depois de entender a pedra, é hora de construir a metrópole."*

</div>

---

<div align="center">
  <img src="./Clientes.png" alt="Banner Clientes" width="600px">
</div>

---

## 🚀 O Manifesto

Se o Bare Metal representa **controle**, o Spring Boot representa **velocidade, produtividade e escalabilidade**.

Este projeto foca no que realmente importa: **regra de negócio e geração de valor**, eliminando complexidades desnecessárias de configuração.

A arquitetura foi construída utilizando:

- **Java + Spring Boot**
- **PostMan para testes** 
- **HTML, CSS e JavaScript** no frontend usando IA
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
