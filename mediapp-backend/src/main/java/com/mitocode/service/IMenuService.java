package com.mitocode.service;

import com.mitocode.model.Menu;
import com.mitocode.model.Role;

import java.util.List;

public interface IMenuService extends ICRUD<Menu, Integer> {

    List<Menu> getMenusByUsername(String username);
    Menu assignRole(Integer id, List<Role> roles) throws Exception;

}
