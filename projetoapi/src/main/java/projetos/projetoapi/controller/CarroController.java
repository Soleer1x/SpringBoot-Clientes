package projetos.projetoapi.controller;

import lombok.Data;
import org.springframework.web.bind.annotation.*;
import projetos.projetoapi.model.Carro;
import projetos.projetoapi.repository.CarroRepository;

import java.util.List;

@Data
@RestController
@RequestMapping("carros")
public class CarroController {

    private final CarroRepository carroRepository;

    @GetMapping
    public List<Carro> carros(){
        return carroRepository.findAll();
    }

    @GetMapping("{codigo}")
    public Carro carro(@PathVariable("codigo") String codigo){
        return carroRepository.findById(codigo).orElse(null);
    }

}
