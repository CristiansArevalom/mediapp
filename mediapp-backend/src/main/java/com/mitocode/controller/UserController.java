package com.mitocode.controller;

import java.net.URI;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mitocode.dto.RolDTO;
import com.mitocode.dto.UserDTO;
import com.mitocode.model.Role;
import com.mitocode.model.User;
import com.mitocode.service.IUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final IUserService service;
    @Qualifier("defaultMapper")
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll (){
        List<UserDTO> lst = service.findAll().stream().map(obj -> convertEntityToDto(obj)).collect(Collectors.toList());
        return new ResponseEntity<>(lst,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable("id") Integer id){
        User obj = service.findById(id);
        return new ResponseEntity<>(convertEntityToDto(obj), HttpStatus.OK);
    }    
    @PostMapping
    public ResponseEntity<UserDTO> save(@Valid @RequestBody UserDTO dto){
        User obj = service.save(convertDtoToEntity(dto));
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getIdUser()).toUri();
        return ResponseEntity.created(location).build(); //.body(obj);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable("id") Integer id, @RequestBody UserDTO dto) throws Exception{
        User obj = service.update(convertDtoToEntity(dto), id);
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /*Validar, se esta mezcando con clase Rol */
    @PutMapping("/{id}/role")
    public ResponseEntity<UserDTO> assingRoles(@PathVariable("id")Integer idUser,@RequestBody List<RolDTO> rolesDto) throws Exception{
        List<Role> lst=rolesDto.stream()
        .map(dto-> mapper.map(dto, Role.class))
        .collect(Collectors.toList());
        User obj = service.assignRoles(idUser, lst);
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.OK);
    }

    private UserDTO convertEntityToDto(User obj) {
        return mapper.map(obj, UserDTO.class);
    }
        private User convertDtoToEntity(UserDTO dto) {
        return mapper.map(dto, User.class);
    }
}
