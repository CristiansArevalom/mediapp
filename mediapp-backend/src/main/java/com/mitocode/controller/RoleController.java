package com.mitocode.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mitocode.dto.RolDTO;
import com.mitocode.model.Role;
import com.mitocode.service.IRoleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {
    
    private final IRoleService service;

    @Qualifier("defaultMapper")
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<RolDTO>> findAll(){
        List<RolDTO> lst = service.findAll().stream().map(obj->convertEntityToDto(obj)).collect(Collectors.toList());
        return new ResponseEntity<>(lst,HttpStatus.OK);

    }

    @GetMapping("/{id}")
    public ResponseEntity<RolDTO> findById(@PathVariable("id") Integer id){
        Role obj = service.findById(id);
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RolDTO>save(@RequestBody RolDTO dto){
        Role obj = service.save(convertDtoToEntity(dto));
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RolDTO>update(@PathVariable("id") Integer id, @RequestBody RolDTO dto) throws Exception{
        Role obj = service.update(convertDtoToEntity(dto), id);
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private RolDTO convertEntityToDto(Role obj){
        return mapper.map(obj, RolDTO.class);
    }
    
    private Role convertDtoToEntity(RolDTO dto){
        return mapper.map(dto,Role.class);
    }

}
