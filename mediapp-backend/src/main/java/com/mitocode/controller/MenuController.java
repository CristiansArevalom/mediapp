package com.mitocode.controller;


import com.mitocode.dto.MenuDTO;
import com.mitocode.dto.RolDTO;
import com.mitocode.model.Menu;
import com.mitocode.model.Role;
import com.mitocode.service.IMenuService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/menus")
@RequiredArgsConstructor
public class MenuController {

    private final IMenuService service;

    @Qualifier("defaultMapper")
    private final ModelMapper modelMapper;

    @PostMapping("/user")
    public ResponseEntity<List<MenuDTO>> getMenusByUser(@RequestBody String username) throws Exception {
        List<Menu> menus = service.getMenusByUsername(username);
        List<MenuDTO> menusDTO = menus.stream().map(e -> modelMapper.map(e, MenuDTO.class)).toList();

        return new ResponseEntity<>(menusDTO, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<MenuDTO>>findAll(){
        List <MenuDTO> lst = service.findAll().stream().map(e -> convertEntityToDto(e)).collect(Collectors.toList());
        return new ResponseEntity<>(lst, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<MenuDTO> findById(@PathVariable("id") Integer id){
        Menu obj = service.findById(id);
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<MenuDTO> save (@Valid @RequestBody MenuDTO dto){
        Menu obj = service.save(convertDtoToEntity(dto));
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<MenuDTO> update (@PathVariable("id") Integer id, @RequestBody MenuDTO dto) throws Exception{
        Menu obj = service.update(convertDtoToEntity(dto), id);
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.OK);       
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete (@PathVariable("id") Integer id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<MenuDTO> assignRoles(@PathVariable("id") Integer id,@RequestBody List<RolDTO> dtoLst) throws Exception{
        List<Role> lst = dtoLst.stream().map(dto->modelMapper.map(dto, Role.class)).collect(Collectors.toList());
        Menu obj = service.assignRole(id, lst);
        return new ResponseEntity<>(convertEntityToDto(obj),HttpStatus.OK);
    }



    private Menu convertDtoToEntity(MenuDTO dto){
        return modelMapper.map(dto, Menu.class);
    }
    private MenuDTO convertEntityToDto(Menu ob){
        return modelMapper.map(ob, MenuDTO.class);        
    }
}
