package projetos.projetoapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetos.projetoapi.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, String> {

}
