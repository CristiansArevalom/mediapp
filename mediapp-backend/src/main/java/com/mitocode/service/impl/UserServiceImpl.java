package com.mitocode.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.mitocode.model.Menu;
import com.mitocode.model.Role;
import com.mitocode.model.User;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.IUserRepo;
import com.mitocode.service.IUserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserServiceImpl extends CRUDImpl<User,Integer> implements IUserService{

    private final IUserRepo repo;

    @Override
    protected IGenericRepo<User, Integer> getRepo() {
        return this.repo;
    }

    @Override
    public User assignRoles(Integer userId, List<Role> roles) throws Exception {
        User userTemp = findById(userId);
        userTemp.setRoles(roles);
        User UserUpdate =this.update(userTemp, userId);
        return UserUpdate;
    }
    
    @Override
    public Page<User> listPage(Pageable pageable) {
        return repo.findAll(pageable);
    }
}
