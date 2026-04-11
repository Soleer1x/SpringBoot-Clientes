package projetos.projetoapi.controller;

import lombok.Data;
import org.springframework.web.bind.annotation.*;
import projetos.projetoapi.model.Cliente;
import projetos.projetoapi.repository.ClienteRepository;

import java.util.List;

@Data
@RestController
@RequestMapping("clientes")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> buscaTodos(){
        return clienteRepository.findAll();
    }

    @GetMapping("{id}")
    public Cliente buscaPorId(@PathVariable String id){
        return clienteRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Cliente criar(@RequestBody Cliente cliente){
        return clienteRepository.save(cliente);
    }

    @PutMapping("{id}")
    public Cliente atualizarPorId(@PathVariable String id, @RequestBody Cliente cliente){
        cliente.setId(id);
        return clienteRepository.save(cliente);
    }

    @DeleteMapping("{id}")
    public void deletarPorId(@PathVariable String id){
        clienteRepository.deleteById(id);
    }
}
