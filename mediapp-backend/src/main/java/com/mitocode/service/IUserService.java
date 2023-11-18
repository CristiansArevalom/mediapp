package com.mitocode.service;

import java.util.List;

import com.mitocode.model.Role;
import com.mitocode.model.User;

public interface IUserService extends ICRUD<User,Integer>{
    User assignRoles(Integer userId,List<Role>roles) throws Exception;
}
