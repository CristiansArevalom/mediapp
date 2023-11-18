package com.mitocode.service.impl;

import org.springframework.stereotype.Service;

import com.mitocode.model.Sign;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.ISignRepo;
import com.mitocode.service.ISignService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignServiceImpl extends CRUDImpl<Sign, Integer> implements ISignService{

    private final ISignRepo repo;

    @Override
    protected IGenericRepo<Sign, Integer> getRepo() {
        return repo;
    }
    
}
