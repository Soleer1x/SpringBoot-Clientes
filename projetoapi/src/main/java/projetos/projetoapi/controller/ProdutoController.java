package projetos.projetoapi.controller;

import lombok.Data;
import org.springframework.web.bind.annotation.*;
import projetos.projetoapi.model.Produto;
import projetos.projetoapi.repository.ProdutoRepository;

import java.util.List;

@RestController
@Data
@RequestMapping("produtos")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    @GetMapping
    public List<Produto> listar(){
        return produtoRepository.findAll();
    }

    @GetMapping("{id}")
    public Produto findById(@PathVariable String id) {
        return produtoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Produto criar(@RequestBody Produto produto){
        return produtoRepository.save(produto);
    }

    @DeleteMapping("{id}")
    public void deletar(@PathVariable String id){
        produtoRepository.deleteById(id);
    }

    @PutMapping("{id}")
    public Produto atualizar(@PathVariable String id, @RequestBody Produto produto){
        produto.setId(id);
        return produtoRepository.save(produto);
    }
}
