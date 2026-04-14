package projetos.projetoapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetos.projetoapi.model.Carro;

public interface CarroRepository extends JpaRepository<Carro, String> {

}
