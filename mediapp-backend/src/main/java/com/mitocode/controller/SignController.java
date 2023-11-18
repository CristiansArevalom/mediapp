package com.mitocode.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cloudinary.http44.api.Response;
import com.mitocode.dto.SignDTO;
import com.mitocode.model.Sign;
import com.mitocode.service.ISignService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/signs")
public class SignController {

    private final ISignService service;

    @Qualifier("defaultMapper")
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity<List<SignDTO>> findAll(){
        List<SignDTO> response= service.findAll().stream().map(obj->convertToDto(obj)).collect(Collectors.toList());
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<SignDTO>findById(@PathVariable("id") Integer id){
        Sign obj = service.findById(id);
        return new ResponseEntity<>(convertToDto(obj), HttpStatus.OK);
    }
    

    @PostMapping
    public ResponseEntity<SignDTO> save(@Valid @RequestBody SignDTO dto){
        Sign obj = service.save(convertToEntity(dto));
        return new ResponseEntity<>(convertToDto(obj),HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SignDTO> update(@PathVariable("id") Integer id, @Valid @RequestBody SignDTO dto) throws Exception{
        dto.setIdSign(id);
        Sign obj = service.update(convertToEntity(dto), id);
        return new ResponseEntity<>(convertToDto(obj),HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> save(@PathVariable("id") Integer id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private SignDTO convertToDto(Sign obj){
        return mapper.map(obj, SignDTO.class);
    }

    private Sign convertToEntity(SignDTO dto){
        return mapper.map(dto,Sign.class);
    }



}
