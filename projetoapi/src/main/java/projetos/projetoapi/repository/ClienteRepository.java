package projetos.projetoapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetos.projetoapi.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, String> {

}
