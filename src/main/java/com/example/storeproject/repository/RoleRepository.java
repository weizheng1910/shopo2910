package com.example.storeproject.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.storeproject.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	Role findByName(String Name);
}
