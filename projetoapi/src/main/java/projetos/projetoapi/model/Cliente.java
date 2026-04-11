package projetos.projetoapi.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
@JsonPropertyOrder({"id", "nome", "email", "telefone"})
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String nome;
    private String email;
    private String telefone;

}
