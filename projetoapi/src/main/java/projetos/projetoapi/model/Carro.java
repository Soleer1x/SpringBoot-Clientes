package projetos.projetoapi.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
@JsonPropertyOrder({"codigo", "carro", "montadora", "chave"})
public class Carro {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String codigo;

    private String Carro;
    private String montadora;
    private String chave;

}
