package com.mitocode.service.impl;

import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.IMenuRepo;
import com.mitocode.service.IMenuService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.mitocode.model.Menu;
import com.mitocode.model.Role;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl extends CRUDImpl<Menu, Integer> implements IMenuService {

    private final IMenuRepo repo;

    @Override
    protected IGenericRepo<Menu, Integer> getRepo() {
        return repo;
    }

    @Override
    public List<Menu> getMenusByUsername(String username) {
        //String contextSessionUser = SecurityContextHolder.getContext().getAuthentication().getName();
        return repo.getMenusByUsername(username);
    }

    @Override
    public Menu assignRole(Integer id, List<Role> roles) throws Exception {
        Menu menuTemp = findById(id);
        menuTemp.setRoles(roles);
        Menu menuUpdated = this.update(menuTemp, id);
        return menuUpdated;
    }

    @Override
    public Page<Menu> listPage(Pageable pageable) {
        return repo.findAll(pageable);
    }

}
