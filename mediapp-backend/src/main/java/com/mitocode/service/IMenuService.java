package com.mitocode.service;

import com.mitocode.model.Menu;
import com.mitocode.model.Role;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IMenuService extends ICRUD<Menu, Integer> {

    List<Menu> getMenusByUsername(String username);
    Menu assignRole(Integer id, List<Role> roles) throws Exception;

    Page<Menu> listPage(Pageable pageable);


}
